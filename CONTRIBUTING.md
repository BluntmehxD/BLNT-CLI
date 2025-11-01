# Contributing to BLNT-CLI

Thank you for your interest in contributing to BLNT-CLI! This document provides guidelines and instructions for contributing.

## 🌟 Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests
- 🧪 Write tests
- 🎨 Improve code quality

## 🚀 Getting Started

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/BLNT-CLI.git
   cd BLNT-CLI
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make your changes**
   - Write code
   - Add tests
   - Update documentation

6. **Test your changes**
   ```bash
   npm run lint
   npm test
   npm run build
   ```

7. **Commit your changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

8. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

9. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

## 📋 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting (enforced by Prettier)
- Run `npm run lint` before committing
- Run `npm run format` to auto-format code

### Commit Messages

Follow conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(agent): add new desktop control agent
fix(cli): resolve command parsing issue
docs(readme): update installation instructions
```

### Testing

- Write tests for all new features
- Maintain or improve code coverage (target: >80%)
- Run all tests before submitting PR
- Add unit tests in `src/__tests__/unit/`
- Add integration tests in `src/__tests__/integration/`
- Add e2e tests in `src/__tests__/e2e/`

### Documentation

- Update README.md if adding new features
- Add JSDoc comments to all functions
- Update API documentation
- Include examples in documentation

## 🔍 Pull Request Process

1. **Quality Checks**
   - All CI/CD checks must pass
   - Code must be reviewed by at least one maintainer
   - Tests must have adequate coverage
   - Documentation must be updated

2. **Review Process**
   - Maintainers will review your PR
   - Address any requested changes
   - Keep PR focused and atomic

3. **Merging**
   - Once approved, maintainers will merge your PR
   - Your contribution will be included in the next release

## 🐛 Bug Reports

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Node version, etc.)
- Error messages or logs
- Screenshots if applicable

Use the bug report template on GitHub Issues.

## 💡 Feature Requests

When suggesting features, please include:

- Clear description of the feature
- Use cases and benefits
- Possible implementation approach
- Any relevant examples or mockups

Use the feature request template on GitHub Issues.

## 🔒 Security

If you discover a security vulnerability:

1. **Do NOT** open a public issue
2. Email security@example.com
3. Include details about the vulnerability
4. Wait for response before disclosing

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## ❓ Questions?

- Check existing documentation
- Search existing issues
- Ask in GitHub Discussions
- Contact maintainers

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Appreciated by the community!

Thank you for contributing to BLNT-CLI! 🎉
