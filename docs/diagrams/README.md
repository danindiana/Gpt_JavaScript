# Architecture Diagrams

This directory contains Mermaid diagrams documenting various software architectures, workflows, and system designs.

## Available Diagrams

### 1. [GPU C++ Library Workflow](./gpu_cpp.md)
Comprehensive flowchart of the gpu.cpp library structure, including:
- Core library components
- Quick start guide
- Technical objectives
- Example implementations
- Features and capabilities

**Topics**: C++ development, GPU programming, Vulkan, CUDA

---

### 2. [React Installation Process](./react_install.md)
Step-by-step flowchart for setting up a React development environment:
- Node.js installation verification
- npm setup and updates
- Create React App workflow
- Project structure understanding
- Development server startup

**Topics**: React, JavaScript, Node.js, Frontend development

---

### 3. [Browser Extension Security](./universe_chainer.md)
Security analysis flowchart covering:
- Universal XSS vulnerabilities
- Content script message passing
- Same Origin Policy (SOP) bypass techniques
- Native messaging security
- Command execution risks in extensions
- Smart card extension vulnerabilities

**Topics**: Browser security, XSS, Extensions, Security research

---

### 4. [Workflow Management](./use_work_journal.md)
Problem-solving and focus management flowchart:
- Debugging complex permission issues
- Managing interruptions and distractions
- Maintaining focus during troubleshooting
- Step-by-step problem resolution
- Emotional and cognitive state management

**Topics**: Project management, Debugging, Workflow optimization

---

### 5. [Plastic Power Manufacturing](./plastic_power.md)
Conceptual flowchart from Cody Wilson's HCPP23 speech:
- History of 3D gun printing
- Lessons learned from the movement
- Applicability to hacking projects
- Forms of historiography
- Technology and power dynamics

**Topics**: 3D printing, Technology history, Innovation

---

## Using These Diagrams

### Viewing on GitHub

GitHub natively renders Mermaid diagrams. Simply click on any `.md` file above to view the interactive diagram.

### Local Viewing

You can view these diagrams locally using:

1. **VS Code** with Mermaid preview extensions
2. **Mermaid Live Editor**: Copy/paste code to [mermaid.live](https://mermaid.live/)
3. **Browser Extensions**: Install Mermaid diagram viewers

### Embedding in Documentation

To embed these diagrams in your documentation:

\`\`\`markdown
![Architecture Diagram](./docs/diagrams/gpu_cpp.md)
\`\`\`

Or reference the raw Mermaid code:

\`\`\`mermaid
graph TD
    A[Start] --> B[Process]
    B --> C[End]
\`\`\`

## Creating New Diagrams

### Mermaid Syntax

Mermaid supports various diagram types:

- **Flowchart**: `graph TD` or `graph LR`
- **Sequence Diagram**: `sequenceDiagram`
- **Class Diagram**: `classDiagram`
- **State Diagram**: `stateDiagram`
- **Gantt Chart**: `gantt`
- **Pie Chart**: `pie`
- **Entity Relationship**: `erDiagram`

### Example Template

\`\`\`mermaid
graph TB
    subgraph "Main System"
        A[Component A]
        B[Component B]
        C[Component C]
    end

    A --> B
    B --> C

    style A fill:#e1f5ff
    style B fill:#ffe1e1
    style C fill:#e1ffe1
\`\`\`

### Best Practices

1. **Use Descriptive Labels**: Make node labels clear and concise
2. **Group Related Items**: Use subgraphs for logical groupings
3. **Add Colors**: Use styling to highlight different component types
4. **Keep It Simple**: Break complex diagrams into multiple smaller ones
5. **Document**: Add explanatory text before and after diagrams

## Contributing

To add a new diagram:

1. Create a new `.md` file in this directory
2. Add Mermaid code within code blocks
3. Include descriptive text explaining the diagram
4. Update this README with a link and description
5. Submit a pull request

## Resources

- [Mermaid Documentation](https://mermaid.js.org/)
- [Mermaid Live Editor](https://mermaid.live/)
- [Mermaid GitHub](https://github.com/mermaid-js/mermaid)
- [Diagram Examples](https://mermaid.js.org/ecosystem/integrations.html)

## License

All diagrams in this repository are licensed under MIT License.
