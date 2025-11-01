# BLNT-CLI

```
██████╗ ██╗     ███╗   ██╗████████╗
██╔══██╗██║     ████╗  ██║╚══██╔══╝
██████╔╝██║     ██╔██╗ ██║   ██║   
██╔══██╗██║     ██║╚██╗██║   ██║   
██████╔╝███████╗██║ ╚████║   ██║   
╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   
```

**AI-Powered Terminal Assistant** - Local-first AI with cloud fallback

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

AI agent that brings the power of BLNT-OS directly into your terminal with full desktop control and browser control with Autonomous Agentic Capabilities.

## 🚀 Features

- **🏠 Local-First**: Automatically detects and uses Ollama running at http://localhost:11434
- **☁️ API Fallback**: Seamlessly switches to OpenAI API when local AI unavailable
- **💬 Multiple Modes**:
  - **Direct Query**: Quick one-off questions from command line
  - **Interactive Chat**: Real-time conversational UI with message history
  - **Context Mode**: Query with BLNT.md context for project-aware responses
- **⚙️ Easy Configuration**: Simple `config set/get` commands for MODEL and API_KEY
- **🎨 Beautiful UI**: Dark theme with neon accents and deluxe ASCII branding
- **🔌 Extensible**: Built on oclif framework with plugin support
- **📦 Production-Ready**: TypeScript, comprehensive error handling, and documentation

## 📦 Installation

```bash
npm install -g blnt-cli
```

Or use with npx (no installation):

```bash
npx blnt-cli "What is Node.js?"
```

## 🎯 Quick Start

### Direct Query
```bash
blnt query "What is the capital of France?"
blnt query "Explain quantum computing"
```

### Interactive Chat
```bash
blnt chat
```

### Context-Aware Queries
```bash
# Create a BLNT.md file in your project
blnt context "What does this project do?"
```

### Configuration
```bash
blnt config set model llama2
blnt config set apiKey sk-your-openai-key
blnt config get
```

## 🛠️ Built With

- **[oclif](https://oclif.io/)** - CLI framework with commands and plugins
- **[Ink](https://github.com/vadimdemedes/ink)** - React for interactive CLI UIs
- **[Ollama](https://ollama.ai/)** - Local AI model runtime
- **[OpenAI](https://openai.com/)** - Cloud API fallback
- **TypeScript** - Type-safe development
- **Chalk** - Terminal styling with neon colors

## 📚 Documentation

For complete documentation, see [docs/USAGE.md](docs/USAGE.md)

### Command Reference

| Command | Description |
|---------|-------------|
| `blnt query <query>` | Direct query to AI |
| `blnt chat` | Interactive chat mode |
| `blnt context <query>` | Query with BLNT.md context |
| `blnt config set <key> <value>` | Set configuration |
| `blnt config get [key]` | View configuration |

## 🔧 Configuration

BLNT-CLI works out of the box with Ollama. For API access:

```bash
# Set OpenAI API key
blnt config set apiKey sk-your-api-key

# Choose your model
blnt config set model gpt-3.5-turbo

# Or use environment variable
export OPENAI_API_KEY=sk-your-api-key
```

## 🎨 Theme

BLNT-CLI features a beautiful dark theme with neon accents:
- **Primary**: Neon Cyan (#00FFFF)
- **Secondary**: Neon Magenta (#FF00FF)
- **Accent**: Neon Green (#00FF00)
- **Deluxe ASCII branding** on startup

## 🧪 Development

```bash
# Clone the repository
git clone https://github.com/BluntmehxD/BLNT-CLI.git
cd BLNT-CLI

# Install dependencies
npm install

# Build
npm run build

# Run in development mode
npm run dev

# Lint code
npm run lint
```

## 📋 Requirements

- Node.js >= 18.0.0
- (Optional) Ollama for local AI
- (Optional) OpenAI API key for cloud fallback

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Credits

Built with ♥ by the BLNT team

---

**Pro Tips:**
- Keep Ollama running for fastest, private responses
- Create BLNT.md files in your projects for context-aware assistance
- Use `blnt chat` for exploratory conversations
- Use direct mode for scripting and automation
