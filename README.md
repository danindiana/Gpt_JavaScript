# GPT JavaScript Projects Collection

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-blue.svg)](https://www.ecma-international.org/ecma-262/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/danindiana/Gpt_JavaScript/graphs/commit-activity)

A curated collection of AI-assisted JavaScript/Node.js projects demonstrating practical implementations of web crawling, file uploading, and system visualization.

## 📋 Table of Contents

- [Overview](#overview)
- [Projects](#projects)
- [Repository Architecture](#repository-architecture)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This repository contains several standalone JavaScript projects created with AI assistance (GPT/LLM), each demonstrating different aspects of modern web development and system administration:

- **File Upload System**: Chunked file upload with progress tracking
- **Web Crawler**: Recursive web scraping with content extraction
- **Linux Kernel Visualizer**: Interactive visualization of kernel module dependencies

## 🚀 Projects

### 1. File Uploader (JS_FILEUPLOADER)

A robust Express.js application that handles large file uploads using chunking strategy.

**Features:**
- ✅ Chunked file upload for large files
- ✅ Real-time upload progress tracking
- ✅ Memory-efficient streaming
- ✅ Automatic chunk reassembly

**Quick Start:**
```bash
cd JS_FILEUPLOADER
npm install
npm start
# Visit http://localhost:3000
```

[📖 Full Documentation](./JS_FILEUPLOADER/README.md)

---

### 2. Web Crawler (web-crawler)

An intelligent web crawler that recursively scrapes websites and extracts text content.

**Features:**
- ✅ Recursive URL crawling
- ✅ Automatic content extraction
- ✅ Cache management with file size limits
- ✅ Sanitized output filenames

**Quick Start:**
```bash
cd web-crawler
npm install
node crawler.js
```

[📖 Full Documentation](./web-crawler/README.md)

---

### 3. Linux Kernel Module Visualizer

Interactive visualization of Linux kernel modules and their dependencies using Node.js and vis.js.

**Features:**
- ✅ Real-time kernel module detection
- ✅ Interactive dependency graph
- ✅ Web-based visualization
- ✅ RESTful API for module data

**Quick Start:**
```bash
cd linux-kernel-module-visualizer
npm install
npm start
# Visit http://localhost:3000
```

[📖 Full Documentation](./linux-kernel-module-visualizer/README.md)

---

## 🏗️ Repository Architecture

```mermaid
graph TB
    subgraph "GPT JavaScript Projects"
        A[Root Repository]

        subgraph "Applications"
            B[File Uploader<br/>Express + Multer]
            C[Web Crawler<br/>Axios + Cheerio]
            D[Kernel Visualizer<br/>Express + vis.js]
        end

        subgraph "Documentation"
            E[docs/diagrams/<br/>Mermaid Diagrams]
            F[docs/guides/<br/>User Guides]
            G[API Documentation]
        end

        subgraph "Assets"
            H[Screenshots]
            I[Demo Files]
        end

        A --> B
        A --> C
        A --> D
        A --> E
        A --> F
        A --> G
        A --> H
        A --> I
    end

    style A fill:#e1f5ff
    style B fill:#ffe1e1
    style C fill:#e1ffe1
    style D fill:#ffe1ff
```

### Project Structure

```
Gpt_JavaScript/
├── JS_FILEUPLOADER/          # Chunked file upload system
│   ├── server.js             # Main server implementation
│   ├── index.html            # Client interface
│   ├── package.json          # Dependencies
│   └── README.md             # Project documentation
│
├── web-crawler/              # Web scraping tool
│   ├── crawler.js            # Main crawler logic
│   ├── package.json          # Dependencies
│   └── README.md             # Project documentation
│
├── linux-kernel-module-visualizer/
│   ├── server/               # Backend API
│   │   └── server.js
│   ├── client/               # Frontend visualization
│   │   └── index.html
│   ├── package.json
│   └── README.md
│
├── docs/                     # Comprehensive documentation
│   ├── diagrams/             # Mermaid diagrams
│   ├── guides/               # User guides
│   └── api/                  # API documentation
│
├── assets/                   # Media files
│   └── screenshots/          # Application screenshots
│
├── .gitignore               # Git ignore rules
├── CONTRIBUTING.md          # Contribution guidelines
├── CODE_OF_CONDUCT.md       # Code of conduct
└── README.md                # This file
```

## 📊 Technology Stack

```mermaid
graph LR
    subgraph "Backend"
        A[Node.js 18+]
        B[Express.js 4.x]
        C[Multer]
    end

    subgraph "Web Scraping"
        D[Axios]
        E[Cheerio]
    end

    subgraph "Visualization"
        F[vis.js]
        G[D3.js]
    end

    subgraph "Testing"
        H[Mocha]
        I[Chai]
    end

    A --> B
    A --> C
    A --> D
    A --> E
    B --> F
    F --> G
    A --> H
    H --> I

    style A fill:#68a063
    style B fill:#000000,color:#fff
    style F fill:#2b7ce9
```

## 🛠️ Getting Started

### Prerequisites

Before running any project, ensure you have:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/danindiana/Gpt_JavaScript.git
   cd Gpt_JavaScript
   ```

2. **Choose a project and navigate to its directory**
   ```bash
   cd JS_FILEUPLOADER  # or web-crawler, or linux-kernel-module-visualizer
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the project**
   ```bash
   npm start
   ```

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Getting Started Guide](./docs/guides/getting-started.md)** - Quick introduction to all projects
- **[API Reference](./docs/api/README.md)** - Detailed API documentation
- **[Architecture Diagrams](./docs/diagrams/README.md)** - Visual system architecture
- **[Troubleshooting](./docs/guides/troubleshooting.md)** - Common issues and solutions

### Mermaid Diagrams

The repository includes several architectural and workflow diagrams:

- [GPU C++ Library Workflow](./docs/diagrams/gpu_cpp.md)
- [React Installation Process](./docs/diagrams/react_install.md)
- [Browser Extension Security](./docs/diagrams/universe_chainer.md)
- [Workflow Management](./docs/diagrams/use_work_journal.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development process
- Submitting pull requests
- Reporting bugs
- Suggesting enhancements

### Development Workflow

```mermaid
graph LR
    A[Fork Repo] --> B[Create Branch]
    B --> C[Make Changes]
    C --> D[Write Tests]
    D --> E[Run Tests]
    E --> F{Tests Pass?}
    F -->|Yes| G[Commit]
    F -->|No| C
    G --> H[Push]
    H --> I[Create PR]
    I --> J[Code Review]
    J --> K{Approved?}
    K -->|Yes| L[Merge]
    K -->|No| C

    style A fill:#e1f5ff
    style L fill:#90EE90
```

## 🔒 Security

Security is a priority. If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email details to the repository maintainers
3. Wait for a response before disclosing publicly

See [SECURITY.md](SECURITY.md) for more details.

## 📈 Project Status

| Project | Status | Version | Last Updated |
|---------|--------|---------|--------------|
| File Uploader | ✅ Active | 2.0.0 | 2024-11 |
| Web Crawler | ✅ Active | 2.0.0 | 2024-11 |
| Kernel Visualizer | ✅ Active | 1.0.0 | 2024-11 |

## 🗺️ Roadmap

- [ ] Add Docker support for all projects
- [ ] Implement CI/CD with GitHub Actions
- [ ] Add comprehensive test coverage
- [ ] Create live demo deployments
- [ ] Add WebSocket support for real-time updates
- [ ] Implement authentication and authorization
- [ ] Add database integration options
- [ ] Create CLI tools for each project

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Created with assistance from GPT/LLM AI models
- Built on top of excellent open-source libraries
- Inspired by the Node.js and JavaScript community

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/danindiana/Gpt_JavaScript/issues)
- **Discussions**: [GitHub Discussions](https://github.com/danindiana/Gpt_JavaScript/discussions)
- **Wiki**: [Project Wiki](https://github.com/danindiana/Gpt_JavaScript/wiki)

---

<div align="center">

**[⬆ back to top](#gpt-javascript-projects-collection)**

Made with ❤️ using Node.js and AI assistance

</div>
