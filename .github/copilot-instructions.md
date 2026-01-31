Project Overview
A Markdown and LaTeX text editor with in-place editing that looks exactly like the final rendered output.

Architecture Principles
Core Concepts
OOP-based: Main components and state-holding components are classes; everything else should be pure functions
Row-based format: Document structure is only row-based (no columns)
Binary tree structure: Left node = next block, right node = nested block
Three Main Layers
Entities: Block representations with rendering logic
Nodes: In-memory representation with parent-child relationships
Containers: Visual wrappers rendered on screen
Coding Standards
Documentation
Every file must have heading comments explaining its purpose
Every function/method/class requires JSDoc documentation
Every step needs inline comments for clarity
Naming Conventions
Code Elements
Constants/readonly/getters/setters: CAPITAL_LETTERS
Interfaces: Must end with Interface
Types/Enums/Abstracts: Must end with their pattern name
Classes: Must end with their pattern (e.g., ClassSomethingSingleton)
Private methods: Start with an underscore and marked as private
Files and Folders
Folders: Use - separator (e.g., some-folder-there)
Files: Format is name.pattern.type.ts (e.g., something.factory.interface.ts)
Classes: Capitalize first letter (e.g., Something.singleton.ts)
Helpers: End with .helper.ts
Utilities: End with .util.ts
Test files: Named <original-file-name>.spec.ts
Module Structure
One default export per file maximum
Use named exports otherwise
Expose minimal interface only
Testing Requirements
Every file must be unit tested
At minimum: test initialization and construction
Error Handling
Visual application should have minimal errors
Errors only expected when users misuse the app
Rendering errors result in displaying nothing in the entity

src/
├── app/ # Application container
├── editor/ # UI components
├── engine/ # Core logic
│ ├── elements-store/
│ ├── entities-store/
│ ├── history/
│ ├── memory/
│ └── renderer/
└── types/ # Interfaces, types, abstracts

Each folder contains a <foldername>.txt explaining its purpose
Classes have their own folder with a lib/ subfolder for assistance
Key Features
Block Types (21 total)
Headers (H1-H6), Paragraph, Checkbox, Quote, Callout, HR, List, Toggle, Table, Code Block, Image, Video, Audio, HTML, Embedding, LaTeX

Inline Elements
Abbreviations, Address, Button, Keyboard buttons, LaTeX, Hyperlinks, Progress bar

Effects
Highlight, Color, Font, Size, Bold, Italic, Strikethrough, Underline

Editor Features
Drag button
Selection menu
Options menu (convert to, duplicate, delete)
In-preview live editing
Export to HTML, PDF, Markdown
