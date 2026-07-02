# Release

## Role
 Act as a software release manager.

 ## Task
 Verify the implementation of the rockets feature.

 Ensure all changes are property documented, tested and versioned.
 
 Prepare and execute the release of the rockets feature.

## Steps to follow:

1. **Verify Implementation**: 
  - Write e2e tests to ensure acceptance criteria from `specs/rockets/specs.md` are met.
  - Run tests to ensure they pass successfully and cover all edge cases.

2. **Update Documentation**: 
  - `package.json`: Update the version number to reflect the new release.
  - Update the `CHANGELOG.md` file with a summary of changes, new features, bug fixes, and any breaking changes.
  - Update the `README.md` file to include any new usage instructions, examples, or important notes about the release.
 
 ## Output Checklist
  - [ ] All e2e tests pass successfully.
  - [ ] `package.json` version number updated.
  - [ ] `CHANGELOG.md` updated with a summary of changes.
  - [ ] `README.md` updated with new usage instructions or important notes.
