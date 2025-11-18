# Getting Started with GPT JavaScript Projects

Welcome to the GPT JavaScript Projects Collection! This guide will help you get up and running with any of the projects in this repository.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (version 18.0.0 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation:
     ```bash
     node --version
     # Should output: v18.0.0 or higher
     ```

2. **npm** (version 9.0.0 or higher)
   - Comes bundled with Node.js
   - Verify installation:
     ```bash
     npm --version
     # Should output: 9.0.0 or higher
     ```

3. **Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation:
     ```bash
     git --version
     ```

### Optional Tools

- **Visual Studio Code**: Recommended code editor ([download](https://code.visualstudio.com/))
- **Postman**: For API testing ([download](https://www.postman.com/))
- **Chrome DevTools**: For debugging web applications (built into Chrome)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/danindiana/Gpt_JavaScript.git
cd Gpt_JavaScript
```

### 2. Choose a Project

The repository contains three main projects:

| Project | Directory | Use Case |
|---------|-----------|----------|
| File Uploader | `JS_FILEUPLOADER/` | Large file uploads with chunking |
| Web Crawler | `web-crawler/` | Website scraping and content extraction |
| Kernel Visualizer | `linux-kernel-module-visualizer/` | Linux kernel module visualization |

### 3. Navigate to Your Chosen Project

```bash
# For File Uploader
cd JS_FILEUPLOADER

# For Web Crawler
cd web-crawler

# For Kernel Visualizer
cd linux-kernel-module-visualizer
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Project

```bash
npm start
```

## Project-Specific Guides

### File Uploader (JS_FILEUPLOADER)

**Purpose**: Upload large files with chunking and progress tracking

**Quick Start**:
```bash
cd JS_FILEUPLOADER
npm install
npm start
# Open browser to http://localhost:3000
```

**What to Expect**:
- Web interface for file uploads
- Real-time progress bar
- Support for multiple files
- Automatic chunking for large files

**Next Steps**:
- Read [JS_FILEUPLOADER/README.md](../../JS_FILEUPLOADER/README.md)
- Try uploading a large file (>100MB) to see chunking in action
- Check the `uploads/` directory for uploaded files

---

### Web Crawler (web-crawler)

**Purpose**: Recursively crawl websites and extract content

**Quick Start**:
```bash
cd web-crawler
npm install
node crawler.js
# Enter URL when prompted
```

**What to Expect**:
- Interactive prompt for target URL
- Real-time crawling progress
- Automatic file output with extracted content

**Next Steps**:
- Read [web-crawler/README.md](../../web-crawler/README.md)
- Start with a small website for testing
- Check output files: `output-{domain}-{timestamp}.txt`

**⚠️ Important**:
- Respect robots.txt
- Add rate limiting for production use
- Only crawl sites you have permission to access

---

### Kernel Visualizer (linux-kernel-module-visualizer)

**Purpose**: Visualize Linux kernel modules and dependencies

**Requirements**: Linux operating system

**Quick Start**:
```bash
cd linux-kernel-module-visualizer
npm install
npm start
# Open browser to http://localhost:3000
```

**What to Expect**:
- Interactive graph of kernel modules
- Click nodes for detailed information
- Multiple layout options
- RESTful API for module data

**Next Steps**:
- Read [linux-kernel-module-visualizer/README.md](../../linux-kernel-module-visualizer/README.md)
- Explore the interactive graph
- Try the API: `curl http://localhost:3000/api/modules`

---

## Common Tasks

### Updating Dependencies

Keep your projects up-to-date:

```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Update to latest versions (use with caution)
npm install <package>@latest
```

### Running in Development Mode

Most projects support auto-restart during development:

```bash
npm run dev
# or
npm install -g nodemon
nodemon server.js
```

### Port Already in Use

If you get a "port already in use" error:

```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)

# Or change the port in the project's configuration
```

### Checking Logs

View application logs:

```bash
# View recent logs
tail -f server.log

# View all logs
cat server.log

# Filter logs
grep "error" server.log
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/my-new-feature
```

### 2. Make Changes

Edit files in your preferred editor

### 3. Test Changes

```bash
npm test  # Run tests
npm start # Test manually
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

### 5. Push Changes

```bash
git push origin feature/my-new-feature
```

### 6. Create Pull Request

Open a pull request on GitHub for review

## Troubleshooting

### Node.js Not Found

**Error**: `command not found: node`

**Solution**:
```bash
# Install Node.js from nodejs.org
# Or use nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
```

### npm Install Fails

**Error**: Various npm errors during installation

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Use different registry
npm install --registry=https://registry.npmmirror.com
```

### Permission Errors

**Error**: `EACCES: permission denied`

**Solution**:
```bash
# Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Or use sudo (not recommended)
sudo npm install
```

### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Kill process on port 3000
kill -9 $(lsof -ti:3000)

# Or change port in code
# Update server.js: app.listen(3001, ...)
```

## Best Practices

### Security

- ✅ Never commit `.env` files
- ✅ Use environment variables for secrets
- ✅ Keep dependencies updated
- ✅ Run `npm audit` regularly
- ✅ Validate all user inputs

### Code Quality

- ✅ Use consistent code formatting
- ✅ Write descriptive commit messages
- ✅ Add comments for complex logic
- ✅ Follow the project's coding style
- ✅ Write tests for new features

### Performance

- ✅ Use async/await for I/O operations
- ✅ Implement proper error handling
- ✅ Close database connections
- ✅ Stream large files instead of buffering
- ✅ Cache frequently accessed data

## Next Steps

### Learn More

- Read project-specific READMEs
- Explore [Architecture Diagrams](../diagrams/README.md)
- Check [API Documentation](../api/README.md)
- Review [Contributing Guidelines](../../CONTRIBUTING.md)

### Get Involved

- Report bugs via GitHub Issues
- Suggest features
- Submit pull requests
- Join discussions
- Help improve documentation

### Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [npm Documentation](https://docs.npmjs.com/)

## Getting Help

If you run into issues:

1. Check the project-specific README
2. Search existing GitHub Issues
3. Read the [Troubleshooting Guide](./troubleshooting.md)
4. Ask in GitHub Discussions
5. Open a new issue with details

---

**Ready to start coding?** Choose a project and dive in! 🚀

**Questions?** Check our [FAQ](./troubleshooting.md) or open an issue.
