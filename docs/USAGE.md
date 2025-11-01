# BLNT-CLI Usage Guide

## Overview

BLNT-CLI is a cross-platform, AI-powered command-line interface that brings intelligent assistance directly to your terminal. Built with a local-first approach, it automatically detects and uses Ollama running on your machine, with seamless fallback to cloud APIs when needed.

## Features

✨ **Local-First AI**: Automatically detects and uses Ollama (http://localhost:11434)
🌐 **API Fallback**: Seamlessly falls back to OpenAI API when local AI is unavailable
💬 **Multiple Modes**: Direct query, interactive chat, and context-aware interactions
⚙️ **Configurable**: Easy configuration management for models and API keys
🎨 **Beautiful UI**: Dark theme with neon accents and deluxe ASCII branding
🚀 **Production-Ready**: Built with oclif framework and Ink UI components

## Installation

```bash
npm install -g blnt-cli
```

Or use directly with npx:

```bash
npx blnt-cli "your query"
```

## Quick Start

### 1. Direct Query Mode

Ask a question directly from the command line:

```bash
blnt query "What is Node.js?"
blnt query "Explain quantum computing in simple terms"
blnt query --model llama2 "Write a haiku about coding"
```

### 2. Interactive Chat Mode

Start an interactive chat session:

```bash
blnt chat
```

Features:
- Real-time conversational AI
- Message history (last 10 messages displayed)
- Beautiful terminal UI with neon accents
- Press ESC or 'q' to exit

### 3. Context Mode

Query with context from a BLNT.md file:

```bash
blnt context "What does this project do?"
blnt context --file ./CONTEXT.md "Explain the architecture"
```

The context mode reads your BLNT.md (or custom file) and includes it in the query for more relevant answers.

## Configuration

BLNT-CLI uses a local configuration file to store your preferences.

### Set Configuration

```bash
# Set the AI model
blnt config set model llama2
blnt config set model gpt-3.5-turbo

# Set API key (for cloud providers)
blnt config set apiKey sk-your-api-key-here

# Set provider preference
blnt config set provider ollama
blnt config set provider openai

# Set custom Ollama URL
blnt config set ollamaUrl http://localhost:11434
```

### Get Configuration

```bash
# View all configuration
blnt config get

# View specific setting
blnt config get model
blnt config get apiKey
```

## Provider Configuration

### Using Ollama (Local)

1. Install Ollama from https://ollama.ai
2. Start Ollama (default: http://localhost:11434)
3. Pull a model: `ollama pull llama2`
4. Run BLNT-CLI - it will auto-detect Ollama

### Using OpenAI API

If Ollama is not available, BLNT-CLI automatically falls back to OpenAI:

1. Get an API key from https://platform.openai.com
2. Set the API key:
   ```bash
   blnt config set apiKey sk-your-api-key
   ```
3. Optionally set the model:
   ```bash
   blnt config set model gpt-4
   ```

You can also use environment variables:
```bash
export OPENAI_API_KEY=sk-your-api-key
blnt "your query"
```

## Command Reference

### Main Commands

#### `blnt query <QUERY>`
Execute a direct query to the AI.

**Arguments:**
- `QUERY` - Your question or prompt (required)

**Flags:**
- `-m, --model <model>` - Specify which model to use
- `-h, --help` - Show help

**Examples:**
```bash
blnt query "What is the capital of France?"
blnt query --model llama2 "Explain recursion"
```

#### `blnt chat`
Start an interactive chat session.

**Flags:**
- `-m, --model <model>` - Specify which model to use
- `-h, --help` - Show help

**Examples:**
```bash
blnt chat
blnt chat --model gpt-4
```

#### `blnt context <QUERY>`
Query with context from a markdown file.

**Arguments:**
- `QUERY` - Your question (required)

**Flags:**
- `-f, --file <file>` - Context file path (default: BLNT.md)
- `-m, --model <model>` - Specify which model to use
- `-h, --help` - Show help

**Examples:**
```bash
blnt context "What is the main feature?"
blnt context --file README.md "Summarize this"
```

#### `blnt config set <KEY> <VALUE>`
Set a configuration value.

**Arguments:**
- `KEY` - Configuration key (model, apiKey, provider, ollamaUrl)
- `VALUE` - Configuration value

**Examples:**
```bash
blnt config set model llama2
blnt config set apiKey sk-...
```

#### `blnt config get [KEY]`
Get configuration value(s).

**Arguments:**
- `KEY` - Configuration key (optional, shows all if omitted)

**Examples:**
```bash
blnt config get
blnt config get model
```

## Advanced Usage

### Creating a Context File

Create a `BLNT.md` file in your project directory:

```markdown
# My Project

This is a web application built with React and Node.js.
It handles user authentication and data management.

## Architecture
- Frontend: React with TypeScript
- Backend: Express.js
- Database: PostgreSQL
```

Then query with context:
```bash
blnt context "How does authentication work?"
```

### Using Different Models

With Ollama:
```bash
ollama pull codellama
blnt config set model codellama
blnt "Write a Python function to sort a list"
```

With OpenAI:
```bash
blnt config set model gpt-4
blnt "Explain advanced TypeScript features"
```

### Scripting with BLNT-CLI

You can use BLNT-CLI in scripts:

```bash
#!/bin/bash
# Generate commit message
DIFF=$(git diff --staged)
blnt "Generate a commit message for: $DIFF"
```

## Troubleshooting

### Ollama Not Detected

If you see "Ollama not detected":
1. Ensure Ollama is installed and running
2. Check it's accessible at http://localhost:11434
3. Verify with: `curl http://localhost:11434/api/tags`

### API Key Not Working

If API fallback fails:
1. Check your API key is correct
2. Verify you have credits/quota
3. Try setting it again: `blnt config set apiKey sk-...`

### Model Not Found

If a model isn't available:
- For Ollama: `ollama pull <model-name>`
- For OpenAI: Use a valid model name (gpt-3.5-turbo, gpt-4, etc.)

## Examples

### Code Explanation
```bash
blnt query "Explain this code: $(cat script.js)"
```

### Documentation Generation
```bash
blnt query "Generate documentation for this function: $(cat utils.js)"
```

### Project Analysis
```bash
blnt context "What are the main components of this project?"
```

### Creative Writing
```bash
blnt chat
> Write me a story about a developer and AI
```

## Tips

1. **Local First**: Keep Ollama running for faster, private responses
2. **Context Files**: Create BLNT.md files in your projects for better answers
3. **Model Selection**: Use specialized models (codellama for code, llama2 for general)
4. **Interactive Mode**: Use chat mode for exploratory conversations
5. **Batch Processing**: Use direct mode for scripting and automation

## Support

For issues and feature requests, visit: https://github.com/BluntmehxD/BLNT-CLI

---

Built with ♥ using oclif, Ink, and Ollama
