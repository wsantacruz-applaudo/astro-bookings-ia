---
name: add-logger
description: This prompt is used to add a logger to a project.
tools: [execute, agent, edit, web, github/add_comment_to_pending_review, github/add_issue_comment, github/create_or_update_file, github/get_commit, github/get_copilot_job_status, github/get_file_contents, github/get_label, github/get_latest_release, github/get_me, github/get_release_by_tag, github/get_tag, github/get_team_members, github/get_teams, github/issue_read, github/issue_write, github/list_branches, github/list_commits, github/list_issue_fields, github/list_issue_types, github/list_issues, github/list_pull_requests, github/list_releases, github/list_repository_collaborators, github/list_tags, github/merge_pull_request, github/pull_request_read, github/pull_request_review_write, github/push_files, github/request_copilot_review, github/run_secret_scanning, github/search_code, github/search_commits, github/search_issues, github/search_pull_requests, github/search_repositories, github/search_users, github/sub_issue_write, github/update_pull_request, github/update_pull_request_branch, todo]
---

# Add logger

## Role
Act as a software analyst and developer.

## Task
Create a  GitHub issue with a plan to add logging functionality to the codebase.
Do not write at this state. Just the plan to implement it.

## Context
The app needs a simple logging mechanism using console.log statements.

## Steps to follow

1. **Define the Problem**: Identify the areas in the codebase where logging is needed. This could include error handling, function entry and exit points, and important state changes.
2. **Plan the Implementation**: Decide on the logging format and the specific console.log statements to be added.
3. **Create a GitHub Issue**: Draft a GitHub issue outlining the plan, including the identified areas and the proposed logging statements.

## Output Checklist

- [ ] A GitHub issue is created with a clear title and description.
- [ ] The issue includes an actionable plan to be implemented.