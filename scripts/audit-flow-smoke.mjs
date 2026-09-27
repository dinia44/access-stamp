/** Run against a local production build. No external AI or delivery credentials are used. */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const base = "http://127.0.0.1:3010";
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3010",
  ],
  {
    stdio: ["ignore", "pipe", "inherit"],
    env: { ...process.env, OPENAI_API_KEY: "", SUBMISSION_WEBHOOK_URL: "" },
  },
);

try {
  await new Promise((resolve, reject) => {
    server.stdout.on("data", (data) => {
      if (data.toString().includes("Ready")) resolve();
    });
    server.on("error", reject);
    server.on("exit", (code) => reject(new Error(`Server exited ${code}`)));
  });
  const smoke = spawn(process.execPath, ["scripts/smoke-routes.mjs", base], {
    stdio: "inherit",
  });
  assert.equal(await new Promise((resolve) => smoke.on("exit", resolve)), 0);
  const ask = async (body) => {
    const response = await fetch(`${base}/api/ask`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    return {
      status: response.status,
      cache: response.headers.get("cache-control"),
      body: await response.json(),
    };
  };
  assert.equal(
    (await ask({ situation: "short", nation: "England" })).status,
    400,
  );
  assert.equal(
    (
      await ask({
        situation: "I need changes to my desk at work",
        nation: "France",
      })
    ).status,
    400,
  );
  assert.equal(
    (await ask({ situation: "x".repeat(17000), nation: "England" })).status,
    413,
  );
  const valid = await ask({
    situation: "I need reasonable adjustments to my desk at work",
    nation: "England",
  });
  assert.equal(valid.status, 200);
  assert.equal(valid.cache, "no-store");
  assert.equal(valid.body.mode, "guide-extracts");
  assert.ok(valid.body.sources.length);
  assert.ok(
    valid.body.plan.steps.every((s) =>
      valid.body.sources.some((source) => source.slug === s.sourceSlug),
    ),
  );
  const unrelated = await ask({
    situation: "xylophone basalt mineralogy",
    nation: "England",
  });
  assert.equal(unrelated.body.sources.length, 0);
  assert.equal(unrelated.body.plan.steps.length, 0);
  const guide = await (
    await fetch(`${base}/advice/pip-in-plain-english`)
  ).text();
  assert.equal((guide.match(/aria-label="On this page"/g) ?? []).length, 1);
  assert.equal(
    (guide.match(/>Make this guide personal<\/h2>/g) ?? []).length,
    1,
  );
  const cards = await (await fetch(`${base}/help-cards`)).text();
  assert.ok(cards.includes('href="/help-cards/section-88-driving-licence"'));
  const submission = await fetch(`${base}/api/submit-venue`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Test venue",
      location: "Test town",
      type: "Cafe",
    }),
  });
  assert.equal(submission.status, 503);
  console.log(
    "Audit flow checks passed: API validation, source provenance, no-key fallback, off-topic fallback, guide structure, Help Card links and unavailable delivery.",
  );
} finally {
  server.kill("SIGTERM");
}
