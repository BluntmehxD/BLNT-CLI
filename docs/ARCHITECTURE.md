# BLNT-CLI Architecture

## Overview

BLNT-CLI is designed with a modular architecture that separates concerns and allows for easy extension and maintenance.

## Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│                 CLI Interface                    │
│            (Commander + Inquirer)                │
└─────────────────┬───────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────▼────────┐  ┌──────▼──────────┐
│   Commands      │  │  Interactive    │
│   - Agent       │  │     Mode        │
│   - Browser     │  │                 │
│   - Desktop     │  │                 │
│   - Config      │  │                 │
└───────┬────────┘  └──────┬──────────┘
        │                   │
        └─────────┬─────────┘
                  │
        ┌─────────▼─────────┐
        │   Core Modules     │
        └─────────┬─────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼────┐  ┌────▼─────┐  ┌───▼────────┐
│ Agent  │  │ Browser  │  │  Desktop   │
│ System │  │ Control  │  │  Control   │
└───┬────┘  └────┬─────┘  └───┬────────┘
    │            │             │
    │      ┌─────▼─────┐       │
    │      │ Playwright │       │
    │      └───────────┘       │
    │                          │
    └──────────┬───────────────┘
               │
        ┌──────▼──────┐
        │   Config    │
        │   Manager   │
        └─────────────┘
```

## Core Components

### 1. CLI Interface Layer

**Location**: `src/index.ts`

The entry point of the application. Uses Commander.js for command parsing and routing.

**Responsibilities**:
- Parse command-line arguments
- Route to appropriate command handlers
- Display help and version information
- Handle global options

### 2. Command Handlers

**Location**: `src/commands/`

Individual command implementations.

**Modules**:
- `agent.ts` - Autonomous agent commands
- `browser.ts` - Browser automation commands
- `desktop.ts` - Desktop control commands
- `config.ts` - Configuration management
- `interactive.ts` - Interactive mode

**Responsibilities**:
- Validate input parameters
- Invoke core modules
- Format output
- Handle command-specific errors

### 3. Core Modules

#### Autonomous Agent

**Location**: `src/agents/autonomous-agent.ts`

**Purpose**: Task orchestration and execution

**Features**:
- Task queue management
- Concurrent task execution
- Event emission for monitoring
- Retry logic
- Error handling

**API**:
```typescript
class AutonomousAgent extends EventEmitter {
  executeTask(task: Task): Promise<any>
  addTask(task: Task): Promise<void>
  processTasks(): Promise<void>
  getStatus(): { queued, running, completed }
}
```

#### Browser Controller

**Location**: `src/integrations/browser-controller.ts`

**Purpose**: Browser automation via Playwright

**Features**:
- Browser lifecycle management
- Page navigation
- Element interaction
- Data extraction
- Screenshot capture
- Script execution

**API**:
```typescript
class BrowserController {
  launch(): Promise<void>
  navigate(url: string): Promise<void>
  click(selector: string): Promise<void>
  type(selector: string, text: string): Promise<void>
  extractData(selector: string): Promise<any[]>
  screenshot(filename?: string): Promise<string>
  close(): Promise<void>
}
```

#### Desktop Controller

**Location**: `src/integrations/desktop-controller.ts`

**Purpose**: System and desktop automation

**Features**:
- Command execution
- Process management
- Clipboard operations
- Notifications
- Environment variables
- Screenshot capture

**API**:
```typescript
class DesktopController {
  executeCommand(command: string): Promise<string>
  getSystemInfo(): Promise<any>
  listProcesses(): Promise<string>
  openApplication(name: string): Promise<void>
  killProcess(name: string): Promise<void>
  getClipboard(): Promise<string>
  setClipboard(text: string): Promise<void>
}
```

### 4. Configuration Manager

**Location**: `src/utils/config-manager.ts`

**Purpose**: Configuration persistence and management

**Features**:
- Load/save configuration
- Default values
- Validation
- Reset to defaults

**Storage**: `~/.blnt/config.json`

## Data Flow

### Command Execution Flow

```
User Input → CLI Parser → Command Handler → Core Module → External Service
                                                            ↓
User Output ← Formatter ← Result ← Event Handler ← Response
```

### Agent Task Flow

```
Task Definition → Queue → Agent Executor → Task Router
                                               ↓
                                    ┌──────────┴──────────┐
                                    │                     │
                              Browser Task          Desktop Task
                                    │                     │
                                    └──────────┬──────────┘
                                               │
                                          Result/Error
```

## Extension Points

### Adding New Commands

1. Create command file in `src/commands/`
2. Implement command handler
3. Register in `src/index.ts`
4. Update documentation

### Adding New Task Types

1. Define task type in `autonomous-agent.ts`
2. Implement executor method
3. Add to task router
4. Update TypeScript types

### Adding New Integrations

1. Create integration file in `src/integrations/`
2. Implement required interface
3. Add configuration options
4. Update config manager

## Dependencies

### Production Dependencies

- `commander` - CLI framework
- `chalk` - Terminal styling
- `inquirer` - Interactive prompts
- `ora` - Spinners
- `playwright` - Browser automation
- `axios` - HTTP client
- `dotenv` - Environment variables
- `node-notifier` - Desktop notifications

### Development Dependencies

- `typescript` - Type system
- `@types/node` - Node.js types
- `@types/inquirer` - Inquirer types
- `eslint` - Linting
- `prettier` - Code formatting

## Security Considerations

1. **Input Validation**: All user inputs are validated
2. **Command Execution**: Uses child_process with proper escaping
3. **File Operations**: Validates paths and permissions
4. **Browser Security**: Runs in sandboxed environment
5. **Configuration**: Stored in user directory with proper permissions

## Performance Considerations

1. **Lazy Loading**: Modules loaded on demand
2. **Resource Management**: Proper cleanup of browser instances
3. **Concurrent Tasks**: Limited by configuration
4. **Memory Usage**: Monitored for long-running tasks
5. **Caching**: Configuration cached in memory

## Error Handling Strategy

1. **Validation Errors**: Caught at input level
2. **Runtime Errors**: Wrapped with context
3. **User Feedback**: Clear error messages
4. **Logging**: Optional verbose mode
5. **Recovery**: Automatic retry for transient failures

## Testing Strategy

1. **Unit Tests**: Test individual functions
2. **Integration Tests**: Test command flows
3. **E2E Tests**: Test full workflows
4. **Platform Tests**: Test cross-platform compatibility

## Future Enhancements

1. Plugin system for custom commands
2. Remote agent orchestration
3. Web UI for monitoring
4. Cloud integration
5. Advanced AI capabilities
6. Task scheduling
7. Workflow templates
8. Data persistence layer
