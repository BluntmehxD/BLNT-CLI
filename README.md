# BLNT-CLI

AI agent that brings the power of BLNT-OS directly into your terminal with full desktop control and browser control, powered by Autonomous Agentic Capabilities.

[![CI/CD Pipeline](https://github.com/BluntmehxD/BLNT-CLI/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/BluntmehxD/BLNT-CLI/actions/workflows/ci-cd.yml)
[![Security Scanning](https://github.com/BluntmehxD/BLNT-CLI/actions/workflows/security.yml/badge.svg)](https://github.com/BluntmehxD/BLNT-CLI/actions/workflows/security.yml)
[![npm version](https://badge.fury.io/js/blnt-cli.svg)](https://www.npmjs.com/package/blnt-cli)

## 🚀 Features

- 🤖 **Autonomous AI Agents** - Intelligent agents that can control your desktop and browser
- 🖥️ **Desktop Control** - Full system automation capabilities
- 🌐 **Browser Automation** - Web browsing and interaction automation
- 📦 **Easy Installation** - Simple npm install or standalone binary
- ⚙️ **Configurable** - Flexible configuration system
- 🔒 **Secure** - Built with security best practices

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm or yarn

## 🛠️ Installation

### Via npm (recommended)

```bash
npm install -g blnt-cli
```

### Via source

```bash
git clone https://github.com/BluntmehxD/BLNT-CLI.git
cd BLNT-CLI
npm install
npm run build
npm link
```

## 🎯 Quick Start

1. **Initialize BLNT-CLI in your project:**

```bash
blnt init
```

2. **Start the autonomous agent:**

```bash
blnt run
```

3. **Run in specific mode:**

```bash
# Desktop mode
blnt run --mode desktop

# Browser mode
blnt run --mode browser

# With specific task
blnt run --task "automate my workflow"
```

## 📚 Commands

### `blnt init`

Initialize BLNT-CLI in the current directory.

```bash
blnt init [options]

Options:
  -f, --force    Force initialization even if already initialized
```

### `blnt run`

Start the autonomous AI agent.

```bash
blnt run [options]

Options:
  -m, --mode <mode>    Agent mode (desktop|browser|auto) [default: auto]
  -t, --task <task>    Specific task to execute
```

### `blnt config`

Manage BLNT-CLI configuration.

```bash
blnt config [options]

Options:
  -s, --set <key=value>    Set configuration value
  -g, --get <key>          Get configuration value
  -l, --list               List all configuration
```

### `blnt agent`

Manage AI agents.

```bash
blnt agent [options]

Options:
  -l, --list           List available agents
  -s, --start <agent>  Start specific agent
  --stop <agent>       Stop specific agent
```

## 🏗️ DevOps Architecture

This project is built and maintained by a team of specialized DevOps agents:

### Agent Team

1. **CI/CD Agent** - Orchestrates pipelines and automation
2. **Build & Test Agent** - Ensures code quality through comprehensive testing
3. **Security Agent** - Scans for vulnerabilities and enforces security policies
4. **Code Quality Agent** - Maintains coding standards and best practices
5. **Deployment Agent** - Manages releases and distribution
6. **Monitoring Agent** - Tracks health metrics and alerts on issues
7. **Documentation Agent** - Maintains comprehensive documentation

### DevOps Documentation

- 📊 **[DevOps Overview (DEVOPS.md)](DEVOPS.md)** - Comprehensive guide to the DevOps team
- 🚀 **[Quick Reference (DEVOPS_QUICK_REFERENCE.md)](DEVOPS_QUICK_REFERENCE.md)** - Common tasks and commands
- 🔄 **[Workflow Diagram (DEVOPS_WORKFLOW.md)](DEVOPS_WORKFLOW.md)** - Visual workflow documentation
- 🤝 **[Team Coordination](.github/agents/TEAM_COORDINATION.md)** - How agents work together
- 📁 **[Agent Definitions](.github/agents/)** - Individual agent specifications

All workflows are defined in [`.github/workflows/`](.github/workflows/) and agents are documented in [`.github/agents/`](.github/agents/).

## 🔧 Development

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/BluntmehxD/BLNT-CLI.git
cd BLNT-CLI

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run in development mode
npm run dev
```

### Available Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm run dev` - Run in watch mode
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier
- `npm test` - Run all tests
- `npm run test:unit` - Run unit tests
- `npm run test:integration` - Run integration tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:coverage` - Generate coverage report

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔒 Security

Security is a top priority. Our Security Agent continuously scans for vulnerabilities. If you discover a security issue, please email [security@example.com](mailto:security@example.com).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with TypeScript
- Powered by Commander.js
- Styled with Chalk
- Tested with Jest

## 📞 Support

- 📧 Email: support@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/BluntmehxD/BLNT-CLI/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/BluntmehxD/BLNT-CLI/discussions)

## 🗺️ Roadmap

- [ ] Full desktop automation capabilities
- [ ] Advanced browser control
- [ ] Multi-agent coordination
- [ ] Learning from user interactions
- [ ] Plugin system
- [ ] Cloud integration

---

Made with ❤️ by the BLNT DevOps Team
