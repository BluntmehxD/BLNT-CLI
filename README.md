# BLNT-CLI

> AI agent that brings the power of BLNT-OS directly into your terminal with full desktop control and browser control with Autonomous Agentic Capabilities

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)

## 🚀 Features

- **Desktop Control**: Automate desktop interactions with mouse clicks, keyboard input, and screenshots
- **Browser Automation**: Control browser navigation, element interaction, and page automation
- **Autonomous Agent**: AI-driven task execution with interactive and autonomous modes
- **TypeScript**: Built with TypeScript for type safety and better developer experience
- **Extensible**: Modular command structure for easy extension

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g blnt-cli
```

### Local Development

```bash
git clone https://github.com/BluntmehxD/BLNT-CLI.git
cd BLNT-CLI
npm install
npm run build
npm link
```

## 🎯 Usage

### Desktop Commands

Control your desktop programmatically:

```bash
# Simulate mouse click at coordinates
blnt desktop click 100 200

# Perform double click
blnt desktop click 100 200 --double

# Type text on desktop
blnt desktop type "Hello, World!"

# Take a screenshot
blnt desktop screenshot --output my-screenshot.png
```

### Browser Commands

Automate browser interactions:

```bash
# Open a URL in browser
blnt browser open https://example.com

# Open in headless mode
blnt browser open https://example.com --headless

# Navigate to a URL
blnt browser navigate https://github.com

# Click an element
blnt browser click "#submit-button"

# Take a browser screenshot
blnt browser screenshot --output page.png --fullpage
```

### Agent Commands

Run autonomous AI agents:

```bash
# Start an agent with a task
blnt agent start "Find and summarize the latest news"

# Start in autonomous mode (no user confirmation)
blnt agent start "Check my emails" --mode autonomous

# Check agent status
blnt agent status

# Stop running agent
blnt agent stop

# View execution history
blnt agent history --number 20
```

### Global Options

```bash
# Enable debug mode
blnt --debug <command>

# Quiet mode (suppress output)
blnt --quiet <command>

# Show version
blnt --version

# Show help
blnt --help
```

## 🛠️ Development

### Prerequisites

- Node.js >= 16.0.0
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode (watch)
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Project Structure

```
BLNT-CLI/
├── src/
│   ├── __tests__/          # Test files
│   ├── commands/           # Command modules
│   │   ├── desktop.ts      # Desktop control commands
│   │   ├── browser.ts      # Browser automation commands
│   │   └── agent.ts        # Autonomous agent commands
│   ├── utils/              # Utility modules
│   │   ├── logger.ts       # Logging utility
│   │   └── config.ts       # Configuration management
│   ├── cli.ts              # CLI setup and configuration
│   └── index.ts            # Entry point
├── dist/                   # Build output
├── .github/                # GitHub configuration
│   └── workflows/          # CI/CD workflows
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## 🔧 Configuration

BLNT-CLI stores configuration in `~/.blnt/config.json`. You can configure:

- API keys for BLNT-OS integration
- Debug mode preferences
- Default options for commands

Configuration is managed automatically by the CLI.

## 🧪 Testing

The project uses Jest for testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📝 Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Watch mode for development
- `npm start` - Run the compiled CLI
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [BLNT-OS](https://github.com/BluntmehxD/BLNT-OS) - Operating system/platform code
- [BLNT-IDE](https://github.com/BluntmehxD/BLNT-IDE) - Editor/IDE integrations
- [BLUNTMEH Website](https://github.com/BluntmehxD/BLUNTMEH) - Marketing/docs/app UI

## 💬 Support

For questions and support, please open an issue on [GitHub](https://github.com/BluntmehxD/BLNT-CLI/issues).

## ⚠️ Status

**Note:** This is currently version 0.1.0. The desktop control, browser automation, and agent features are placeholders and will be implemented in future releases. The current version provides the CLI structure and command framework.

## 🗺️ Roadmap

- [ ] Implement desktop control with robotjs or nut.js
- [ ] Implement browser automation with Playwright or Puppeteer
- [ ] Integrate with BLNT-OS APIs
- [ ] Add AI agent capabilities
- [ ] Add configuration management UI
- [ ] Add plugin system for extensibility
- [ ] Improve error handling and logging
- [ ] Add comprehensive documentation

---

**Made with ❤️ by the BLNT Team**
