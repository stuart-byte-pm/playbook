/**
 * Playbook Advisory Group — Campus Video Generation Script
 * Uses Replicate API with minimax/video-01-live (image-to-video)
 *
 * Input:  A campus building photograph
 * Output: 7-second video with students walking, signs removed
 *
 * Run with:
 *   REPLICATE_API_TOKEN=<token> node scripts/generate-campus-video.js
 *   -- or --
 *   node scripts/generate-campus-video.js  (reads from .env.local automatically)
 *
 * Output saved to: web/public/videos/campus-walkway.mp4
 */

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// Load token — from env or .env.local fallback
// ---------------------------------------------------------------------------
let REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

if (!REPLICATE_API_TOKEN) {
  const envPath = path.resolve(__dirname, "../.env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const [key, ...rest] = line.split("=");
      if (key && key.trim() === "REPLICATE_API_TOKEN") {
        REPLICATE_API_TOKEN = rest.join("=").trim();
        break;
      }
    }
  }
}

if (!REPLICATE_API_TOKEN) {
  console.error("ERROR: REPLICATE_API_TOKEN not found. Aborting.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const IMAGE_PATH =
  "C:/Users/Admin/OneDrive/Desktop/058_NWU_DeWitt-Science_Ext_1134.jpg";

const OUTPUT_DIR = path.resolve(__dirname, "../web/public/videos");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "campus-walkway.mp4");

// minimax/video-01-live generates approximately 6–7 seconds of video
// from a first-frame image + motion prompt.
const MODEL = "minimax/video-01-live";

const PROMPT =
  "University students walking along a campus pathway beside a modern brick and glass academic building on a sunny day. " +
  "Several groups of young people carrying backpacks move naturally along the path in both directions — some in pairs, some alone. " +
  "Gentle breeze moves the foliage and ornamental grasses. " +
  "Smooth, subtle forward camera drift. Warm afternoon light. " +
  "No text, no signage, no logos visible on any pillars or structures.";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function replicateRequest(method, urlPath, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      hostname: "api.replicate.com",
      path: urlPath,
      method,
      headers: {
        Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
        ...(payload ? { "Content-Length": Buffer.byteLength(payload) } : {}),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    proto
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          fs.unlinkSync(dest);
          return downloadFile(res.headers.location, dest)
            .then(resolve)
            .catch(reject);
        }
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Read and base64-encode the source image
  console.log(`Reading image: ${IMAGE_PATH}`);
  if (!fs.existsSync(IMAGE_PATH)) {
    console.error(`ERROR: Image not found at ${IMAGE_PATH}`);
    process.exit(1);
  }
  const imageBuffer = fs.readFileSync(IMAGE_PATH);
  const base64Image = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
  console.log(
    `Image loaded — ${(imageBuffer.length / 1024 / 1024).toFixed(2)} MB`
  );

  // Create prediction
  console.log(`\nSubmitting to Replicate (${MODEL})...`);
  console.log(`Prompt: ${PROMPT}\n`);

  const createRes = await replicateRequest(
    "POST",
    `/v1/models/${MODEL}/predictions`,
    {
      input: {
        prompt: PROMPT,
        first_frame_image: base64Image,
        prompt_optimizer: true,
      },
    }
  );

  if (createRes.status !== 201 && createRes.status !== 200) {
    console.error("ERROR creating prediction:", JSON.stringify(createRes.body, null, 2));
    process.exit(1);
  }

  const predictionId = createRes.body.id;
  console.log(`Prediction created: ${predictionId}`);
  console.log("Polling for completion (this typically takes 2–5 minutes)...\n");

  // Poll until complete
  let prediction;
  let dots = 0;
  while (true) {
    await sleep(8000);
    const pollRes = await replicateRequest(
      "GET",
      `/v1/predictions/${predictionId}`
    );
    prediction = pollRes.body;

    process.stdout.write(
      `\r[${new Date().toLocaleTimeString()}] Status: ${prediction.status}${".".repeat(++dots % 4)}   `
    );

    if (prediction.status === "succeeded") {
      console.log("\n\nPrediction succeeded.");
      break;
    }
    if (prediction.status === "failed" || prediction.status === "canceled") {
      console.error(
        `\n\nERROR: Prediction ${prediction.status}:`,
        prediction.error
      );
      process.exit(1);
    }
  }

  // Extract video URL
  const output = prediction.output;
  let videoUrl;
  if (typeof output === "string") {
    videoUrl = output;
  } else if (Array.isArray(output)) {
    videoUrl = output[0];
  } else if (output && typeof output === "object") {
    videoUrl = output.video || output.url || Object.values(output)[0];
  }

  if (!videoUrl) {
    console.error("ERROR: Could not extract video URL from output:", output);
    process.exit(1);
  }

  console.log(`Video URL: ${videoUrl}`);
  console.log(`Downloading to: ${OUTPUT_FILE}...`);

  await downloadFile(videoUrl, OUTPUT_FILE);

  const stat = fs.statSync(OUTPUT_FILE);
  console.log(
    `\nDone. Video saved to: web/public/videos/campus-walkway.mp4`
  );
  console.log(`File size: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`\nServed at: /videos/campus-walkway.mp4`);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
