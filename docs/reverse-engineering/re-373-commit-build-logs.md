# RE-373 — Commit-to-Build-Log workflow

## Source evidence

Primary source: https://www.reddit.com/r/SideProject/s/4jXVQ9Gggi (observed 2026-10-02; post dated 2026-09-28).

The source describes a Kairo workflow that reduces the context switch between coding and public progress updates: commit code, let AI analyze the change, receive a draft build log, review/edit it, and publish only if the builder chooses. The author explicitly says nothing is published automatically and frames the goal as removing friction rather than automating public posting.

## Visible feedback

The supplied Reddit thread currently exposes one top-level commenter exchange. It is playful and does not add a concrete product requirement. No comment-linked child product was identified from the visible thread. This dossier therefore does not manufacture additional community feedback.

## Clean-room interpretation

BuilderSignal should not clone Kairo branding, UI, proprietary prompts, or implementation. The transferable product insight is the workflow boundary:

`commit evidence -> safe analysis -> editable draft -> explicit approval -> optional distribution`

BuilderSignal's version should differentiate through evidence receipts, deterministic safety filtering, multi-channel drafting, draft history, and explicit approval receipts.

## Phase A implemented

- Typed commit/change input contract.
- Deterministic evidence-first draft generator.
- Filters likely secret/generated/noise paths before draft evidence is constructed.
- Uses commit metadata and file statistics without exposing raw diff bodies.
- Draft status is always `draft` and `approvalRequired` is always true.
- Draft-only API: `POST /api/build-logs/draft`.
- Unit coverage for normal drafting, sensitive/noise filtering, and all-filtered low-signal commits.

## Planned slices

### Phase B — GitHub ingestion
- GitHub App/OAuth or narrowly scoped token connection.
- Select repository/branch/commit range.
- Fetch commit metadata and changed-file statistics.
- Idempotent ingestion keyed by repository + commit/range.
- Store immutable evidence receipt separate from editable copy.

### Phase C — assisted writing
- Optional provider-backed rewrite/polish stage.
- Evidence-constrained prompt contract: no claims unsupported by captured changes.
- Tone presets and channel targets (BuilderSignal, Markdown, X/LinkedIn/Reddit-ready drafts).
- Side-by-side evidence and generated prose.

### Phase D — review and history
- Draft persistence and revisions.
- Human edit UI with evidence inspector.
- Explicit approve/revoke transitions.
- Never infer approval from opening, editing, committing, or CLI execution.

### Phase E — optional distribution
- Publish adapters remain disabled until explicit per-draft approval.
- Preview exact payload before external write.
- Store channel receipt/URL and exact approved draft hash.
- Retry must be idempotent and must not silently post a changed draft.

### Phase F — CLI
- `buildersignal log <sha|range>` creates/retrieves a draft.
- `buildersignal preview` renders the exact current draft.
- No `post on commit` default; hooks may create a local/server draft only.

## Safety/product principles

1. Human control is a product requirement, not an implementation detail.
2. Evidence collection and prose generation are separate stages.
3. Secret/noise filtering happens before prose creation.
4. Low-signal commits produce a low-signal draft instead of invented accomplishments.
5. External publication requires explicit approval of the exact draft being sent.

## Current truthful status

Research complete for the supplied public thread. Phase A implementation is in progress on `reverse/re-373-commit-build-logs`. GitHub ingestion, model-backed writing, persistence, UI review, CLI and publishing adapters are not yet implemented or claimed.