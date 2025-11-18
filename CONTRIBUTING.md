# Contributing to GPT JavaScript Projects Collection

Thank you for your interest in contributing to this project! We welcome contributions from everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Guidelines](#coding-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Testing](#testing)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear descriptive title**
- **Detailed steps to reproduce** the problem
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node version, npm version)
- **Additional context** that might be relevant

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the proposed enhancement
- **Explain why this enhancement would be useful**
- **List examples** of how it would work

### Your First Code Contribution

Unsure where to begin? Look for issues tagged with:

- `good-first-issue` - Simple issues perfect for beginners
- `help-wanted` - Issues where we need community help

### Pull Requests

We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`
2. Make your changes following our coding guidelines
3. Add tests if you've added code that should be tested
4. Ensure the test suite passes
5. Update documentation as needed
6. Submit your pull request!

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Setup Steps

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Gpt_JavaScript.git
   cd Gpt_JavaScript
   ```

2. **Install dependencies for the project you're working on**
   ```bash
   cd JS_FILEUPLOADER  # or web-crawler, or linux-kernel-module-visualizer
   npm install
   ```

3. **Create a branch for your changes**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make your changes and test them**
   ```bash
   npm test  # if tests are available
   npm start # to run the application
   ```

## Pull Request Process

1. **Update Documentation**
   - Update README.md with details of changes if needed
   - Add comments to complex code sections
   - Update API documentation if you changed interfaces

2. **Follow Coding Guidelines**
   - See [Coding Guidelines](#coding-guidelines) below
   - Ensure your code is properly formatted
   - Run linters if available

3. **Write Good Commit Messages**
   - See [Commit Message Guidelines](#commit-message-guidelines)
   - Keep commits atomic and focused

4. **Testing**
   - Add tests for new features
   - Ensure all tests pass
   - Test on multiple platforms if possible

5. **Create Pull Request**
   - Fill in the PR template completely
   - Link related issues
   - Request review from maintainers

6. **Review Process**
   - Maintainers will review your PR
   - Address any requested changes
   - Once approved, your PR will be merged!

## Coding Guidelines

### JavaScript Style Guide

We follow modern ES6+ JavaScript conventions:

```javascript
// Use const/let, never var
const API_URL = 'https://api.example.com';
let count = 0;

// Use arrow functions where appropriate
const processData = (data) => {
  return data.map(item => item.value);
};

// Use async/await over callbacks
async function fetchData() {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Destructuring
const { name, age } = user;
const [first, second] = array;

// Template literals
const message = `Hello, ${name}!`;

// Default parameters
function greet(name = 'Guest') {
  return `Welcome, ${name}!`;
}
```

### Code Organization

- **Modular code**: Break code into small, reusable functions
- **Clear naming**: Use descriptive variable and function names
- **Comments**: Explain "why" not "what"
- **Error handling**: Always handle errors appropriately
- **Security**: Validate inputs, sanitize outputs, avoid common vulnerabilities

### File Naming

- Use lowercase with hyphens for files: `my-module.js`
- Use PascalCase for classes: `UserController.js`
- Use camelCase for utilities: `formatDate.js`

### Project Structure

```
project-name/
├── src/              # Source files
│   ├── controllers/  # Request handlers
│   ├── models/       # Data models
│   ├── routes/       # Route definitions
│   ├── utils/        # Utility functions
│   └── index.js      # Entry point
├── tests/            # Test files
├── docs/             # Documentation
├── package.json
└── README.md
```

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(file-uploader): add support for resumable uploads

- Implement chunk tracking
- Add resume functionality
- Update UI to show resume option

Closes #123
```

```bash
fix(crawler): prevent infinite loops on circular links

Added visited URL tracking to avoid revisiting pages

Fixes #456
```

```bash
docs(readme): update installation instructions

Added troubleshooting section and updated dependencies
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

```javascript
const assert = require('assert');
const { processData } = require('./utils');

describe('processData', () => {
  it('should process data correctly', () => {
    const input = [{ value: 1 }, { value: 2 }];
    const expected = [1, 2];
    const result = processData(input);
    assert.deepStrictEqual(result, expected);
  });

  it('should handle empty input', () => {
    const result = processData([]);
    assert.deepStrictEqual(result, []);
  });
});
```

## Documentation

### Code Comments

```javascript
/**
 * Processes user data and returns formatted result
 * @param {Object} userData - Raw user data from API
 * @param {string} userData.name - User's full name
 * @param {number} userData.age - User's age
 * @returns {Object} Formatted user object
 * @throws {Error} If userData is invalid
 */
function processUserData(userData) {
  if (!userData || !userData.name) {
    throw new Error('Invalid user data');
  }
  // ... implementation
}
```

### README Updates

When adding features, update the README with:
- Feature description
- Usage examples
- Configuration options
- Any breaking changes

## Security

### Reporting Security Issues

Please DO NOT open public issues for security vulnerabilities. Instead:
- Email the maintainers directly
- Use GitHub's private security advisory feature
- Wait for confirmation before public disclosure

### Security Best Practices

- Validate all user inputs
- Sanitize outputs to prevent XSS
- Use parameterized queries to prevent SQL injection
- Keep dependencies updated
- Never commit secrets or credentials
- Use environment variables for sensitive data

## Questions?

- Open an issue with the `question` label
- Join our discussions on GitHub Discussions
- Check existing documentation and issues first

## Recognition

Contributors will be recognized in our README.md and release notes. Thank you for helping make this project better!

---

By contributing, you agree that your contributions will be licensed under the MIT License.
