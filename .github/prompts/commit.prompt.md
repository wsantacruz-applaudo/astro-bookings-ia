---
name: commit
description: Commit changes to the repository.
model: GPT-5 mini (copilot)
tools: [execute, read]
---

# Commit Changes

## Role
Act as a software developer.

## Task
Commit the pending changes.
Use the terminal tool to run git commands.

## Context
Use the `commit-changes` skill as reference.

## Output checklist:
- [ ] There are n ot uncommitted changes in the current branch.