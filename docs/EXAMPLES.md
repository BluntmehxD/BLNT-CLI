# BLNT-CLI Examples

This document provides practical examples of using BLNT-CLI.

## Setup

First, install and configure:

```bash
# Install globally
npm install -g blnt-cli

# Or use with npx
npx blnt-cli --help
```

## Basic Usage

### 1. Simple Query

```bash
$ blnt query "What is Node.js?"

██████╗ ██╗     ███╗   ██╗████████╗
██╔══██╗██║     ████╗  ██║╚══██╔══╝
██████╔╝██║     ██╔██╗ ██║   ██║   
██╔══██╗██║     ██║╚██╗██║   ██║   
██████╔╝███████╗██║ ╚████║   ██║   
╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   

  AI-Powered Terminal Assistant
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔄 Initializing AI provider...
📡 Using: Ollama (Local)

Query: What is Node.js?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Response:
Node.js is an open-source, cross-platform JavaScript runtime environment...

✓ Query completed
```

### 2. Interactive Chat

```bash
$ blnt chat

# Opens interactive UI where you can have a conversation
```

### 3. Context-Aware Query

```bash
$ blnt context "What are the main features?"

# Reads BLNT.md and uses it as context for the query
```

## Configuration Examples

### View Current Configuration

```bash
$ blnt config get

📋 Current Configuration:

  model: llama2
  provider: ollama
  ollamaUrl: http://localhost:11434
  apiKey: (not set)
```

### Set Model

```bash
$ blnt config set model codellama
✓ Configuration updated: model = codellama
```

### Set API Key

```bash
$ blnt config set apiKey sk-proj-xxxxx
✓ Configuration updated: apiKey = sk-proj-xxxxx
```

## Advanced Examples

### 1. Code Review

```bash
# Review a specific file
blnt query "Review this code and suggest improvements: $(cat src/utils/helper.js)"

# Using context mode for project-aware review
blnt context "Review the authentication implementation"
```

### 2. Generate Documentation

```bash
# Generate README for current project
blnt context "Generate a comprehensive README.md for this project"

# Generate function documentation
blnt query "Generate JSDoc comments for: $(cat src/api.js)"
```

### 3. Explain Errors

```bash
# Explain an error message
blnt query "Explain this error: TypeError: Cannot read property 'map' of undefined"

# Debug with stack trace
ERROR=$(npm test 2>&1)
blnt query "Explain this test error: $ERROR"
```

### 4. Generate Code

```bash
# Generate a function
blnt query "Write a TypeScript function to validate email addresses"

# Generate with specific model
blnt query --model codellama "Write a Python script to parse JSON files"
```

### 5. Learning

```bash
# Learn a concept
blnt query "Explain async/await in JavaScript with examples"

# Compare technologies
blnt query "Compare React hooks vs class components"
```

### 6. Creative Writing

```bash
# Start interactive session for creative writing
blnt chat
> Write a short story about an AI assistant

# Generate commit messages
CHANGES=$(git diff)
blnt query "Generate a conventional commit message for these changes: $CHANGES"
```

## Project Context Example

Create a `BLNT.md` file in your project:

```markdown
# MyApp

A web application for managing tasks.

## Tech Stack
- Frontend: React with TypeScript
- Backend: Node.js with Express
- Database: PostgreSQL
- Auth: JWT tokens

## Key Features
1. User authentication
2. Task CRUD operations
3. Real-time updates
4. File attachments
```

Now ask project-specific questions:

```bash
$ blnt context "How should I implement file uploads?"
# Uses the tech stack info from BLNT.md to give relevant answer

$ blnt context "Suggest improvements to the authentication"
# Knows you're using JWT and can give specific advice
```

## Scripting Examples

### Auto-generate Commit Messages

```bash
#!/bin/bash
# generate-commit.sh

if [ -z "$(git diff --cached)" ]; then
  echo "No staged changes"
  exit 1
fi

DIFF=$(git diff --cached)
MESSAGE=$(blnt query "Generate a conventional commit message for: $DIFF")

echo "Suggested commit message:"
echo "$MESSAGE"
echo ""
read -p "Use this message? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git commit -m "$MESSAGE"
fi
```

### Code Review Automation

```bash
#!/bin/bash
# review-pr.sh

FILES=$(git diff --name-only main...HEAD)

for file in $FILES; do
  echo "Reviewing $file..."
  CONTENT=$(cat "$file")
  blnt query "Review this file for best practices: $CONTENT" > "review-$file.txt"
done

echo "Reviews saved to review-*.txt files"
```

### Documentation Generator

```bash
#!/bin/bash
# generate-docs.sh

for file in src/**/*.js; do
  echo "Documenting $file..."
  CONTENT=$(cat "$file")
  DOCS=$(blnt query "Generate JSDoc comments for: $CONTENT")
  echo "$DOCS" > "docs/$(basename $file .js).md"
done
```

## Workflow Integration

### With Git Hooks

`.git/hooks/commit-msg`:
```bash
#!/bin/bash
COMMIT_MSG=$(cat "$1")
SUGGESTION=$(blnt query "Improve this commit message: $COMMIT_MSG")
echo "Suggested: $SUGGESTION"
```

### With CI/CD

```yaml
# .github/workflows/ai-review.yml
name: AI Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install -g blnt-cli
      - run: |
          blnt config set apiKey ${{ secrets.OPENAI_API_KEY }}
          git diff origin/main...HEAD > changes.diff
          blnt query "Review these changes: $(cat changes.diff)" > review.md
      - uses: actions/upload-artifact@v2
        with:
          name: ai-review
          path: review.md
```

## Tips and Best Practices

1. **Use Context Mode**: Create `BLNT.md` files in your projects for better, project-aware responses
2. **Choose Right Model**: Use `codellama` for code, `llama2` for general questions
3. **Interactive for Exploration**: Use `blnt chat` when you need back-and-forth conversation
4. **Script for Automation**: Use `blnt query` in scripts for automation
5. **Local First**: Keep Ollama running for faster, private responses

## Troubleshooting

### Ollama Not Detected

```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Start Ollama
ollama serve

# Pull a model
ollama pull llama2
```

### Slow Responses

```bash
# Use a smaller model
blnt config set model llama2:7b

# Or switch to API with faster model
blnt config set apiKey sk-xxx
blnt config set model gpt-3.5-turbo
```

### Memory Issues

```bash
# For large context files, split into smaller queries
# Instead of passing entire file:
blnt query "Review the authentication module" < src/auth.js

# Use context mode which is optimized:
blnt context "Explain the authentication"
```

---

For more examples and updates, visit: https://github.com/BluntmehxD/BLNT-CLI
