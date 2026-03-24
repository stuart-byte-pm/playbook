/**
 * Playbook Advisory Group — Image Generation Script (Run 4)
 * Uses Replicate API with black-forest-labs/flux-1.1-pro
 * Run with: node scripts/generate-images-run4.js
 *
 * Reads REPLICATE_API_TOKEN from environment.
 * Stores output in assets/images/lifestyle/
 *
 * Run 4 direction — lifestyle and community imagery:
 *   - NO suits, NO hard hats, NO construction sites
 *   - Casual / smart-casual dress only (jeans, relaxed shirts, light layers)
 *   - Real-world everyday settings: coffee shops, co-working spaces, lobbies,
 *     libraries, plazas, courtyards, urban streetscapes, waterfront areas
 *   - Families welcome: young couples, families with children, multi-generational
 *     groups (grandparents max 50s–60s, active and healthy)
 *   - All adults 25–40 unless clearly a grandparent figure (50s–60s)
 *   - Mood: warm, natural, human, grounded, candid-feeling
 *   - Ethnic diversity across the full set of 20 images
 *
 * 20 images total across these themes:
 *   lifestyle-couple:       4 images (diverse young couples in urban settings)
 *   lifestyle-family:       6 images (families with children in modern spaces)
 *   lifestyle-community:    4 images (groups, multi-generational, neighbours)
 *   lifestyle-individual:   3 images (solo young adults in everyday moments)
 *   lifestyle-architecture: 3 images (people-scale environmental shots of modern
 *                                      residential/mixed-use spaces)
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
  // -------------------------------------------------------------------------
  // LIFESTYLE — COUPLES (4 images)
  // -------------------------------------------------------------------------
  {
    filename: "lifestyle-couple-coffee-01.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "A young South Asian couple in their early thirties sitting across from each other at a small wooden table in a warm independent coffee shop, casual everyday clothing — she wears a light linen shirt, he wears a relaxed navy t-shirt — both smiling mid-conversation, flat white cups on the table, warm afternoon light through large windows, candid lifestyle photography, natural warm colour grading, no text or signage visible",
  },
  {
    filename: "lifestyle-couple-plaza-02.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "A young Black couple in their late twenties walking together through a contemporary urban plaza, relaxed modern clothing — she wears a beige linen jacket over a white t-shirt and jeans, he wears a grey hoodie and dark trousers — holding hands and laughing, modern mixed-use building facade behind them with trees and street planters, bright overcast natural daylight, candid street photography style, warm neutral colour grading, no text or logos visible",
  },
  {
    filename: "lifestyle-couple-waterfront-03.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "A young mixed-ethnicity couple — East Asian woman and white British man, both around 30 — standing at a waterfront railing overlooking a regenerated urban dockside, casual clothing, she leans against him looking out at the water, early evening golden light reflecting off the water, modern apartment buildings and greenery in background, candid lifestyle documentary photography, warm cinematic colour grading, no text or signage visible",
  },
  {
    filename: "lifestyle-couple-library-04.png",
    outputDir: "lifestyle",
    aspectRatio: "4:5",
    prompt:
      "A young couple in their early thirties — a Black woman and a mixed-race man — sitting close together on a bench in a bright modern public library or learning hub, she reads a book, he has a laptop on his knee, both dressed casually in relaxed everyday clothing, warm natural light from tall windows, bookshelves and timber interior behind them, candid lifestyle photography, warm muted tones, no legible text on screens or book covers",
  },

  // -------------------------------------------------------------------------
  // LIFESTYLE — FAMILIES (6 images)
  // -------------------------------------------------------------------------
  {
    filename: "lifestyle-family-courtyard-05.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "A young South Asian family — mother and father both around 32, two young children aged roughly 4 and 7 — playing together in a landscaped residential courtyard garden, surrounded by contemporary brick apartment buildings with balconies and greenery, casual everyday clothing, bright natural daylight, candid spontaneous moment with the children running, warm lifestyle documentary photography, warm natural colour grading, no text or signage visible",
  },
  {
    filename: "lifestyle-family-community-centre-06.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "A young Black family — mother around 30, father around 33, one toddler on the father's shoulders — walking through the bright entrance lobby of a modern community centre or public leisure building, casual relaxed clothing, large glazed facade letting in natural daylight, timber and concrete interior, laughing candid moment, lifestyle documentary photography, warm neutral colour grading, no text or signage visible",
  },
  {
    filename: "lifestyle-family-park-path-07.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "A young white British family — mother and father both around 29, one child aged around 5 on a small bicycle — on a wide path through a contemporary urban park adjacent to modern residential buildings, relaxed weekend clothing, soft dappled natural light through tree canopy, candid moment with the parents walking alongside the child, lifestyle photography, warm earthy colour grading, no text visible",
  },
  {
    filename: "lifestyle-family-new-home-08.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "A young multi-ethnic family — South Asian mother around 31, white British father around 34, baby held in arms — standing on the threshold of a modern new-build apartment doorway, looking outward with calm happy expressions, contemporary residential building exterior visible with pale brick and timber cladding, natural daylight, candid lifestyle documentary photography, warm colour grading, no text or signage visible",
  },
  {
    filename: "lifestyle-family-rooftop-terrace-09.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "A young East Asian family — mother around 30, father around 33, young child aged around 6 — sitting at an outdoor table on a communal rooftop terrace of a contemporary apartment building, city skyline visible beyond, casual clothing, warm late afternoon sunlight, the child draws while parents talk over drinks, candid lifestyle photography, cinematic warm colour grading, no text or logos visible",
  },
  {
    filename: "lifestyle-family-mixed-gen-cafe-10.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "A multi-generational family group in a warm modern café — young Black couple in their early thirties, their two young children, and an active healthy-looking grandmother aged around 58 in casual clothes — all seated around a large table sharing food, natural window light, animated conversation, candid lifestyle photography, warm golden colour grading, no legible text or signage",
  },

  // -------------------------------------------------------------------------
  // LIFESTYLE — COMMUNITY / GROUPS (4 images)
  // -------------------------------------------------------------------------
  {
    filename: "lifestyle-community-lobby-11.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "A small diverse group of young residents in their late twenties and early thirties — South Asian woman, white British man, Black woman, mixed-race man — gathered casually in the bright entrance lobby of a contemporary apartment building, some holding coffee cups, one looks at a phone, relaxed casual clothing, morning natural light from a glazed entrance wall, candid documentary lifestyle photography, warm neutral colour grading, no text or signage visible",
  },
  {
    filename: "lifestyle-community-square-12.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "A relaxed outdoor community scene in a contemporary urban public square — several young adults in their twenties and thirties of mixed ethnicities sitting and standing around low seating, some chatting, one reading, one with a takeaway coffee, modern mixed-use buildings with ground floor retail on all sides, trees and planting, bright natural daylight, candid street documentary photography, warm colour grading, no legible text or signage",
  },
  {
    filename: "lifestyle-community-multigenerational-13.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "A multi-generational group in a contemporary urban park — a young South Asian couple in their early thirties, their child aged around 8, and two active healthy grandparent figures in their late fifties dressed in casual relaxed clothing — all walking together on a wide path beside modern residential architecture and mature trees, golden afternoon light, candid lifestyle documentary photography, warm earthy colour grading, no text visible",
  },
  {
    filename: "lifestyle-community-coworking-14.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "Three young professionals in their late twenties — a Black woman, an East Asian man, and a white woman — sitting informally in a bright co-working lounge space, casual clothing, one laptop open, relaxed conversation, modern interior with biophilic planting, natural light from tall windows, no corporate formality, candid lifestyle photography, warm muted colour grading, no legible text on screens",
  },

  // -------------------------------------------------------------------------
  // LIFESTYLE — INDIVIDUALS (3 images)
  // -------------------------------------------------------------------------
  {
    filename: "lifestyle-individual-window-15.png",
    outputDir: "lifestyle",
    aspectRatio: "4:5",
    prompt:
      "A young Black woman around 28 sitting alone at a café window table, casual clothing — oversized cream knit jumper — looking out at the street with a contemplative calm expression, a coffee cup on the table, soft morning natural light, shallow depth of field, candid portrait photography, warm golden colour grading, no text or signage visible",
  },
  {
    filename: "lifestyle-individual-urban-walk-16.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "A young South Asian man around 31 walking alone along a wide contemporary urban street, casual clothing — light jacket, plain t-shirt, dark jeans — relaxed gait, looking slightly to the side with a calm confident expression, modern mixed-use buildings on either side, street trees, natural overcast daylight, candid street photography style, warm neutral colour grading, no text or signage visible",
  },
  {
    filename: "lifestyle-individual-bench-17.png",
    outputDir: "lifestyle",
    aspectRatio: "4:5",
    prompt:
      "A young white British woman around 26 sitting alone on a modern timber bench in a landscaped residential courtyard, looking at her phone with a slight smile, casual relaxed clothing — jeans and a soft khaki jacket — modern apartment building visible softly blurred behind her, dappled natural light, candid lifestyle photography, warm earthy colour grading, no legible text on phone screen",
  },

  // -------------------------------------------------------------------------
  // LIFESTYLE — ARCHITECTURE WITH PEOPLE AT HUMAN SCALE (3 images)
  // -------------------------------------------------------------------------
  {
    filename: "lifestyle-arch-streetscene-18.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "A contemporary British urban streetscene at ground level — pale brick mixed-use buildings with active retail ground floor, wide pavement with trees and cycle lanes, several everyday people in casual clothing visible at a comfortable distance as part of the scene, bright overcast natural daylight, architectural lifestyle photography, warm neutral colour grading, no legible text or signage",
  },
  {
    filename: "lifestyle-arch-entrance-19.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "The welcoming entrance of a modern contemporary apartment building or community hub — pale brick and dark steel facade, double-height glazed entrance, a young family and a couple visible at human scale near the entrance, generous landscaping and seating outside, soft natural daylight, architectural documentary photography style, warm muted tones, no text or signage visible",
  },
  {
    filename: "lifestyle-arch-rooftop-view-20.png",
    outputDir: "lifestyle",
    aspectRatio: "16:9",
    prompt:
      "Looking across a communal rooftop garden terrace of a contemporary residential building toward a cityscape of mixed modern and traditional urban architecture, a young couple in casual clothing visible in the mid-ground leaning on the parapet, lush planting in the foreground, warm late afternoon golden light, wide cinematic composition, lifestyle architectural photography, warm cinematic colour grading, no text visible",
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
  const label = `[${index + 1}/${images.length}] ${imageSpec.filename}`;
  console.log(`\n${label}`);
  console.log(`  Prompt: ${imageSpec.prompt.substring(0, 120)}...`);

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
  console.log("Playbook Advisory Group — Image Generation Run 4");
  console.log(`Model: black-forest-labs/flux-1.1-pro`);
  console.log(`Images to generate: ${images.length}`);
  console.log(`Output base: ${BASE_DIR}`);
  console.log("=".repeat(60));
  console.log("NOTE: Run 4 — lifestyle/community imagery, no suits or hard hats.");
  console.log("      All adults 25-40 unless grandparent figure (50s-60s).");
  console.log("      Strong ethnic diversity across all 20 images.");

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
  const manifestPath = path.join(BASE_DIR, "generation-manifest-run4.json");
  const manifest = {
    generatedAt: new Date().toISOString(),
    model: "black-forest-labs/flux-1.1-pro",
    run: 4,
    notes: [
      "Lifestyle and community imagery — no suits, no hard hats, no construction sites.",
      "Casual / smart-casual dress. Real-world everyday settings.",
      "Families welcome including multi-generational groups.",
      "Adults 25-40 years old; grandparent figures 50s-60s max.",
      "Strong ethnic diversity across the full set.",
    ],
    subdirectory: "lifestyle",
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
