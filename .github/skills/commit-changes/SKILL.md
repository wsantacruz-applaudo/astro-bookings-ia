----
name: commit-changes
description: > 
  Commit changes to the repository.
  To be used for committing changes made by other skills.
----

# Commit Changes
When asked for commiting changes, follow these steps:

1. **Check for uncommitted changes**: Use `git status` to see if there are any uncommitted changes in the repository.
2 **Group changes**: 
  - If there are multiple changes, group them logically into separate commits. 
  - Decide on meaninful commit messages that accurately describe the changes made.
3. **Stage changes**: Use `git add <file>` to stage the changes you want to commit. You can also use `git add .` to stage all changes.
4. **Commit changes**: Commit the staged changes using [conventional commit messages](./conventional-commits.md) guidelines.

