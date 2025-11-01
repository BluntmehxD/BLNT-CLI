# BLNT-CLI API Documentation

## Overview

BLNT-CLI provides a comprehensive API for building autonomous agents and automation tools. This document covers the core modules and their usage.

## Core Modules

### AutonomousAgent

The main agent orchestration class.

```typescript
import { AutonomousAgent, Task } from 'blnt-cli';

const agent = new AutonomousAgent({
  maxConcurrentTasks: 3,
  timeout: 60000,
  retryAttempts: 2,
  verbose: false,
});

// Create a task
const task: Task = {
  id: 'task-1',
  description: 'Navigate to website',
  type: 'browser',
  status: 'pending',
};

// Execute task
await agent.executeTask(task);

// Or queue multiple tasks
await agent.addTask(task);
await agent.processTasks();

// Get status
const status = agent.getStatus();
console.log(status); // { queued: 0, running: 0, completed: 1 }
```

#### Task Types

- `browser`: Browser automation tasks
- `desktop`: Desktop control tasks
- `terminal`: Terminal/CLI tasks
- `composite`: Multiple subtasks

#### Events

```typescript
agent.on('task:start', (task) => {
  console.log('Task started:', task.description);
});

agent.on('task:complete', (task) => {
  console.log('Task completed:', task.result);
});

agent.on('task:error', (task, error) => {
  console.error('Task failed:', error);
});
```

### BrowserController

Browser automation using Playwright.

```typescript
import { BrowserController } from 'blnt-cli';

const browser = new BrowserController({
  headless: false,
  slowMo: 100,
  viewport: { width: 1920, height: 1080 },
  recordVideo: false,
});

// Launch browser
await browser.launch();

// Navigate
await browser.navigate('https://example.com');

// Interact with page
await browser.click('button.submit');
await browser.type('input[name="email"]', 'test@example.com');

// Wait for elements
await browser.waitForSelector('.results', 30000);

// Extract data
const text = await browser.extractText('.title');
const data = await browser.extractData('.item');

// Execute JavaScript
const result = await browser.executeScript('return document.title');

// Take screenshot
await browser.screenshot('page.png');

// Close browser
await browser.close();
```

#### Advanced Browser Usage

```typescript
// Get direct access to Playwright page
const page = browser.getPage();
if (page) {
  // Use full Playwright API
  await page.evaluate(() => {
    // Custom JavaScript
  });
}

// Check if browser is initialized
if (browser.isInitialized()) {
  // Safe to use browser methods
}
```

### DesktopController

System and desktop automation.

```typescript
import { DesktopController } from 'blnt-cli';

const desktop = new DesktopController({
  verbose: true,
});

// Execute commands
const output = await desktop.executeCommand('ls -la');

// System information
const info = await desktop.getSystemInfo();

// Process management
const processes = await desktop.listProcesses();
await desktop.openApplication('Google Chrome');
await desktop.killProcess('chrome');

// Notifications
await desktop.sendNotification('Title', 'Message');

// Clipboard
const clipboardContent = await desktop.getClipboard();
await desktop.setClipboard('New content');

// Environment variables
const env = await desktop.getEnvironmentVariables();
await desktop.setEnvironmentVariable('KEY', 'value');

// Screenshot
await desktop.captureScreenshot('desktop.png');
```

### ConfigManager

Configuration management.

```typescript
import { ConfigManager } from 'blnt-cli';

const config = new ConfigManager();

// Load configuration
await config.load();

// Get configuration
const settings = config.get();

// Set values
config.set('browser.headless', true);
config.set('agent.verbose', true);

// Save configuration
await config.save();

// Reset to defaults
await config.reset();

// Show configuration
await config.show();
```

## Type Definitions

### Task Interface

```typescript
interface Task {
  id: string;
  description: string;
  type: 'browser' | 'desktop' | 'terminal' | 'composite';
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error?: Error;
  subtasks?: Task[];
}
```

### AgentConfig Interface

```typescript
interface AgentConfig {
  maxConcurrentTasks: number;
  timeout: number;
  retryAttempts: number;
  verbose: boolean;
}
```

### BrowserConfig Interface

```typescript
interface BrowserConfig {
  headless: boolean;
  slowMo: number;
  viewport?: { width: number; height: number };
  userAgent?: string;
  recordVideo: boolean;
}
```

