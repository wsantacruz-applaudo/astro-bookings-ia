# Rockets

## Context
- An API endpoint to manage rockets in the AstroBookings travel application
- Each rocket has:
  - `name`: Name of the rocket (string)
  - `capacity`: Maximum number of passengers (integer)
  - `status`: Current status of the rocket (string, e.g., "available", "maintenance", "in-flight")
  - `range`: Maximum distance the rocket can travel (string, e.g., "low", "medium", "high")

## Specification Template
Follow this template for writting the specification  file `specs/rockets/spec.md`:

```md
# Rockets API Specification
## Problem Description
- As {role}, I want to {goal} so that {reason}.
## Solution Overview
- {Simple approach to solve the problem, no technical details.}
## Acceptance Criteria
- [ ] EARS Format
```

### Steps to follow
- Define the problem
   - Clearly outline the problem with up to 3 user stories
- Outline the solution
   - Provide a high-level overview of the solution, including any relevant technical details
- Set Acceptance Criteria
   - Define the acceptance criteria for the solution using the EARS format (Event-Driven, Action-Driven, Result-Driven, State-Driven)

### Output Checklist
- [ ] The output should be a markdown file named `specs/rockets/spec.md`
- [ ] The specification with:
  - Problem description with user stories
  - Solution overview
  - Acceptance criteria in EARS format