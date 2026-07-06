---
name: releasing-version
description: Skill for updating documentation, generating change logs, and versioning.
---

# Releasing version Skill

Automate the process of managing releases, including:
  - Updating documentation with the latest changes.
  - Generating change logs.
  - Versioning the project.

Use terminal git commands as needed.

# Step 1: Update Documentation
- [ ] [AGENTS.md](AGENTS.md) is updated with the latest changes.
  - tech stack,
  -setup/dev instructions.
  - folder structure are accurate.

- [ ] Other relevant project files (`package.json`, `README.md`, etc.) are updated to reflect the latest changes.

# Step 2: Generate Change Logs
- [ ] Commit all pending changes grouping them by type of change.
- [ ] Use [semantic versioning (Sem Ver)](./sem-ver.md) principles.
- [ ] Generate a `CHANGELOG.md` file summarizing the changes made in the release.

# Step 3: Versioning
- [ ] If there is an issue/ticket id in the context, commit with `Close #ID`.
- [ ] Generate a git tag for the new version.