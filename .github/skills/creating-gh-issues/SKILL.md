---
name: creating-gh-issues
description: Learn how to create a GitHub issue using the GitHub API.
---

# Creating GitHub Issues Skill
When asked for creating GitHub issues, follow these steps:

1. **Capture inputs**: 
  - Draft the issue title from the specification or context; if unclear, ask.
  - Identify the repo remote URL from Context or [AGENTS.md](AGENTS.md).
  - If not, identify it using local git commit commands to get the remote URL.
    - Save the remote URL at [AGENTS.md](AGENTS.md) for future reference.


2. **Create the GitHub Issues**:
  - Use the GitHub MCP tool to create the issue in the current repository.
  - Set the issue title and body based on the provided context or specification.
  - Add a label `bug` or `enhancement` based on the content.
  - Save the created issue URL for reference in the ID for tracking.

3. **Double-Link to specification (if applicable)**: 
  - If the issue is created based on specification file:
    - Add the created issue URL back to the specification file for traceability.
    - Add the GitHub spec file URL to the created issue body for context.

4. **Respond with the issue URL**: 
  - Return the created issue URL to the user for reference.