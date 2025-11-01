# BLNT-CLI Testing Guide

## Running Tests

### Quick Test

Run the simple test suite:

```bash
npm run build
node test.js
```

Expected output: All tests should pass.

### Manual Testing

#### Test CLI Installation

```bash
npm run build
node dist/index.js --help
```

Expected: Help menu should display with all commands.

#### Test Each Command Group

**Agent Commands:**
```bash
node dist/index.js agent --help
node dist/index.js agent status
```

**Browser Commands:**
```bash
node dist/index.js browser --help
# Note: Browser commands require Playwright installation
# Run: npx playwright install
```

**Desktop Commands:**
```bash
node dist/index.js desktop --help
node dist/index.js desktop info
```

**Config Commands:**
```bash
node dist/index.js config --help
node dist/index.js config show
```

### Example Script Testing

Test each example:

```bash
# Ensure build is complete
npm run build

# Test web scraper (requires Playwright)
node examples/web-scraper.js

# Test system monitor
node examples/system-monitor.js

# Test autonomous agent
node examples/autonomous-agent.js

# Test automated testing
node examples/automated-testing.js
```

## Test Coverage

### Unit Tests (test.js)

- ✅ Module imports
- ✅ DesktopController instantiation
- ✅ AutonomousAgent instantiation
- ✅ ConfigManager instantiation
- ✅ CLI executable exists

### Integration Tests

Manual tests to perform:

1. **Configuration Management**
   - Initialize config: `blnt config init`
   - Show config: `blnt config show`
   - Set value: `blnt config set browser.headless true`
   - Reset config: `blnt config reset`

2. **Desktop Automation**
   - Get system info: `blnt desktop info`
   - Execute command: `blnt desktop exec "echo test"`
   - List processes: `blnt desktop processes`

3. **Browser Automation** (requires Playwright)
   - Navigate: `blnt browser navigate https://example.com`
   - Screenshot: `blnt browser screenshot https://example.com -o test.png`

4. **Interactive Mode**
   - Start: `blnt interactive`
   - Test navigation through menus
   - Test each feature interactively

### Platform-Specific Tests

#### macOS
- Desktop screenshot: `blnt desktop screenshot -o mac-test.png`
- Clipboard: `blnt desktop clipboard --get`
- Open app: `blnt desktop open Safari`

#### Linux
- Desktop screenshot: Requires ImageMagick
- Clipboard: Requires xclip
- Process list: `blnt desktop processes`

#### Windows
- Desktop screenshot: Uses PowerShell
- Clipboard: Native Windows commands
- Process list: `blnt desktop processes`

## Continuous Integration

For CI/CD pipelines:

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
node test.js

# Lint (optional)
npm run lint
```

## Troubleshooting

### Build Fails
```bash
npm run clean
npm install
npm run build
```

### Tests Fail
- Check Node.js version (>= 16.0.0)
- Ensure all dependencies are installed
- Check platform-specific requirements

### Browser Tests Fail
```bash
npx playwright install
```

### Permission Errors
- Some commands may require elevated privileges
- Run with sudo (Linux/macOS) or as Administrator (Windows)

## Adding New Tests

To add new tests, edit `test.js`:

```javascript
// Test X: Your test description
console.log('Test X: Your test...');
try {
  // Your test code
  tests.push({ name: 'Your test', passed: true });
  console.log('✅ Test passed\n');
} catch (error) {
  tests.push({ name: 'Your test', passed: false, error });
  console.log('❌ Test failed:', error.message, '\n');
}
```

## Performance Testing

For performance testing:

```bash
# Time command execution
time node dist/index.js desktop info

# Memory usage
node --expose-gc dist/index.js desktop info
```

## Security Testing

Before release:

1. Check for hardcoded credentials
2. Validate input sanitization
3. Test privilege escalation scenarios
4. Review dependency vulnerabilities: `npm audit`

## Automated Testing (Future)

Plan to add:
- Jest for unit tests
- Playwright tests for browser automation
- CI/CD pipeline integration
- Code coverage reports

## License

MIT License - See LICENSE file for details
