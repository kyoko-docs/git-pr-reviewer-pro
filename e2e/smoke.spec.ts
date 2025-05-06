// e2e/smoke.spec.ts
import { test, expect } from "@playwright/test";

test("popup.html が 200 OK で応答する", async ({ request }) => {
  const BASE = process.env.PREVIEW_URL ?? "http://localhost:5000";
  const resp = await request.get(`${BASE}/popup.html`);
  expect(resp.status()).toBe(200);
});
