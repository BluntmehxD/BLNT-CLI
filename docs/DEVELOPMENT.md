# BLNT-CLI Development Guide

## Development Environment Setup

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn
- Git
- Code editor (VSCode recommended)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/BluntmehxD/BLNT-CLI.git
cd BLNT-CLI

# Install dependencies
npm install

# Build the project
npm run build

# Test installation
node test.js
```

### Development Workflow

#### 1. Make Changes

Edit files in the `src/` directory:
- `src/index.ts` - Main entry point
- `src/commands/` - Command implementations
- `src/agents/` - Agent orchestration
- `src/integrations/` - Browser and desktop controllers
- `src/utils/` - Utility functions

#### 2. Build and Test

```bash
# Build TypeScript
npm run build

# Run tests
node test.js

# Test CLI
node dist/index.js --help
```

#### 3. Format and Lint

```bash
# Format code
npm run format

# Lint code
npm run lint
```

## Project Structure

```
BLNT-CLI/
├── src/                    # TypeScript source files
│   ├── index.ts           # Main entry point
│   ├── commands/          # CLI command handlers
│   ├── agents/            # Autonomous agent system
│   ├── integrations/      # Browser & desktop controllers
│   └── utils/             # Utility functions
├── dist/                  # Compiled JavaScript (gitignored)
├── docs/                  # Documentation
├── examples/              # Example scripts
├── tests/                 # Test files
├── package.json           # Package configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Main documentation
```

## TypeScript Configuration

The project uses strict TypeScript settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

## Adding New Commands

### Step 1: Create Command File

Create a new file in `src/commands/`:

```typescript
import { Command } from 'commander';
import chalk from 'chalk';

export function MyCommand(program: Command): void {
  const myCmd = program
    .command('mycommand')
    .description('My command description');

  myCmd
    .command('action')
    .description('Action description')
    .option('-o, --option <value>', 'Option description')
    .action(async (options) => {
      console.log(chalk.cyan('Executing my command...'));
      // Implementation here
    });
}
```

### Step 2: Register Command

Add to `src/index.ts`:

```typescript
import { MyCommand } from './commands/mycommand';

// ... other imports

MyCommand(program);
```

### Step 3: Build and Test

```bash
npm run build
node dist/index.js mycommand --help
```

## Adding New Integrations

### Step 1: Create Integration File

Create a new file in `src/integrations/`:

```typescript
import chalk from 'chalk';
import ora from 'ora';

export interface MyIntegrationConfig {
  option1: boolean;
  option2: string;
}

export class MyIntegration {
  private config: MyIntegrationConfig;

  constructor(config: Partial<MyIntegrationConfig> = {}) {
    this.config = {
      option1: config.option1 ?? false,
      option2: config.option2 ?? 'default',
    };
  }

  async doSomething(): Promise<void> {
    const spinner = ora('Doing something...').start();
    
    try {
      // Implementation
      spinner.succeed('Done!');
    } catch (error) {
      spinner.fail('Failed!');
      throw error;
    }
  }
}
```

### Step 2: Use in Commands

Import and use in your command handlers.

## Code Style Guide

### General Rules

1. Use TypeScript for all new code
2. Follow existing code patterns
3. Add JSDoc comments for public APIs
4. Use descriptive variable names
5. Keep functions small and focused

### Naming Conventions

- **Classes**: PascalCase (e.g., `BrowserController`)
- **Functions**: camelCase (e.g., `executeCommand`)
- **Constants**: UPPER_CASE (e.g., `MAX_RETRIES`)
- **Interfaces**: PascalCase with 'I' prefix optional (e.g., `Config`)

### Error Handling

Always use try-catch for async operations:

```typescript
async function myFunction() {
  try {
    // Code that might fail
  } catch (error) {
    console.error(chalk.red('Error:'), error);
    throw error;
  }
}
```

### User Feedback

Use chalk for colored output:

```typescript
console.log(chalk.green('✓ Success'));
console.log(chalk.yellow('⚠ Warning'));
console.log(chalk.red('✗ Error'));
console.log(chalk.cyan('Info'));
console.log(chalk.gray('Details'));
```

Use ora for progress indicators:

```typescript
const spinner = ora('Processing...').start();
// ... do work
spinner.succeed('Completed!');
// or
spinner.fail('Failed!');
```

## Testing

### Running Tests

```bash
# Run all tests
node test.js

# Test specific functionality
node dist/index.js <command> --help
```

### Writing Tests

Add tests to `test.js`:

```javascript
console.log('Test: My new feature...');
try {
  // Test code
  tests.push({ name: 'My feature', passed: true });
  console.log('✅ Passed\n');
} catch (error) {
  tests.push({ name: 'My feature', passed: false, error });
  console.log('❌ Failed:', error.message, '\n');
}
```

## Debugging

### VSCode Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug CLI",
      "program": "${workspaceFolder}/dist/index.js",
      "args": ["--help"],
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "sourceMaps": true
    }
  ]
}
```

### Console Debugging

Add debug statements:

```typescript
if (process.env.DEBUG) {
  console.log('Debug:', variable);
}
```

Run with debug enabled:

```bash
DEBUG=1 node dist/index.js command
```

## Dependencies

### Adding Dependencies

```bash
# Production dependency
npm install --save package-name

# Development dependency
npm install --save-dev package-name
```

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm update package-name
```

## Building for Release

### Version Bump

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major
```

### Clean Build

```bash
npm run clean
npm install
npm run build
node test.js
```

### Publishing (Future)

```bash
npm login
npm publish
```

## Common Issues

### Build Fails

```bash
rm -rf node_modules dist
npm install
npm run build
```

### Type Errors

- Check TypeScript version compatibility
- Update @types packages
- Review tsconfig.json settings

### Import Errors

- Ensure correct file extensions in imports
- Check module resolution settings
- Verify export statements

## Best Practices

1. **Commit Often**: Make small, focused commits
2. **Test Before Commit**: Always run tests
3. **Document Changes**: Update README and docs
4. **Follow Conventions**: Match existing code style
5. **Handle Errors**: Always catch and handle errors
6. **User Experience**: Provide clear feedback
7. **Performance**: Avoid blocking operations
8. **Security**: Validate all inputs

## Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Commander.js Guide](https://github.com/tj/commander.js)
- [Playwright Documentation](https://playwright.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)

## Getting Help

- Check documentation in `/docs`
- Review examples in `/examples`
- Open an issue on GitHub
- Read the architecture guide

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## License

MIT License - See [LICENSE](../LICENSE) for details
