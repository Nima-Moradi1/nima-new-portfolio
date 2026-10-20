# T00 — Safety snapshot

Date: 2026-10-20 (Asia/Tehran). Status: PASS for isolated kickoff; no publication authorized.

- Requested workspace `C:/Users/n_moradirad/Desktop/updated-portfolio` was empty. Existing source was found at sibling `nima-new-portfolio`, clean on `main` at commit `a18911c0f9f493eed70fd8c65f844d6853be1e44`, origin `https://github.com/Nima-Moradi1/nima-new-portfolio`.
- Created a reversible isolated Git worktree in the requested workspace: `git worktree add -b feat/nm-kinetic-portfolio C:/Users/n_moradirad/Desktop/updated-portfolio HEAD`. The user's request to begin the supplied workflow authorizes local preparation; no merge, push, or deployment follows from it. Original `main` and source files were preserved.
- ZIP extracted beside both checkouts at `C:/Users/n_moradirad/Desktop/NM_Codex_Portfolio_Blueprint`. All **18** listed SHA-256 hashes matched before editing. Archive paths were checked to remain within the named destination. This sibling extraction remains the original package; working guidance is copied into this worktree.
- Existing `docs/` was preserved; numbered blueprint docs were added without collisions. Root `AGENTS.md`, `HANDOFF.md`, `CODEX_PROMPT.md`, `README_FA.md`, concept `assets/`, `templates/` and original `SHA256_MANIFEST.txt` were added. The manifest identifies the original package, not subsequent live handoff edits.
- Runtime: Next 16.2.10, React 19.2.4, Three 0.182.0, R3F 9.6.1, Tailwind 4, next-intl, Motion; no application dependencies changed. Both npm and pnpm lockfiles exist at baseline. Deployment uses **npm ci / package-lock.json**; do not regenerate either lockfile at kickoff.
- Production workflow `.github/workflows/deploy-liara.yml` responds to pushes on `main` and manual dispatch, and checks `github.ref == 'refs/heads/main'`. No workflow, secret, environment, production branch or remote was changed.
- Public/private boundary: retain existing public contact transport and public-safe résumé. Do not copy a phone number into evidence, the résumé, or new UI. An expanded phone exposure decision and inconsistent education completion date remain owner decisions before new public copy is finalized (T04).
- Route/source inventory and reuse map: `T02_SOURCE_AUDIT.md`. Claim and Sarochi access ledger: `T04_CLAIMS_AND_SAROCHI.md`.

## Verification

PASS: archive entry path checks; `Get-FileHash -Algorithm SHA256` for all manifest entries; source `git status --short` (empty), `git branch --show-current`, `git rev-parse HEAD`, `git remote -v`, `git worktree list`; worktree branch is `feat/nm-kinetic-portfolio` at the same HEAD. `git diff --stat` shows no tracked application changes at kickoff. New guidance/evidence files are untracked intentionally; no commit/push requested.

NOT RUN for T00: app tests/build, Lighthouse, animation verification. These belong to T01–T04 and retain their own results.

Correction to initial package: the SHA described there as only a public tree SHA is confirmed by the local repository to be the actual checked-out **commit** SHA too. Do not infer future production identity from this snapshot.