### BlntConfig Interface

```typescript
interface BlntConfig {
  browser: {
    headless: boolean;
    slowMo: number;
    recordVideo: boolean;
  };
  agent: {
    maxConcurrentTasks: number;
    timeout: number;
    retryAttempts: number;
    verbose: boolean;
  };
  desktop: {
    verbose: boolean;
  };
  general: {
    defaultEditor: string;
    logLevel: 'info' | 'warn' | 'error' | 'debug';
  };
}
```

## Complete Examples

### Example 1: Web Scraper

```typescript
import { BrowserController, AutonomousAgent, Task } from 'blnt-cli';

async function scrapeWebsite(url: string, selector: string) {
  const browser = new BrowserController({ headless: true });
  
  try {
    await browser.launch();
    await browser.navigate(url);
    const data = await browser.extractData(selector);
    return data;
  } finally {
    await browser.close();
  }
}

// Usage
const results = await scrapeWebsite('https://news.ycombinator.com', '.storylink');
console.log(results);
```

### Example 2: Automated Testing

```typescript
import { BrowserController } from 'blnt-cli';

async function testLoginFlow() {
  const browser = new BrowserController({ headless: false });
  
  await browser.launch();
  await browser.navigate('https://example.com/login');
  
  await browser.type('#username', 'testuser');
  await browser.type('#password', 'testpass');
  await browser.click('button[type="submit"]');
  
  await browser.waitForSelector('.dashboard', 10000);
  
  await browser.screenshot('login-success.png');
  await browser.close();
  
  console.log('Login test passed!');
}
```

### Example 3: System Monitor

```typescript
import { DesktopController } from 'blnt-cli';

async function monitorSystem() {
  const desktop = new DesktopController({ verbose: true });
  
  const info = await desktop.getSystemInfo();
  const processes = await desktop.listProcesses();
  
  // Send notification if high CPU usage
  await desktop.sendNotification(
    'System Monitor',
    `Platform: ${info.platform}, Processes: ${processes.split('\n').length}`
  );
}
```

### Example 4: Composite Agent Task

```typescript
import { AutonomousAgent, Task } from 'blnt-cli';

async function automatedResearch(topic: string) {
  const agent = new AutonomousAgent({ verbose: true });
  
  const mainTask: Task = {
    id: 'research-task',
    description: `Research ${topic}`,
    type: 'composite',
    status: 'pending',
    subtasks: [
      {
        id: 'search-task',
        description: `Search for ${topic}`,
        type: 'browser',
        status: 'pending',
      },
      {
        id: 'analyze-task',
        description: 'Analyze results',
        type: 'terminal',
        status: 'pending',
      },
      {
        id: 'report-task',
        description: 'Generate report',
        type: 'desktop',
        status: 'pending',
      },
    ],
  };
  
  await agent.executeTask(mainTask);
  return mainTask.result;
}
```

## Error Handling

All methods that perform I/O operations can throw errors. Always use try-catch:

```typescript
try {
  await browser.navigate('https://example.com');
} catch (error) {
  console.error('Navigation failed:', error);
  // Handle error
}
```

## Best Practices

1. **Always close resources**: Call `close()` on BrowserController when done
2. **Use headless mode for automation**: Set `headless: true` for production
3. **Handle errors gracefully**: Wrap operations in try-catch blocks
4. **Use appropriate timeouts**: Set reasonable timeout values
5. **Enable verbose mode for debugging**: Set `verbose: true` during development
6. **Validate inputs**: Check parameters before passing to methods
7. **Use configuration manager**: Store settings in config file
8. **Monitor resource usage**: Be aware of browser memory consumption

## Platform Compatibility

| Feature | macOS | Linux | Windows |
|---------|-------|-------|---------|
| Browser Control | ✅ | ✅ | ✅ |
| Desktop Commands | ✅ | ✅ | ✅ |
| Clipboard | ✅ | ⚠️* | ✅ |
| Screenshots | ✅ | ⚠️* | ✅ |
| Notifications | ✅ | ✅ | ✅ |

*Requires additional system tools

## Support

For issues and questions:
- GitHub Issues: https://github.com/BluntmehxD/BLNT-CLI/issues
- Documentation: See `/docs` folder

## Version

Current API version: 1.0.0
