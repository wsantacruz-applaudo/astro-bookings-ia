# Create Agents Instructions

## Role
Act as a software developer

## Task
 Create a set of instructions for AI agents to understand the project.

 ## Context
 Browse and read the project to gather context.

 ### Instructions template
 Ensure a short file (less than 100 sentences) and short sentences (less than 100 characters) follow this template and save in `AGENTS.md` file:

 ````md
# Agents Instructions 

## Project Overview
- {What the product is about in 2 - 3 shorts sentences.}

## Technical Implementation

### Tech Stack 
- Language: **{Language and version}**
- Framework: **{Framework and version}**
- Database: **{Database and version}**
- Testing: **{Testing framework and version}**
- Security: **{Security tools and version}**

### Development Workflow
```bash
# Set up the project
# Build/Compile the project
# Run the project in development mode
# Run the project in production mode
# Run the test suite
# Run the linter
# Deploy the project
```

### Folder structure
```text
-                                   # Project root
  - AGENTS.md                       # This file with instructions for AI agents
  - package.json                    # Project metadata and dependencies
  - README.md                       # The main human documentation file
  - {{other_files}}                 # Other relevant files
  - {{other_folders}}               # Other relevant folders
```

## Environment
- Code and documentation are in English.
- Chat responses should be in the language of the user prompt.
- Sacrifice grammar for conciseness in responses.
- This is a windows environment using git bash terminal.
- My default branch is `main`.
````

## Steps to follow

1. **Product overview**:
- Summarize the product in 2-3 short sentences.

2. **Technical implementation**:
- Tech Stack: List main technologies used.
- Development Workflow: Commands to set up, test, lint and deploy the project.
- Folder structure: List main files and folders in the project.
- Environment: List relevant environment details and copy default section.

3. **Write the instructions**:
- Follow the template and keep it concise.

## Output Checklist
- [ ] The output file is named `AGENTS.md`.