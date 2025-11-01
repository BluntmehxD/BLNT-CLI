# BLNT-CLI Examples

This directory contains example scripts demonstrating various BLNT-CLI capabilities.

## Running Examples

All examples can be run directly with Node.js:

```bash
node examples/web-scraper.js
node examples/system-monitor.js
node examples/autonomous-agent.js
node examples/automated-testing.js
```

## Example Descriptions

### 1. Web Scraper (`web-scraper.js`)

Demonstrates browser automation for web scraping:
- Launches headless browser
- Navigates to Hacker News
- Extracts top stories
- Takes screenshot
- Closes browser

**Usage:**
```bash
node examples/web-scraper.js
```

### 2. System Monitor (`system-monitor.js`)

Demonstrates desktop automation and system monitoring:
- Gets system information
- Lists running processes
- Sends desktop notification
- Platform-aware operations

**Usage:**
```bash
node examples/system-monitor.js
```

### 3. Autonomous Agent (`autonomous-agent.js`)

Demonstrates agent orchestration:
- Creates multiple tasks
- Queues tasks for execution
- Processes tasks sequentially
- Reports status

**Usage:**
```bash
node examples/autonomous-agent.js
```

### 4. Automated Testing (`automated-testing.js`)

Demonstrates browser-based automated testing:
- Launches browser with UI
- Navigates to test page
- Validates page elements
- Takes screenshots
- Reports test results

**Usage:**
```bash
node examples/automated-testing.js
```

## Creating Custom Scripts

You can use BLNT-CLI in your own scripts:

```javascript
const { BrowserController, DesktopController, AutonomousAgent } = require('blnt-cli');

// Your automation code here
```

## Requirements

- Node.js 16.0.0 or higher
- BLNT-CLI installed (`npm install blnt-cli`)
- Playwright browsers installed (`npx playwright install`)

## Additional Examples

### Custom Browser Automation

```javascript
const { BrowserController } = require('blnt-cli');

async function customAutomation() {
  const browser = new BrowserController({ headless: true });
  await browser.launch();
  
  // Your custom logic
  await browser.navigate('https://example.com');
  const data = await browser.extractData('.your-selector');
  
  await browser.close();
  return data;
}
```

### Custom Desktop Automation

```javascript
const { DesktopController } = require('blnt-cli');

async function customDesktopTask() {
  const desktop = new DesktopController({ verbose: true });
  
  // Your custom logic
  await desktop.executeCommand('your-command');
  await desktop.sendNotification('Title', 'Message');
}
```

## Troubleshooting

### Browser Examples Fail
- Ensure Playwright browsers are installed: `npx playwright install`
- Check network connectivity

### Desktop Examples Fail
- Some commands may be platform-specific
- Check command availability on your system

### Permission Errors
- Some operations may require elevated privileges
- Run with appropriate permissions

## Contributing

Feel free to submit your own examples via pull request!

## License

MIT License - See LICENSE file for details
