# BLNT-CLI

> AI-powered autonomous agent for terminal, desktop, and browser control

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)

BLNT-CLI is a powerful command-line interface that brings advanced automation capabilities directly into your terminal. It combines AI-powered autonomous agents with comprehensive desktop control and browser automation to provide a complete automation solution.

## ✨ Features

- 🤖 **Autonomous Agent**: AI-powered task orchestration and execution
- 🌐 **Browser Automation**: Full browser control using Playwright
- 🖥️ **Desktop Control**: System automation and process management
- 💻 **Terminal Integration**: Seamless command-line interface
- 📊 **Task Management**: Queue, execute, and monitor multiple tasks
- ⚙️ **Configurable**: Flexible configuration system
- 🎯 **Interactive Mode**: User-friendly interactive menu
- 📸 **Screenshot Capture**: Browser and desktop screenshot capabilities
- 📋 **Clipboard Management**: Read and write clipboard content
- 🔔 **Notifications**: Desktop notification support

## 🚀 Quick Start

### Installation

```bash
npm install -g blnt-cli
```

### First Run

Initialize your configuration:

```bash
blnt config init
```

Launch interactive mode:

```bash
blnt interactive
```

## 📖 Usage

### Interactive Mode

The easiest way to use BLNT-CLI:

```bash
blnt interactive
```

### Agent Commands

Run autonomous agents:

```bash
blnt agent run --goal "Your objective here"
blnt agent task --type browser --description "Navigate to GitHub"
```

### Browser Automation

```bash
blnt browser launch
blnt browser navigate https://example.com --screenshot
blnt browser screenshot https://github.com -o github.png
blnt browser extract -u https://example.com -s ".content"
```

### Desktop Control

```bash
blnt desktop info
blnt desktop exec "ls -la"
blnt desktop processes
blnt desktop notify -t "Alert" -m "Task completed"
blnt desktop clipboard --get
```

### Configuration

```bash
blnt config show
blnt config set browser.headless true
blnt config reset
```

## 📚 Documentation

- [User Guide](docs/USER_GUIDE.md) - Comprehensive usage guide
- [API Documentation](docs/API.md) - Developer API reference
- [Examples](examples/) - Sample scripts and use cases

## 🎯 Examples

### Web Scraping

```javascript
const { BrowserController } = require('blnt-cli');

const browser = new BrowserController({ headless: true });
await browser.launch();
await browser.navigate('https://example.com');
const data = await browser.extractData('.content');
await browser.close();
```

### System Automation

```javascript
const { DesktopController } = require('blnt-cli');

const desktop = new DesktopController();
const info = await desktop.getSystemInfo();
await desktop.sendNotification('Status', `Platform: ${info.platform}`);
```

### Autonomous Agent

```javascript
const { AutonomousAgent } = require('blnt-cli');

const agent = new AutonomousAgent({ verbose: true });
const task = {
  id: 'task-1',
  description: 'Process data',
  type: 'composite',
  status: 'pending',
};
await agent.executeTask(task);
```

## 🛠️ Architecture

BLNT-CLI is built with:

- **TypeScript**: Type-safe development
- **Commander.js**: CLI framework
- **Playwright**: Browser automation
- **Inquirer**: Interactive prompts
- **Chalk**: Terminal styling
- **Node.js**: Runtime environment

## 📋 Commands Reference

| Command | Description |
|---------|-------------|
| `blnt interactive` | Launch interactive mode |
| `blnt agent run` | Run autonomous agent |
| `blnt browser launch` | Launch browser |
| `blnt browser navigate <url>` | Navigate to URL |
| `blnt browser screenshot <url>` | Capture screenshot |
| `blnt desktop info` | System information |
| `blnt desktop exec <cmd>` | Execute command |
| `blnt config show` | Show configuration |
| `blnt --help` | Show help |

## 🔧 Configuration

Configuration is stored in `~/.blnt/config.json`:

```json
{
  "browser": {
    "headless": false,
    "slowMo": 100,
    "recordVideo": false
  },
  "agent": {
    "maxConcurrentTasks": 3,
    "timeout": 60000,
    "verbose": false
  }
}
```

## 🌟 Use Cases

- **Web Scraping**: Extract data from websites
- **Automated Testing**: Test web applications
- **System Monitoring**: Monitor system resources
- **Process Automation**: Automate repetitive tasks
- **Data Collection**: Gather information from multiple sources
- **CI/CD Integration**: Integrate with build pipelines
- **Desktop Automation**: Control desktop applications
- **Workflow Automation**: Automate complex workflows

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details

## 🔗 Links

- [GitHub Repository](https://github.com/BluntmehxD/BLNT-CLI)
- [Issue Tracker](https://github.com/BluntmehxD/BLNT-CLI/issues)
- [Documentation](docs/)

## 🙏 Acknowledgments

Built with powerful open-source tools:
- [Playwright](https://playwright.dev/) - Browser automation
- [Commander.js](https://github.com/tj/commander.js) - CLI framework
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) - Interactive prompts

---

**BLNT-CLI** - Bringing autonomous AI agents to your terminal 🚀
