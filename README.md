# tasks-fixture

Fixture repository for testing the [Tasks](https://github.com/iamnbutler/tasks) platform.

This repo has sample issues and PRs that the Tasks server can poll, dispatch to agents, and process through the merge queue.

## What's here

- A small TypeScript project (a CLI utility) that agents can work on
- GitHub issues with varying labels, priorities, and complexity
- PRs for testing the merge queue

## Labels

| Label | Purpose |
|-------|---------|
| `bug` | Bug fix tasks |
| `enhancement` | Feature work |
| `documentation` | Docs tasks |
| `good first issue` | Simple, well-scoped tasks |
| `needs-design` | Blocked — requires design decision first |
| `agentic-workflows` | Ignored by Tasks (meta label) |
