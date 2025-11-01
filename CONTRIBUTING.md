# Contributing to BLNT-CLI

Thank you for your interest in contributing to BLNT-CLI! This guide will help you get started.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/BLNT-CLI.git
   cd BLNT-CLI
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Build the project**:
   ```bash
   npm run build
   ```

## Development Workflow

### Making Changes

1. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** in the `src/` directory

3. **Build and test**:
   ```bash
   npm run build
   npm run lint
   ./bin/run.js --help  # Test your changes
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

### Commit Message Format

We follow conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add support for Claude API
fix: resolve Ollama connection timeout
docs: update installation instructions
```

## Code Style

- Use TypeScript
- Follow existing code patterns
- Use meaningful variable names
- Add comments for complex logic
- Run `npm run lint` before committing

## Project Structure

```
BLNT-CLI/
├── bin/              # Executable scripts
├── src/
│   ├── commands/     # CLI commands
│   ├── ui/           # Ink UI components
│   └── utils/        # Utility functions
├── docs/             # Documentation
└── dist/             # Built output (generated)
```

## Adding New Features

### Adding a New Command

1. Create a new file in `src/commands/`:
   ```typescript
   import { Command, Flags } from '@oclif/core';

   export default class MyCommand extends Command {
     static description = 'Description of my command';
     
     static flags = {
       help: Flags.help({ char: 'h' }),
     };

     async run(): Promise<void> {
       // Implementation
     }
   }
   ```

2. Build and test:
   ```bash
   npm run build
   ./bin/run.js my-command --help
   ```

### Adding a New AI Provider

1. Create a new client in `src/utils/`:
   ```typescript
   export class NewProviderClient {
     async chat(message: string): Promise<string> {
       // Implementation
     }
   }
   ```

2. Update `AIProvider` in `src/utils/ai-provider.ts`

3. Update configuration in `src/utils/config.ts`

### Adding UI Components

1. Create a new component in `src/ui/`:
   ```typescript
   import React from 'react';
   import { Box, Text } from 'ink';

   export const MyComponent: React.FC = () => {
     return (
       <Box>
         <Text>My Component</Text>
       </Box>
     );
   };
   ```

2. Use neon theme colors from `src/utils/theme.ts`

## Testing

Currently, the project uses manual testing. To test:

1. Build the project:
   ```bash
   npm run build
   ```

2. Test commands:
   ```bash
   ./bin/run.js "test query"
   ./bin/run.js chat
   ./bin/run.js context "test"
   ./bin/run.js config get
   ```

## Pull Request Process

1. **Update documentation** if needed
2. **Ensure builds pass**: `npm run build && npm run lint`
3. **Update README.md** with new features/commands
4. **Create a pull request** with:
   - Clear description of changes
   - Screenshots for UI changes
   - Examples of new features

## Reporting Issues

When reporting issues, please include:

- BLNT-CLI version (`blnt --version`)
- Node.js version (`node --version`)
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Error messages/logs

## Feature Requests

Feature requests are welcome! Please:

1. Check if it's already requested
2. Describe the use case
3. Provide examples
4. Explain the benefit

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## Questions?

- Open an issue for questions
- Tag with `question` label
- Check existing issues first

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to BLNT-CLI! 🚀
