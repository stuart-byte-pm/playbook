/**
 * Playbook Advisory Group — Image Generation Script (Run 3)
 * Uses Replicate API with black-forest-labs/flux-1.1-pro
 * Run with: node scripts/generate-images-run3.js
 *
 * Reads REPLICATE_API_TOKEN from environment.
 * Stores output in assets/images/{hero,services,sectors,insights}/
 *
 * Run 3 key change: all professionals depicted are 25–40 years old.
 * The brand serves younger, dynamic professionals — not senior/institutional figures.
 * Visual tone: vibrant, sharp, contemporary, authoritative.
 *
 * Runs 1 and 2 covered:
 *   hero:     aerial site / consultant at window / bridge at dusk /
 *             glazed corridor / rail site at last light / overhead plan table
 *   services: conference table / still-life desk / female adviser listening /
 *             standing governance workshop / hands annotating / site walkthrough
 *   sectors:  civic exterior / commercial atrium / healthcare facility / education interior
 *   insights: senior male portrait / steel facade detail / senior female portrait / concrete macro
 *
 * Run 3 fills the remaining gaps:
 *   hero:     rooftop vantage with young professional / civic atrium mezzanine / close programme schedule
 *   services: young mixed team at standing desk / young female site professional / still-life risk register
 *   sectors:  private residential/mixed-use development / public transport interchange interior
 *   insights: young male editorial portrait / tensile structural membrane macro
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

const images = [
  // --- HERO (3 images) ---
  {
    filename: "hero-rooftop-adviser-07.png",
    outputDir: "hero",
    aspectRatio: "16:9",
    prompt:
      "A confident professional man aged around 32 standing on a rooftop terrace of a contemporary office building, looking out over an active urban regeneration construction site below, holding a rolled set of drawings, business casual attire, late afternoon golden light, city skyline and cranes in mid-distance, shallow depth of field, cinematic editorial photography, warm cinematic colour grading, no text or logos visible",
  },
  {
    filename: "hero-atrium-mezzanine-08.png",
    outputDir: "hero",
    aspectRatio: "16:9",
    prompt:
      "A young professional woman aged around 28 standing on a mezzanine walkway inside a large modern civic building atrium nearing completion, looking down to the double-height floor below, concrete and glass structure, scaffolding partially removed, natural light from a glazed roof, candid documentary moment, architectural photography style, muted warm tones, no text or signage visible",
  },
  {
    filename: "hero-schedule-closeup-09.png",
    outputDir: "hero",
    aspectRatio: "16:9",
    prompt:
      "Close overhead view of a large printed programme schedule or project timeline pinned to a pale timber surface, a young professional's forearms in shirtsleeves visible at the bottom edge gesturing at a section, natural directional light from one side creating crisp shadows, editorial documentary photography, warm paper tones, no readable text on documents, no faces visible",
  },

  // --- SERVICES (3 images) ---
  {
    filename: "services-standing-desk-review-07.png",
    outputDir: "services",
    aspectRatio: "16:9",
    prompt:
      "A man and a woman both in their early thirties standing side by side at a height-adjustable desk in a contemporary open-plan office, looking together at a laptop displaying a data dashboard, engaged natural conversation, warm natural light from large windows behind, modern office with pale walls and timber accents, candid lifestyle documentary photography, warm neutral colour grading, laptop screen not legible, no text visible",
  },
  {
    filename: "services-site-professional-female-08.png",
    outputDir: "services",
    aspectRatio: "16:9",
    prompt:
      "A young professional woman aged around 30 walking through the steel frame of a large building under construction, wearing a hard hat and holding a printed document, confident purposeful expression, construction daylight filtering through the open structure, candid documentary moment, editorial photography style, warm muted tones, no text or signage visible",
  },
  {
    filename: "services-risk-register-still-09.png",
    outputDir: "services",
    aspectRatio: "16:9",
    prompt:
      "Editorial still-life of a pale oak desktop with printed risk register pages, architectural drawings marked up in red ballpoint pen, a metal ruler and a scale bar, a single mechanical pencil resting across the papers, no face or person, soft directional natural light from a nearby window casting long shadows across the surface, editorial photography, muted warm paper tones, no readable text",
  },

  // --- SECTORS (2 images) ---
  {
    filename: "sectors-residential-mixed-use-05.png",
    outputDir: "sectors",
    aspectRatio: "16:9",
    prompt:
      "Exterior of a contemporary private residential and mixed-use development at golden hour, modern British architecture with pale brick ground floor retail colonnade and residential floors above, street level with trees and wide pavement, warm evening light catching the upper floors, architectural photography, warm cinematic colour grading, no people, no text or signage visible",
  },
  {
    filename: "sectors-transport-interchange-06.png",
    outputDir: "sectors",
    aspectRatio: "16:9",
    prompt:
      "Interior of a modern British public transport interchange, contemporary civic architecture, long vaulted concrete and glass roof structure, clean platforms, natural daylight flooding through the glazed canopy, sense of scale and public infrastructure quality, architectural documentary photography, muted cool-warm tonal palette, no people, no text or destination boards visible",
  },

  // --- INSIGHTS / EDITORIAL (2 images) ---
  {
    filename: "insights-portrait-adviser-04.png",
    outputDir: "insights",
    aspectRatio: "16:9",
    prompt:
      "Editorial portrait of a young professional man aged around 31, seated in a low chair beside a large window in a minimal contemporary office, one arm resting on the chair back, calm direct expression toward camera, soft natural side-lighting from the window, shallow depth of field with pale wall and window frame as background, editorial portrait photography, warm cinematic colour grading, professional but relaxed, no text visible",
  },
  {
    filename: "insights-membrane-structure-05.png",
    outputDir: "insights",
    aspectRatio: "16:9",
    prompt:
      "Abstract macro architectural photograph of a woven tensile structural membrane or ETFE cushion roof panel, close-up revealing the geometric pattern of fine cables and translucent material, soft diffused daylight passing through creating subtle tonal gradations, editorial architectural photography, muted cool-white colour palette, no people, no text or signage",
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
  console.log(`  Prompt: ${imageSpec.prompt.substring(0, 100)}...`);

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
  console.log("Playbook Advisory Group — Image Generation Run 3");
  console.log(`Model: black-forest-labs/flux-1.1-pro`);
  console.log(`Images to generate: ${images.length}`);
  console.log(`Output base: ${BASE_DIR}`);
  console.log("=".repeat(60));
  console.log("NOTE: All professionals in this run are 25-40 years old.");

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
  const manifestPath = path.join(BASE_DIR, "generation-manifest-run3.json");
  const manifest = {
    generatedAt: new Date().toISOString(),
    model: "black-forest-labs/flux-1.1-pro",
    run: 3,
    notes: "All professionals depicted are 25-40 years old per brand update 2026-03-18",
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
