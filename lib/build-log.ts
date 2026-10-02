export type BuildChange = {
  path: string;
  additions?: number;
  deletions?: number;
  status?: "added" | "modified" | "deleted" | "renamed";
};

export type BuildLogInput = {
  repository: string;
  commitSha: string;
  commitMessage: string;
  author?: string;
  changes: BuildChange[];
};

export type BuildLogDraft = {
  status: "draft";
  title: string;
  summary: string;
  highlights: string[];
  evidence: {
    repository: string;
    commitSha: string;
    commitMessage: string;
    includedPaths: string[];
    excludedPaths: string[];
  };
  approvalRequired: true;
};

const SENSITIVE_OR_NOISE = [
  /(^|\/)\.env(?:\.|$)/i,
  /(^|\/)(?:secrets?|credentials?)(?:\.|\/|$)/i,
  /(^|\/)node_modules\//i,
  /(^|\/)\.next\//i,
  /(^|\/)dist\//i,
  /(^|\/)coverage\//i,
  /package-lock\.json$/i,
  /pnpm-lock\.yaml$/i,
  /yarn\.lock$/i,
];

function shouldExclude(path: string) {
  return SENSITIVE_OR_NOISE.some((pattern) => pattern.test(path));
}

function areaFor(path: string) {
  const normalized = path.replace(/^\.\//, "");
  const first = normalized.split("/")[0] || "project";
  const aliases: Record<string, string> = {
    app: "application",
    components: "UI",
    lib: "core logic",
    tests: "tests",
    docs: "documentation",
    db: "database",
    public: "assets",
  };
  return aliases[first] ?? first;
}

function compactMessage(message: string) {
  const cleaned = message.trim().replace(/\s+/g, " ");
  return cleaned || "Project update";
}

export function draftBuildLog(input: BuildLogInput): BuildLogDraft {
  const included = input.changes.filter((change) => !shouldExclude(change.path));
  const excluded = input.changes.filter((change) => shouldExclude(change.path));
  const areas = [...new Set(included.map((change) => areaFor(change.path)))];
  const additions = included.reduce((sum, change) => sum + (change.additions ?? 0), 0);
  const deletions = included.reduce((sum, change) => sum + (change.deletions ?? 0), 0);
  const message = compactMessage(input.commitMessage);

  const highlights: string[] = [];
  if (areas.length) {
    highlights.push(`Worked across ${areas.slice(0, 4).join(", ")}${areas.length > 4 ? " and more" : ""}.`);
  }
  if (included.length) {
    highlights.push(`${included.length} shareable file change${included.length === 1 ? "" : "s"} captured from the commit.`);
  }
  if (additions || deletions) {
    highlights.push(`Change footprint: +${additions} / -${deletions} lines across included files.`);
  }
  if (!highlights.length) {
    highlights.push("No shareable source changes were detected after safety filtering.");
  }

  const summary = included.length
    ? `${message}. This draft was generated from commit metadata and ${included.length} filtered file change${included.length === 1 ? "" : "s"}; review the wording before publishing.`
    : `${message}. No shareable file paths remained after filtering, so this draft intentionally avoids inventing implementation details.`;

  return {
    status: "draft",
    title: message,
    summary,
    highlights,
    evidence: {
      repository: input.repository,
      commitSha: input.commitSha,
      commitMessage: input.commitMessage,
      includedPaths: included.map((change) => change.path),
      excludedPaths: excluded.map((change) => change.path),
    },
    approvalRequired: true,
  };
}
