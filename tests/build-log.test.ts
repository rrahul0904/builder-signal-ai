import assert from "node:assert/strict";
import test from "node:test";

import { draftBuildLog } from "../lib/build-log";

test("creates a draft with evidence and approval required", () => {
  const draft = draftBuildLog({
    repository: "acme/widget",
    commitSha: "abcdef1234567",
    commitMessage: "feat: add team invite flow",
    changes: [
      { path: "app/invite/page.tsx", additions: 40, deletions: 2, status: "added" },
      { path: "lib/invitations.ts", additions: 20, deletions: 5, status: "modified" },
      { path: "tests/invitations.test.ts", additions: 18, deletions: 0, status: "added" },
    ],
  });

  assert.equal(draft.status, "draft");
  assert.equal(draft.approvalRequired, true);
  assert.equal(draft.evidence.commitSha, "abcdef1234567");
  assert.deepEqual(draft.evidence.includedPaths, [
    "app/invite/page.tsx",
    "lib/invitations.ts",
    "tests/invitations.test.ts",
  ]);
  assert.match(draft.highlights.join(" "), /application/);
  assert.match(draft.highlights.join(" "), /core logic/);
  assert.match(draft.highlights.join(" "), /tests/);
  assert.match(draft.highlights.join(" "), /\+78 \/ -7/);
});

test("filters secret and generated paths from shareable evidence", () => {
  const draft = draftBuildLog({
    repository: "acme/widget",
    commitSha: "abcdef1234567",
    commitMessage: "chore: rotate config and rebuild",
    changes: [
      { path: ".env.production", additions: 4 },
      { path: "node_modules/pkg/index.js", additions: 100 },
      { path: "package-lock.json", additions: 50 },
      { path: "app/page.tsx", additions: 3 },
    ],
  });

  assert.deepEqual(draft.evidence.includedPaths, ["app/page.tsx"]);
  assert.deepEqual(draft.evidence.excludedPaths, [
    ".env.production",
    "node_modules/pkg/index.js",
    "package-lock.json",
  ]);
});

test("does not invent details when all changes are filtered", () => {
  const draft = draftBuildLog({
    repository: "acme/widget",
    commitSha: "abcdef1234567",
    commitMessage: "chore: dependency refresh",
    changes: [{ path: "package-lock.json", additions: 500, deletions: 450 }],
  });

  assert.equal(draft.evidence.includedPaths.length, 0);
  assert.match(draft.summary, /avoids inventing implementation details/);
  assert.deepEqual(draft.highlights, [
    "No shareable source changes were detected after safety filtering.",
  ]);
});
