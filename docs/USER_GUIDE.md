# BLNT-CLI User Guide

## Overview

BLNT-CLI is a powerful AI-powered autonomous agent that brings advanced automation capabilities directly into your terminal. It provides full desktop control, browser automation, and autonomous agentic capabilities.

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Commands](#commands)
4. [Configuration](#configuration)
5. [Examples](#examples)
6. [Advanced Usage](#advanced-usage)

## Installation

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn

### Install

```bash
npm install -g blnt-cli
```

Or from source:

```bash
git clone https://github.com/BluntmehxD/BLNT-CLI.git
cd BLNT-CLI
npm install
npm run build
npm link
```

## Quick Start

### Interactive Mode

The easiest way to get started is with interactive mode:

```bash
blnt interactive
```

This will launch an interactive menu where you can:
- 🌐 Perform browser automation
- 🖥️ Control desktop operations
- 🤖 Run autonomous agents
- ⚙️ Manage configuration
- 📊 View system information

### First-Time Setup

Initialize your configuration:

```bash
blnt config init
```

This will guide you through setting up your preferences for browser automation, agent behavior, and logging.

## Commands

### Agent Commands

Run autonomous agent tasks:

```bash
# Run agent with a goal
blnt agent run --goal "Search for Node.js documentation"

# Execute specific task
blnt agent task --type browser --description "Navigate to GitHub"

# Check agent status
blnt agent status
```

### Browser Commands

Automate browser interactions:

```bash
# Launch browser
blnt browser launch
blnt browser launch --headless

# Navigate to URL
blnt browser navigate https://example.com
blnt browser navigate https://example.com --screenshot

# Take screenshot
blnt browser screenshot https://example.com -o screenshot.png

# Extract data from webpage
blnt browser extract -u https://example.com -s ".content"

# Execute JavaScript
blnt browser execute -u https://example.com -s "document.title"
```

### Desktop Commands

Control your desktop environment:

```bash
# Get system information
blnt desktop info

# Execute system command
blnt desktop exec "ls -la"
blnt desktop exec "dir" --verbose

# List running processes
blnt desktop processes

# Open application
blnt desktop open "Google Chrome"
blnt desktop open "code"

# Kill process
blnt desktop kill "chrome"

# Send notification
blnt desktop notify -t "Alert" -m "Task completed"

# Clipboard operations
blnt desktop clipboard --get
blnt desktop clipboard --set "Hello World"

# Environment variables
blnt desktop env --list
blnt desktop env --get PATH
blnt desktop env --set "MY_VAR=value"

# Capture screenshot
blnt desktop screenshot -o desktop.png
```

### Configuration Commands

Manage BLNT-CLI settings:

```bash
# Show configuration
blnt config show

# Set configuration value
blnt config set browser.headless true
blnt config set agent.maxConcurrentTasks 5
blnt config set general.logLevel debug

# Initialize configuration
blnt config init

# Reset to defaults
blnt config reset
```

## Configuration

Configuration is stored in `~/.blnt/config.json`. The configuration file contains:

### Browser Settings

```json
{
  "browser": {
    "headless": false,
    "slowMo": 100,
    "recordVideo": false
  }
}
```

- `headless`: Run browser without UI (default: false)
- `slowMo`: Slow down operations by milliseconds (default: 100)
- `recordVideo`: Record video of browser sessions (default: false)

### Agent Settings

```json
{
  "agent": {
    "maxConcurrentTasks": 3,
    "timeout": 60000,
    "retryAttempts": 2,
    "verbose": false
  }
}
```

- `maxConcurrentTasks`: Maximum parallel tasks (default: 3)
- `timeout`: Task timeout in milliseconds (default: 60000)
- `retryAttempts`: Number of retry attempts (default: 2)
- `verbose`: Enable verbose output (default: false)

### Desktop Settings

```json
{
  "desktop": {
    "verbose": false
  }
}
```

### General Settings

```json
{
  "general": {
    "defaultEditor": "nano",
    "logLevel": "info"
  }
}
```

- `logLevel`: One of "info", "warn", "error", "debug"

## Examples

### Example 1: Automated Web Scraping

```bash
# Navigate to a page and extract data
blnt browser extract \
  --url "https://news.ycombinator.com" \
  --selector ".storylink"
```

### Example 2: System Automation

```bash
# Get system info and send notification
blnt desktop info
blnt desktop notify \
  --title "System Check" \
  --message "System information retrieved"
```

### Example 3: Browser Testing

```bash
# Take screenshots of multiple pages
blnt browser screenshot https://example.com -o example.png
blnt browser screenshot https://github.com -o github.png
```

### Example 4: Process Management

```bash
# List processes and find specific ones
blnt desktop processes | grep node
```

### Example 5: Clipboard Automation

```bash
# Save clipboard content
blnt desktop clipboard --get > saved-clipboard.txt

# Set clipboard from file
cat file.txt | xargs blnt desktop clipboard --set
```

## Advanced Usage

### Using the Autonomous Agent

The autonomous agent can break down complex goals into manageable tasks:

```bash
blnt agent run --goal "Research competitors in the AI space and summarize findings"
```

The agent will:
1. Analyze the goal
2. Break it into subtasks
3. Execute each task
4. Provide results

### Combining Commands

You can chain BLNT-CLI with other command-line tools:

```bash
# Capture screenshot and process with ImageMagick
blnt browser screenshot https://example.com -o temp.png && \
  convert temp.png -resize 50% output.png

# Extract data and process with jq
blnt browser extract -u "https://api.example.com" -s "body" | jq '.results'
```

### Environment Integration

Set environment variables for API keys and configuration:

```bash
export BLNT_HEADLESS=true
export BLNT_VERBOSE=true
blnt browser navigate https://example.com
```

### Programmatic Usage

You can also use BLNT-CLI components in your Node.js scripts:

```javascript
import { BrowserController } from 'blnt-cli';

const browser = new BrowserController({ headless: true });
await browser.launch();
await browser.navigate('https://example.com');
const data = await browser.extractData('.content');
await browser.close();
```

## Platform-Specific Notes

### macOS
- Desktop screenshot uses `screencapture`
- Applications can be opened with full names
- Clipboard uses `pbcopy`/`pbpaste`

### Linux
- Some features may require X11 tools
- Screenshot requires ImageMagick's `import` command
- Clipboard requires `xclip` or `xsel`

### Windows
- Uses PowerShell for some operations
- Application paths may need to be fully qualified
- Some features may require administrator privileges

## Troubleshooting

### Browser won't launch
- Ensure Playwright is properly installed: `npx playwright install`
- Try running in headless mode: `--headless`

### Screenshot commands fail
- Install required system tools (ImageMagick, screencapture, etc.)
- Check file permissions in output directory

### Permission errors
- Some commands may require elevated privileges
- Use `sudo` on Unix systems or run as Administrator on Windows

## Getting Help

```bash
# General help
blnt --help

# Command-specific help
blnt browser --help
blnt desktop --help
blnt agent --help
blnt config --help
```

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please visit the GitHub repository to submit issues or pull requests.
