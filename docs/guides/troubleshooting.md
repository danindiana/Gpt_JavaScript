# Troubleshooting Guide

Common issues and solutions for GPT JavaScript Projects.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Runtime Errors](#runtime-errors)
- [Network Issues](#network-issues)
- [File System Issues](#file-system-issues)
- [Project-Specific Issues](#project-specific-issues)
- [Platform-Specific Issues](#platform-specific-issues)

## Installation Issues

### npm install fails

**Symptoms**: Errors during `npm install`

**Common Causes**:
- Outdated npm version
- Network connectivity issues
- Corrupted npm cache
- Permission problems

**Solutions**:

```bash
# Update npm
npm install -g npm@latest

# Clear npm cache
npm cache clean --force

# Delete and reinstall
rm -rf node_modules package-lock.json
npm install

# Try with verbose logging
npm install --verbose
```

### Node version mismatch

**Symptoms**: `Error: The engine "node" is incompatible`

**Solution**:
```bash
# Check current version
node --version

# Install required version (18+)
nvm install 18
nvm use 18

# Or download from nodejs.org
```

### EACCES permission errors

**Symptoms**: `EACCES: permission denied`

**Solutions**:

```bash
# Option 1: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Option 2: Fix directory ownership
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Option 3: Use sudo (not recommended)
sudo npm install
```

## Runtime Errors

### Port already in use

**Symptoms**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions**:

```bash
# Find process using port
lsof -ti:3000

# Kill process
kill -9 $(lsof -ti:3000)

# Or change port in application
# Edit server.js or set environment variable
PORT=3001 npm start
```

### Module not found

**Symptoms**: `Error: Cannot find module 'express'`

**Solutions**:

```bash
# Install missing module
npm install

# Install specific module
npm install express

# Check if module is in package.json
cat package.json

# Reinstall all dependencies
rm -rf node_modules
npm install
```

### Syntax errors in Node.js

**Symptoms**: `SyntaxError: Unexpected token`

**Causes**:
- Using modern JavaScript features with old Node.js
- Typos in code
- Missing semicolons or brackets

**Solutions**:

```bash
# Update Node.js to version 18+
node --version

# Check code for syntax errors
npm run lint  # if available

# Use a linter
npm install -g eslint
eslint server.js
```

## Network Issues

### Cannot connect to server

**Symptoms**: Browser shows "Connection refused" or "Cannot connect"

**Solutions**:

```bash
# Check if server is running
ps aux | grep node

# Check firewall
sudo ufw status
sudo ufw allow 3000

# Check if listening on correct interface
netstat -tulpn | grep 3000

# Ensure binding to 0.0.0.0, not 127.0.0.1
# In server.js:
app.listen(3000, '0.0.0.0', () => {...});
```

### Timeout errors during crawling

**Symptoms**: Web crawler times out

**Solutions**:

```javascript
// Increase axios timeout
const response = await axios.get(url, {
  timeout: 30000  // 30 seconds
});

// Add retry logic
const maxRetries = 3;
for (let i = 0; i < maxRetries; i++) {
  try {
    const response = await axios.get(url);
    break;
  } catch (error) {
    if (i === maxRetries - 1) throw error;
    await sleep(1000 * (i + 1));  // Exponential backoff
  }
}
```

### CORS errors

**Symptoms**: `Access-Control-Allow-Origin` errors in browser

**Solutions**:

```javascript
// Add CORS middleware
const cors = require('cors');
app.use(cors());

// Or configure specific origins
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## File System Issues

### Cannot create uploads directory

**Symptoms**: `EACCES: permission denied, mkdir 'uploads'`

**Solutions**:

```bash
# Create directory manually
mkdir uploads
chmod 755 uploads

# Fix ownership
sudo chown $(whoami):$(whoami) uploads

# Run with proper permissions
# Don't run as root unless necessary
```

### Disk space full

**Symptoms**: `ENOSPC: no space left on device`

**Solutions**:

```bash
# Check disk usage
df -h

# Find large files
du -sh * | sort -hr | head -10

# Clean npm cache
npm cache clean --force

# Remove old uploads
find uploads -mtime +7 -delete

# Clean node_modules
find . -name "node_modules" -type d -exec rm -rf {} +
```

### File already exists error

**Symptoms**: `EEXIST: file already exists`

**Solutions**:

```javascript
// Check if file exists before writing
const fs = require('fs');
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, data);
}

// Or use unique filenames
const timestamp = Date.now();
const filename = `output-${timestamp}.txt`;
```

## Project-Specific Issues

### File Uploader

#### Chunks not combining

**Symptoms**: Upload completes but file is incomplete

**Solutions**:

```javascript
// Ensure all chunks are uploaded
console.log(`Received chunk ${chunkIndex + 1} of ${totalChunks}`);

// Check chunk files exist
const chunkPath = path.join(uploadsDir, `${fileIdentifier}-chunk${index}`);
if (!fs.existsSync(chunkPath)) {
  console.error(`Missing chunk: ${index}`);
}

// Add verification
const expectedSize = totalChunks * chunkSize;
const actualSize = fs.statSync(finalPath).size;
console.log(`Expected: ${expectedSize}, Actual: ${actualSize}`);
```

#### Upload freezes

**Symptoms**: Upload stops mid-transfer

**Solutions**:

```javascript
// Increase timeout
request.timeout = 300000; // 5 minutes

// Add progress logging
request.upload.addEventListener('progress', (e) => {
  console.log(`Upload progress: ${(e.loaded / e.total * 100).toFixed(2)}%`);
});

// Check network connection
request.onerror = function() {
  console.error('Network error - check connection');
};
```

### Web Crawler

#### Infinite loop

**Symptoms**: Crawler never stops

**Solutions**:

```javascript
// Add max depth limit
const MAX_DEPTH = 5;
let depth = 0;

const crawlUrl = async (url, currentDepth = 0) => {
  if (currentDepth > MAX_DEPTH) return;
  // ... rest of code
  await crawlUrl(linkUrl, currentDepth + 1);
};

// Add max pages limit
const MAX_PAGES = 100;
if (visitedUrls.size >= MAX_PAGES) return;

// Add timeout
const startTime = Date.now();
const TIMEOUT = 30000; // 30 seconds
if (Date.now() - startTime > TIMEOUT) return;
```

#### Memory issues

**Symptoms**: `JavaScript heap out of memory`

**Solutions**:

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" node crawler.js

# Or in package.json scripts:
"start": "node --max-old-space-size=4096 crawler.js"
```

```javascript
// Reduce cache size
const MAX_FILE_SIZE_MB = 10; // Reduce from 30

// Stream directly to file instead of caching
const stream = fs.createWriteStream(filename, { flags: 'a' });
stream.write(text);
```

### Kernel Visualizer

#### lsmod command not found

**Symptoms**: `Error: lsmod: command not found`

**Solutions**:

```bash
# Install kmod package
# Ubuntu/Debian
sudo apt-get install kmod

# RHEL/CentOS
sudo yum install kmod

# Arch Linux
sudo pacman -S kmod

# Verify
which lsmod
```

#### No modules displayed

**Symptoms**: Graph is empty

**Solutions**:

```bash
# Test lsmod directly
lsmod

# Check server logs
npm start | tee server.log

# Check browser console
# Open DevTools (F12) and check for errors

# Test API directly
curl http://localhost:3000/api/modules

# Verify Linux system
uname -s  # Should output "Linux"
```

## Platform-Specific Issues

### Windows

#### Path issues

**Symptoms**: File paths not working

**Solutions**:

```javascript
// Use path.join instead of string concatenation
const path = require('path');
const filePath = path.join(__dirname, 'uploads', filename);

// Not: const filePath = __dirname + '/uploads/' + filename;
```

#### lsmod not available

**Symptoms**: Kernel Visualizer doesn't work on Windows

**Solution**: This project requires Linux. Use WSL (Windows Subsystem for Linux):

```bash
# Install WSL
wsl --install

# Run project in WSL
wsl
cd /mnt/c/path/to/project
npm start
```

### macOS

#### Permission issues

**Symptoms**: Cannot write to directories

**Solutions**:

```bash
# Fix permissions
sudo chown -R $(whoami) .

# For specific directories
chmod 755 uploads
```

#### Python not found

**Symptoms**: Some npm packages fail to install

**Solutions**:

```bash
# Install Xcode Command Line Tools
xcode-select --install

# Or install Python
brew install python
```

### Linux

#### Firewall blocking

**Symptoms**: Cannot access server from other machines

**Solutions**:

```bash
# Check firewall
sudo ufw status

# Allow port
sudo ufw allow 3000

# Or disable firewall (not recommended)
sudo ufw disable
```

## Debug Mode

### Enable verbose logging

```javascript
// Add debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Log errors
app.use((err, req, res, next) => {
  console.error('Error:', err);
  console.error('Stack:', err.stack);
  next(err);
});
```

### Node.js debugging

```bash
# Run with inspector
node --inspect server.js

# Open chrome://inspect in Chrome
# Click "inspect" under your Node process
```

## Getting More Help

### Gather Information

When asking for help, include:

```bash
# System information
node --version
npm --version
uname -a  # Linux/Mac
systeminfo  # Windows

# Error logs
npm start 2>&1 | tee error.log

# Package versions
npm list --depth=0
```

### Where to Get Help

1. **Check Documentation**
   - Project README files
   - This troubleshooting guide
   - Official package documentation

2. **Search Issues**
   - [GitHub Issues](https://github.com/danindiana/Gpt_JavaScript/issues)
   - Stack Overflow
   - Package-specific issue trackers

3. **Ask Questions**
   - Open a GitHub Issue
   - Post in GitHub Discussions
   - Ask on Stack Overflow with proper tags

4. **Community Resources**
   - [Node.js Discord](https://discord.gg/nodejs)
   - [r/node](https://reddit.com/r/node)
   - [Express.js Gitter](https://gitter.im/expressjs/express)

## Prevention Tips

### Regular Maintenance

```bash
# Update dependencies monthly
npm outdated
npm update

# Check for security vulnerabilities
npm audit
npm audit fix

# Clean old files
find . -name "node_modules" -type d -mtime +30 -delete
```

### Best Practices

- ✅ Use `.gitignore` to avoid committing `node_modules`
- ✅ Pin dependency versions in `package.json`
- ✅ Write tests to catch regressions
- ✅ Use environment variables for configuration
- ✅ Log errors with context
- ✅ Implement proper error handling
- ✅ Monitor disk space and memory usage

---

**Still having issues?** Open an issue on GitHub with:
- Detailed description of the problem
- Steps to reproduce
- Error messages and logs
- System information (OS, Node version, etc.)
- What you've already tried
