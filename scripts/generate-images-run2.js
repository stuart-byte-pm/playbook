/**
 * Playbook Advisory Group — Image Generation Script (Run 2)
 * Uses Replicate API with black-forest-labs/flux-1.1-pro
 * Run with: node scripts/generate-images-run2.js
 *
 * Reads REPLICATE_API_TOKEN from environment.
 * Stores output in assets/images/{hero,services,sectors,insights}/
 *
 * These 10 images are a second batch — all prompts are intentionally
 * differentiated from run 1 in composition, perspective, subject matter,
 * and scene. They extend the same visual family without duplicating it.
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

if (!REPLICATE_API_TOKEN) {
  console.error(
    "ERROR: REPLICATE_API_TOKEN is not set in the environment. Aborting."
  );
  process.exit(1);
}

const BASE_DIR = path.resolve(__dirname, "../assets/images");

// ---------------------------------------------------------------------------
// Image manifest — 10 images across 4 categories (Run 2)
//
// Run 1 covered:
//   hero:     aerial site / consultant at window / bridge at dusk
//   services: conference table drawings / still-life desk / female adviser listening
//   sectors:  civic building exterior / commercial atrium interior
//   insights: senior male portrait / steel mullion facade detail
//
// Run 2 deliberately varies:
//   hero:     ground-level corridor / rail/road site at last light / overhead plan table
//   services: standing workshop / hands annotating risk register / site walkthrough
//   sectors:  healthcare facility exterior / education interior
//   insights: senior female portrait / concrete-steel connection macro
// ---------------------------------------------------------------------------
const images = [
  // --- HERO (3 images) ---
  {
    filename: "hero-corridor-04.png",
    outputDir: "hero",
    aspectRatio: "16:9",
    prompt:
      "Ground-level perspective looking down a long glazed construction corridor inside a major civic building under construction, structural steel lattice overhead, concrete floor, daylight streaming through glass panels beyond, sense of scale and controlled progress, architectural documentary photography, muted warm tones, no people, no text or signage",
  },
  {
    filename: "hero-site-dusk-05.png",
    outputDir: "hero",
    aspectRatio: "16:9",
    prompt:
      "Wide cinematic ground-level shot of a major rail or road infrastructure construction site at last light, illuminated site compound and heavy plant equipment in the foreground, deep blue-violet evening sky, construction lighting creating warm pools against the cool dusk, documentary photography style, muted cool-warm colour contrast, sense of scale and precision, no people, no text",
  },
  {
    filename: "hero-briefing-table-06.png",
    outputDir: "hero",
    aspectRatio: "16:9",
    prompt:
      "Straight down overhead view of a wide pale timber boardroom table with a large printed site masterplan and annotated drawings spread across it, two pairs of hands partially visible at the edges gesturing over the plans, warm directional natural light from one side creating soft shadows, editorial documentary photography, warm neutral colour grading, no faces, no readable text",
  },

  // --- SERVICES (3 images) ---
  {
    filename: "services-governance-workshop-04.png",
    outputDir: "services",
    aspectRatio: "16:9",
    prompt:
      "Three senior professionals standing in a working session beside a large wall-mounted pin-board covered with printed cards and diagrams, an industrial workspace with exposed steel and natural daylight from high windows, side-on composition showing engaged but focused discussion, lifestyle documentary photography, warm neutral colour grading, no readable text on materials",
  },
  {
    filename: "services-risk-review-05.png",
    outputDir: "services",
    aspectRatio: "16:9",
    prompt:
      "Close-up of a senior professional's hands annotating a printed document with a fine-point pen on a pale pale-oak desk surface, partial view of a coffee cup and a second document to one side, only the hands and desk visible, no face in frame, editorial still-life photography, soft warm directional light from a nearby window, warm paper tones, no readable text",
  },
  {
    filename: "services-walkthrough-06.png",
    outputDir: "services",
    aspectRatio: "16:9",
    prompt:
      "A senior male professional in business attire walking through the interior of a partially complete modern building, hard hat held under his arm, looking upward at the structural steel and concrete frame above, candid documentary moment, soft construction-site daylight filtering through open facade panels, cinematic photography, warm neutral tones, no text or signage visible",
  },

  // --- SECTORS (2 images) ---
  {
    filename: "sectors-healthcare-03.png",
    outputDir: "sectors",
    aspectRatio: "16:9",
    prompt:
      "Exterior of a contemporary NHS-style healthcare facility, modern British architecture, clean pale brick and full-height glass facade with a welcoming covered entrance forecourt, wide shot under soft overcast daylight creating even neutral tones, architectural photography, calm authoritative composition, no people, no text or signage visible",
  },
  {
    filename: "sectors-education-04.png",
    outputDir: "sectors",
    aspectRatio: "16:9",
    prompt:
      "Interior of a contemporary British university or sixth-form learning building, double-height open library or collaborative study space, warm timber shelving and pale concrete columns, natural daylight flooding from tall clerestory windows, sense of scale and intellectual calm, architectural photography, warm neutral colour grading, no people, no text or branding visible",
  },

  // --- INSIGHTS / EDITORIAL (2 images) ---
  {
    filename: "insights-portrait-adviser-03.png",
    outputDir: "insights",
    aspectRatio: "16:9",
    prompt:
      "Editorial portrait of a senior female adviser, early sixties, seated beside a tall sash window in a minimal contemporary office with pale walls, reading glasses held loosely in one hand, calm direct expression toward camera, soft natural window light on one side creating a gentle shadow fall, shallow depth of field, editorial portrait photography, warm cinematic colour grading, professional but not corporate, no text visible",
  },
  {
    filename: "insights-structural-detail-04.png",
    outputDir: "insights",
    aspectRatio: "16:9",
    prompt:
      "Abstract macro architectural photograph of a raw poured concrete column base meeting a heavy steel connection plate and bolt assembly, industrial textures of aggregate and brushed steel, soft raking natural light from one side revealing surface texture and material quality, editorial architectural photography, muted warm-grey tonal palette, no people, no text or signage",
  },
];

// ---------------------------------------------------------------------------
// Replicate API helpers
// ---------------------------------------------------------------------------

function httpsRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ statusCode: res.statusCode, body: data });
        }
      });
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function createPrediction(prompt, aspectRatio) {
  const payload = JSON.stringify({
    input: {
      prompt,
      aspect_ratio: aspectRatio,
      output_format: "png",
      output_quality: 95,
      safety_tolerance: 2,
      prompt_upsampling: true,
    },
  });

  // Retry loop with respect for retry_after on 429 responses
  const maxAttempts = 8;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const response = await httpsRequest(
      {
        hostname: "api.replicate.com",
        path: "/v1/models/black-forest-labs/flux-1.1-pro/predictions",
        method: "POST",
        headers: {
          Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
          Prefer: "wait",
        },
      },
      payload
    );

    if (response.statusCode === 429) {
      const retryAfter =
        (response.body && response.body.retry_after
          ? response.body.retry_after
          : 10) + 2;
      console.log(
        `  Rate limited (attempt ${attempt}/${maxAttempts}). Waiting ${retryAfter}s before retry...`
      );
      await new Promise((r) => setTimeout(r, retryAfter * 1000));
      continue;
    }

    return response;
  }

  throw new Error(
    `Rate limited after ${maxAttempts} attempts — could not submit prediction`
  );
}

async function pollPrediction(predictionId, maxWaitMs = 180000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    await new Promise((r) => setTimeout(r, 5000));
    const response = await httpsRequest({
      hostname: "api.replicate.com",
      path: `/v1/predictions/${predictionId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
      },
    });

    const prediction = response.body;
    if (prediction.status === "succeeded") return prediction;
    if (
      prediction.status === "failed" ||
      prediction.status === "canceled"
    ) {
      throw new Error(
        `Prediction ${predictionId} ${prediction.status}: ${
          prediction.error || "no error details"
        }`
      );
    }
    console.log(
      `  Polling ${predictionId} — status: ${prediction.status} (${Math.round(
        (Date.now() - start) / 1000
      )}s)`
    );
  }
  throw new Error(
    `Prediction ${predictionId} timed out after ${maxWaitMs}ms`
  );
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const urlObj = new URL(url);

    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: "GET",
      headers: { "User-Agent": "playbook-image-generator/1.0" },
    };

    function request(opts) {
      https
        .get(opts, (res) => {
          if (
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location
          ) {
            const redirectUrl = new URL(res.headers.location);
            request({
              hostname: redirectUrl.hostname,
              path: redirectUrl.pathname + redirectUrl.search,
              method: "GET",
              headers: { "User-Agent": "playbook-image-generator/1.0" },
            });
            return;
          }
          if (res.statusCode !== 200) {
            reject(
              new Error(`Download failed with status ${res.statusCode}`)
            );
            return;
          }
          res.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve();
          });
        })
        .on("error", (err) => {
          fs.unlink(destPath, () => {});
          reject(err);
        });
    }

    request(options);
    file.on("error", (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function generateImage(imageSpec, index) {
  const label = `[${index + 1}/10] ${imageSpec.filename}`;
  console.log(`\n${label}`);
  console.log(`  Prompt: ${imageSpec.prompt.substring(0, 80)}...`);

  const destDir = path.join(BASE_DIR, imageSpec.outputDir);
  const destPath = path.join(destDir, imageSpec.filename);

  // Ensure subdirectory exists
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Skip if already exists
  if (fs.existsSync(destPath)) {
    console.log(`  SKIPPED — file already exists at ${destPath}`);
    return { success: true, skipped: true, filename: imageSpec.filename };
  }

  try {
    console.log("  Submitting to Replicate...");
    const createResponse = await createPrediction(
      imageSpec.prompt,
      imageSpec.aspectRatio
    );

    let prediction = createResponse.body;

    if (
      createResponse.statusCode !== 200 &&
      createResponse.statusCode !== 201
    ) {
      throw new Error(
        `API error ${createResponse.statusCode}: ${JSON.stringify(prediction)}`
      );
    }

    console.log(
      `  Prediction ID: ${prediction.id} — status: ${prediction.status}`
    );

    if (prediction.status !== "succeeded") {
      console.log("  Waiting for completion...");
      prediction = await pollPrediction(prediction.id);
    }

    const outputUrl = Array.isArray(prediction.output)
      ? prediction.output[0]
      : prediction.output;

    if (!outputUrl) {
      throw new Error("No output URL in prediction response");
    }

    console.log(`  Output URL: ${outputUrl.substring(0, 60)}...`);
    console.log(`  Downloading to ${destPath}...`);

    await downloadFile(outputUrl, destPath);

    const stats = fs.statSync(destPath);
    const sizeMb = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`  Saved — ${sizeMb} MB`);

    return {
      success: true,
      skipped: false,
      filename: imageSpec.filename,
      url: outputUrl,
    };
  } catch (err) {
    console.error(`  FAILED: ${err.message}`);
    // Retry once
    console.log("  Retrying once after 15s...");
    await new Promise((r) => setTimeout(r, 15000));
    try {
      const createResponse = await createPrediction(
        imageSpec.prompt,
        imageSpec.aspectRatio
      );
      let prediction = createResponse.body;
      if (
        createResponse.statusCode !== 200 &&
        createResponse.statusCode !== 201
      ) {
        throw new Error(
          `API error on retry ${createResponse.statusCode}: ${JSON.stringify(
            prediction
          )}`
        );
      }
      if (prediction.status !== "succeeded") {
        prediction = await pollPrediction(prediction.id);
      }
      const outputUrl = Array.isArray(prediction.output)
        ? prediction.output[0]
        : prediction.output;
      if (!outputUrl) throw new Error("No output URL on retry");
      await downloadFile(outputUrl, destPath);
      const stats = fs.statSync(destPath);
      const sizeMb = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`  Retry succeeded — ${sizeMb} MB`);
      return {
        success: true,
        skipped: false,
        filename: imageSpec.filename,
        url: outputUrl,
        retried: true,
      };
    } catch (retryErr) {
      console.error(`  RETRY FAILED: ${retryErr.message}`);
      return {
        success: false,
        filename: imageSpec.filename,
        error: retryErr.message,
      };
    }
  }
}

async function main() {
  console.log("=".repeat(60));
  console.log("Playbook Advisory Group — Image Generation Run 2");
  console.log(`Model: black-forest-labs/flux-1.1-pro`);
  console.log(`Images to generate: ${images.length}`);
  console.log(`Output base: ${BASE_DIR}`);
  console.log("=".repeat(60));

  const results = [];

  // 12s inter-request delay to stay within Replicate rate limits
  // (low-balance account: burst of 1, ~6 req/min ceiling)
  const INTER_REQUEST_DELAY_MS = 12000;

  for (let i = 0; i < images.length; i++) {
    const result = await generateImage(images[i], i);
    results.push(result);

    if (i < images.length - 1 && !result.skipped) {
      console.log(
        `  Waiting ${INTER_REQUEST_DELAY_MS / 1000}s before next request...`
      );
      await new Promise((r) => setTimeout(r, INTER_REQUEST_DELAY_MS));
    }
  }

  const succeeded = results.filter((r) => r.success && !r.skipped);
  const skipped = results.filter((r) => r.success && r.skipped);
  const failed = results.filter((r) => !r.success);

  console.log("\n" + "=".repeat(60));
  console.log("GENERATION RUN COMPLETE");
  console.log("=".repeat(60));
  console.log(`Requested:  ${images.length}`);
  console.log(`Generated:  ${succeeded.length}`);
  console.log(`Skipped:    ${skipped.length} (already existed)`);
  console.log(`Failed:     ${failed.length}`);

  if (succeeded.length > 0) {
    console.log("\nFiles created:");
    succeeded.forEach((r) => console.log(`  - ${r.filename}`));
  }

  if (failed.length > 0) {
    console.log("\nFailed:");
    failed.forEach((r) => console.log(`  - ${r.filename}: ${r.error}`));
  }

  // Write manifest for this run
  const manifestPath = path.join(BASE_DIR, "generation-manifest-run2.json");
  const manifest = {
    generatedAt: new Date().toISOString(),
    model: "black-forest-labs/flux-1.1-pro",
    run: 2,
    totalRequested: images.length,
    totalGenerated: succeeded.length,
    totalFailed: failed.length,
    images: images.map((img, i) => ({
      filename: img.filename,
      outputDir: img.outputDir,
      aspectRatio: img.aspectRatio,
      prompt: img.prompt,
      result: results[i],
    })),
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to: ${manifestPath}`);

  if (failed.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
