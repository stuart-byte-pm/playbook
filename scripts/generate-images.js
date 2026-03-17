/**
 * Playbook Advisory Group — Image Generation Script
 * Uses Replicate API with black-forest-labs/flux-1.1-pro
 * Run with: node scripts/generate-images.js
 *
 * Reads REPLICATE_API_TOKEN from environment.
 * Stores output in assets/images/{hero,services,sectors,insights}/
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
// Image manifest — 10 images across 4 categories
// Each entry: { filename, outputDir, prompt, aspectRatio }
// All prompts are aligned with image-generation-guide.md style guidelines:
//   - Documentary / editorial quality
//   - Warm natural lighting
//   - Authoritative, calm, professional tone
//   - No visible text, logos, or watermarks
//   - No generic stock-photo clichés
// ---------------------------------------------------------------------------
const images = [
  // --- HERO (3 images) ---
  {
    filename: "hero-programme-site-01.png",
    outputDir: "hero",
    aspectRatio: "16:9",
    prompt:
      "Wide cinematic aerial view of a large-scale urban regeneration construction site at golden hour, organised concrete structures and steel frameworks rising against a warm amber sky, documentary photography style, warm natural lighting with long soft shadows, subtle industrial atmosphere, editorial quality, no people, no text",
  },
  {
    filename: "hero-governance-briefing-02.png",
    outputDir: "hero",
    aspectRatio: "16:9",
    prompt:
      "Senior consultant standing at floor-to-ceiling windows in a contemporary glass-walled meeting room overlooking a city skyline, reviewing a printed report, natural daylight, calm and authoritative presence, shallow depth of field, cinematic photography, warm neutral colour grading, no text visible",
  },
  {
    filename: "hero-capital-programme-03.png",
    outputDir: "hero",
    aspectRatio: "16:9",
    prompt:
      "Wide shot of a major infrastructure project at dusk, a new bridge or civic building under construction framed against a deep blue sky, construction cranes silhouetted, dramatic natural lighting, architectural documentary photography, sense of scale and precision, muted warm tones, no text or logos",
  },

  // --- SERVICES (3 images) ---
  {
    filename: "services-advisory-review-01.png",
    outputDir: "services",
    aspectRatio: "16:9",
    prompt:
      "Two senior professionals seated at a wide timber conference table reviewing large-format architectural drawings, natural light from tall windows, modern boardroom interior with clean lines, engaged but calm discussion, documentary photography style, warm neutral colour grading, shallow depth of field, no text visible",
  },
  {
    filename: "services-programme-controls-02.png",
    outputDir: "services",
    aspectRatio: "16:9",
    prompt:
      "Close-up of an open leather-bound notebook with handwritten notes alongside printed programme schedule documents on a pale desk, a cup of coffee partially in frame, soft natural window light, editorial still-life photography, warm paper tones, calm and considered atmosphere, no readable text",
  },
  {
    filename: "services-client-advisory-03.png",
    outputDir: "services",
    aspectRatio: "16:9",
    prompt:
      "A senior female professional in a modern minimalist office space, seated at a glass-topped desk, attentively listening during a one-to-one conversation, warm natural daylight from large windows behind her, contemporary architectural interior, candid documentary style, warm neutral tones, professional business attire, no text visible",
  },

  // --- SECTORS (2 images) ---
  {
    filename: "sectors-public-infrastructure-01.png",
    outputDir: "sectors",
    aspectRatio: "16:9",
    prompt:
      "Exterior view of a newly completed civic public building, contemporary British architecture, clean geometric facade in pale stone and dark steel, wide plaza in foreground with soft natural afternoon light, architectural photography, calm and authoritative composition, no people, no text or signage visible",
  },
  {
    filename: "sectors-private-development-02.png",
    outputDir: "sectors",
    aspectRatio: "16:9",
    prompt:
      "Interior of a premium modern commercial office building atrium, double-height space with exposed concrete columns and warm timber accents, natural light flooding through a glazed roof, subtle sense of scale and quality, architectural photography, warm neutral colour grading, no people, no text or branding visible",
  },

  // --- INSIGHTS / EDITORIAL (2 images) ---
  {
    filename: "insights-portrait-adviser-01.png",
    outputDir: "insights",
    aspectRatio: "16:9",
    prompt:
      "Thoughtful portrait of a senior male adviser, mid-fifties, standing in a naturally lit industrial-heritage workspace, exposed brick and steel beam background, direct but calm gaze toward camera, editorial portrait photography, warm cinematic colour grading, shallow depth of field, professional but not corporate, no text visible",
  },
  {
    filename: "insights-architectural-detail-02.png",
    outputDir: "insights",
    aspectRatio: "16:9",
    prompt:
      "Abstract close-up architectural detail of a contemporary building facade, repeating geometric grid of dark steel mullions and glass panels, soft overcast natural daylight creating even tonal gradations, editorial architectural photography, muted cool-warm colour contrast, no people, no text or signage",
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
    version: undefined, // flux-1.1-pro uses deployment endpoint — no version hash needed
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
          : 10) + 2; // add 2s buffer
      console.log(
        `  Rate limited (attempt ${attempt}/${maxAttempts}). Waiting ${retryAfter}s before retry...`
      );
      await new Promise((r) => setTimeout(r, retryAfter * 1000));
      continue;
    }

    return response;
  }

  throw new Error(`Rate limited after ${maxAttempts} attempts — could not submit prediction`);
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
    if (prediction.status === "failed" || prediction.status === "canceled") {
      throw new Error(
        `Prediction ${predictionId} ${prediction.status}: ${prediction.error || "no error details"}`
      );
    }
    console.log(
      `  Polling ${predictionId} — status: ${prediction.status} (${Math.round((Date.now() - start) / 1000)}s)`
    );
  }
  throw new Error(`Prediction ${predictionId} timed out after ${maxWaitMs}ms`);
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
      https.get(opts, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // Follow redirect
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
          reject(new Error(`Download failed with status ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      }).on("error", (err) => {
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

  // Skip if already exists
  if (fs.existsSync(destPath)) {
    console.log(`  SKIPPED — file already exists at ${destPath}`);
    return { success: true, skipped: true, filename: imageSpec.filename };
  }

  try {
    // Create prediction
    console.log("  Submitting to Replicate...");
    const createResponse = await createPrediction(
      imageSpec.prompt,
      imageSpec.aspectRatio
    );

    let prediction = createResponse.body;

    if (createResponse.statusCode !== 200 && createResponse.statusCode !== 201) {
      throw new Error(
        `API error ${createResponse.statusCode}: ${JSON.stringify(prediction)}`
      );
    }

    console.log(`  Prediction ID: ${prediction.id} — status: ${prediction.status}`);

    // If the Prefer: wait header caused immediate completion, use result directly
    if (prediction.status !== "succeeded") {
      console.log("  Waiting for completion...");
      prediction = await pollPrediction(prediction.id);
    }

    // Extract output URL — flux-1.1-pro returns a string, not an array
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

    return { success: true, skipped: false, filename: imageSpec.filename, url: outputUrl };
  } catch (err) {
    console.error(`  FAILED: ${err.message}`);
    return { success: false, filename: imageSpec.filename, error: err.message };
  }
}

async function main() {
  console.log("=".repeat(60));
  console.log("Playbook Advisory Group — Image Generation Run");
  console.log(`Model: black-forest-labs/flux-1.1-pro`);
  console.log(`Images to generate: ${images.length}`);
  console.log(`Output base: ${BASE_DIR}`);
  console.log("=".repeat(60));

  const results = [];

  // Generate sequentially to stay within Replicate rate limits.
  // The createPrediction function handles 429 backoff internally.
  // Add a 12s gap between submissions to stay comfortably within the
  // 6 req/min limit (the burst of 1 means we effectively need ~10s spacing).
  const INTER_REQUEST_DELAY_MS = 12000;

  for (let i = 0; i < images.length; i++) {
    const result = await generateImage(images[i], i);
    results.push(result);

    if (i < images.length - 1) {
      if (!result.skipped) {
        console.log(`  Waiting ${INTER_REQUEST_DELAY_MS / 1000}s before next request...`);
        await new Promise((r) => setTimeout(r, INTER_REQUEST_DELAY_MS));
      }
    }
  }

  // Summary
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

  // Write a JSON manifest for reference
  const manifestPath = path.join(BASE_DIR, "generation-manifest.json");
  const manifest = {
    generatedAt: new Date().toISOString(),
    model: "black-forest-labs/flux-1.1-pro",
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
