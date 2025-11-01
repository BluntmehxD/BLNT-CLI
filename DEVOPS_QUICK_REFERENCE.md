# DevOps Quick Reference

Quick reference guide for working with the BLNT-CLI DevOps team.

## 🚀 Quick Start

### For Developers

```bash
# Clone and setup
git clone https://github.com/BluntmehxD/BLNT-CLI.git
cd BLNT-CLI
npm install

# Development
npm run dev          # Watch mode
npm run build        # Build project
npm test            # Run tests
npm run lint        # Check code quality
npm run format      # Auto-format code

# Before committing
npm run lint        # Must pass
npm test            # Must pass
npm run build       # Must succeed
```

### For CI/CD

All workflows are in `.github/workflows/`:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci-cd.yml` | PR, Push | Main orchestration |
| `build-test.yml` | PR, Push | Build and test |
| `security.yml` | PR, Push, Daily | Security scans |
| `code-quality.yml` | PR, Push | Linting and formatting |
| `deployment.yml` | Tag (v*.*.*) | Release and deploy |
| `monitoring.yml` | Schedule, Deploy | Health checks |

## 🤖 Agent Commands

### CI/CD Agent
```yaml
# Trigger workflows
git push origin main                    # Triggers CI/CD
git push origin --tags                  # Triggers deployment

# Manual trigger
gh workflow run ci-cd.yml
```

### Build & Test Agent
```bash
# Local testing
npm run test:unit           # Unit tests only
npm run test:integration    # Integration tests
npm run test:e2e           # End-to-end tests
npm run test:coverage      # With coverage report
```

### Security Agent
```bash
# Local security checks
npm audit                   # Check dependencies
npm audit fix              # Fix vulnerabilities
npm audit --json > audit.json  # Generate report

# Manual workflow trigger
gh workflow run security.yml
```

### Code Quality Agent
```bash
# Local quality checks
npm run lint               # Check linting
npm run lint:fix           # Auto-fix issues
npm run format:check       # Check formatting
npm run format             # Auto-format
npm run type-check         # TypeScript check
```

### Deployment Agent
```bash
# Create release
git tag v1.0.0
git push origin v1.0.0

# Or use GitHub CLI
gh release create v1.0.0 --generate-notes
```

### Monitoring Agent
```bash
# Check package status
npm view blnt-cli

# Download stats
npm view blnt-cli time

# Manual health check
gh workflow run monitoring.yml
```

## 📋 Common Tasks

### Making a Pull Request
1. Create feature branch
2. Make changes
3. Run `npm run lint && npm test`
4. Commit changes
5. Push branch
6. Create PR
7. Wait for agent checks ✅
8. Merge when approved

### Creating a Release
1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Commit: `git commit -m "chore: bump version to X.Y.Z"`
4. Tag: `git tag vX.Y.Z`
5. Push: `git push && git push --tags`
6. Deployment agent handles the rest 🚀

### Fixing CI Failures

**Build Failure:**
```bash
npm run build          # Check locally
npm ci                 # Clean install
npm run build          # Retry
```

**Test Failure:**
```bash
npm test              # Run tests
npm test -- --verbose # Detailed output
npm run test:coverage # Check coverage
```

**Lint Failure:**
```bash
npm run lint          # Check issues
npm run lint:fix      # Auto-fix
npm run format        # Format code
```

**Security Failure:**
```bash
npm audit             # Check vulnerabilities
npm audit fix         # Auto-fix
npm update            # Update deps
```

## 🔧 Workflow Configuration

### Adding Dependencies
```bash
# Always check security first
npm install <package>
npm audit
git add package.json package-lock.json
git commit -m "feat: add <package>"
```

### Updating Workflows
1. Edit `.github/workflows/*.yml`
2. Validate YAML syntax
3. Test in feature branch
4. Document changes
5. Create PR

### Configuring Secrets
```bash
# Via GitHub CLI
gh secret set NPM_TOKEN

# Via GitHub UI
Settings → Secrets → New repository secret
```

## 🐛 Troubleshooting

### Workflow Not Triggering
- Check `.github/workflows/` files
- Verify branch protection rules
- Check GitHub Actions settings
- Review workflow triggers

### Tests Failing in CI but Passing Locally
- Check Node version (CI uses multiple)
- Verify all dependencies in `package.json`
- Check environment-specific code
- Review test isolation

### Security Scan False Positives
- Review alert in GitHub Security tab
- Check if it's a dev dependency
- Update to patched version
- Document exception if needed

### Deployment Failing
- Check npm token is valid
- Verify version bump in package.json
- Check tag format (v*.*.*)
- Review deployment logs

## 📊 Monitoring

### Check Pipeline Status
```bash
# Via GitHub CLI
gh run list
gh run view <run-id>
gh run watch

# Via Web
https://github.com/BluntmehxD/BLNT-CLI/actions
```

### View Test Coverage
```bash
# Local
npm run test:coverage
open coverage/index.html

# CI
Check workflow artifacts
```

### Security Dashboard
```bash
# Via GitHub
https://github.com/BluntmehxD/BLNT-CLI/security

# Command line
gh api repos/BluntmehxD/BLNT-CLI/vulnerability-alerts
```

## 🔗 Useful Links

- **Repository:** https://github.com/BluntmehxD/BLNT-CLI
- **Actions:** https://github.com/BluntmehxD/BLNT-CLI/actions
- **Security:** https://github.com/BluntmehxD/BLNT-CLI/security
- **Releases:** https://github.com/BluntmehxD/BLNT-CLI/releases
- **npm Package:** https://www.npmjs.com/package/blnt-cli

## 📞 Getting Help

- 📖 Read [DEVOPS.md](DEVOPS.md) for detailed info
- 🤝 Check [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines
- 🐛 Open an issue on GitHub
- 💬 Start a discussion

## ✅ Checklist Templates

### Before Committing
- [ ] Code builds successfully
- [ ] All tests pass
- [ ] Linting passes
- [ ] Code formatted
- [ ] No security warnings
- [ ] Documentation updated

### Before Releasing
- [ ] Version bumped
- [ ] Changelog updated
- [ ] Tests passing
- [ ] Security scan clean
- [ ] Documentation current
- [ ] Release notes ready

---

**Keep this guide handy for quick DevOps tasks!** 🚀
