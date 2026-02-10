
# File System

There is no magic here.

## Folder Structure

The workspace root contains the app entry points, public assets and the `src` application code. The `src` layout below shows the current folder architecture used by the project.

```text
src
├── app
├── constants
│   └── DocumentClassNames.constant.ts
├── editor
│   ├── event-handler
│   │   ├── action-handler-strategies
│   │   │   ├── AppendChildNodeHandler.strategy.spec.ts
│   │   │   ├── AppendChildNodeHandler.strategy.ts
│   │   │   ├── AppendMultipleChildNodesHandler.strategy.spec.ts
│   │   │   ├── AppendMultipleChildNodesHandler.strategy.ts
│   │   │   ├── AppendNodeHandler.strategy.spec.ts
   │   │   ├── AppendNodeHandler.strategy.ts
   │   │   ├── ClearMemoryHandler.strategy.spec.ts
   │   │   ├── ClearMemoryHandler.strategy.ts
   │   │   ├── DeleteMultipleNodesHandler.strategy.spec.ts
   │   │   ├── DeleteMultipleNodesHandler.strategy.ts
   │   │   ├── DeleteNodeHandler.strategy.spec.ts
   │   │   ├── DeleteNodeHandler.strategy.ts
   │   │   ├── DuplicateMultipleNodesHandler.strategy.spec.ts
   │   │   ├── DuplicateMultipleNodesHandler.strategy.ts
   │   │   ├── DuplicateNodeHandler.strategy.spec.ts
   │   │   ├── DuplicateNodeHandler.strategy.ts
   │   │   ├── ExportMemoryHandler.strategy.spec.ts
   │   │   ├── ExportMemoryHandler.strategy.ts
   │   │   ├── GetNodeByIDHandler.strategy.spec.ts
   │   │   ├── GetNodeByIDHandler.strategy.ts
   │   │   ├── InsertChildNodeHandler.strategy.spec.ts
   │   │   ├── InsertChildNodeHandler.strategy.ts
   │   │   ├── InsertMultipleNodesBelowHandler.strategy.spec.ts
   │   │   ├── InsertMultipleNodesBelowHandler.strategy.ts
   │   │   ├── InsertNodeBelowHandler.strategy.spec.ts
   │   │   ├── InsertNodeBelowHandler.strategy.ts
   │   │   ├── memory.mock.ts
   │   │   ├── MoveMultipleNodesBelowHandler.strategy.spec.ts
   │   │   ├── MoveMultipleNodesBelowHandler.strategy.ts
   │   │   ├── MoveNodeBelowHandler.strategy.spec.ts
   │   │   ├── MoveNodeBelowHandler.strategy.ts
   │   │   ├── UpdateHandler.strategy.spec.ts
   │   │   └── UpdateHandler.strategy.ts
   │   ├── EventHandler.ts
   │   └── EventsHandler.spec.ts
   ├── GUI
   │   ├── bottom-menu
   │   └── controls
   └── rendering
	   └── renderer.ts
├── entities
│   ├── container
│   │   ├── Container.spec.ts
│   │   └── Container.ts
│   ├── elements-store
│   ├── entities-store
│   │   ├── audio
│   │   │   ├── AudioEntity.spec.ts
│   │   │   └── AudioEntity.ts
│   │   ├── BlockEntity.abstract.ts
│   │   ├── callout
│   │   │   ├── CalloutEntity.spec.ts
│   │   │   └── CalloutEntity.ts
│   │   ├── checkbox
│   │   │   ├── CheckboxEntity.spec.ts
│   │   │   └── CheckboxEntity.ts
│   │   ├── code-block
│   │   │   ├── CodeBlockEntity.spec.ts
│   │   │   └── CodeBlockEntity.ts
│   │   ├── embedding
│   │   │   ├── EmbeddingEntity.spec.ts
│   │   │   └── EmbeddingEntity.ts
│   │   ├── h1
│   │   │   ├── H1Entity.spec.ts
│   │   │   └── H1Entity.ts
│   │   ├── h2
│   │   │   ├── H2Entity.spec.ts
│   │   │   └── H2Entity.ts
│   │   ├── h3
│   │   │   ├── H3Entity.spec.ts
│   │   │   └── H3Entity.ts
│   │   ├── h4
│   │   │   ├── H4Entity.spec.ts
│   │   │   └── H4Entity.ts
│   │   ├── h5
│   │   │   ├── H5Entity.spec.ts
│   │   │   └── H5Entity.ts
│   │   ├── h6
│   │   │   ├── H6Entity.spec.ts
│   │   │   └── H6Entity.ts
│   │   ├── hr
│   │   │   ├── HrEntity.spec.ts
│   │   │   └── HrEntity.ts
│   │   ├── html
│   │   │   ├── HtmlEntity.spec.ts
│   │   │   └── HtmlEntity.ts
│   │   ├── image
│   │   │   ├── ImageEntity.spec.ts
│   │   │   └── ImageEntity.ts
│   │   ├── latex
│   │   │   ├── LatexEntity.spec.ts
│   │   │   └── LatexEntity.ts
│   │   ├── lib
│   │   │   └── dom.util.ts
│   │   ├── oi
│   │   │   ├── OiEntity.spec.ts
│   │   │   └── OiEntity.ts
│   │   ├── paragraph
│   │   │   ├── ParagraphEntity.spec.ts
│   │   │   └── ParagraphEntity.ts
│   │   ├── quote
│   │   │   ├── QuoteEntity.spec.ts
│   │   │   └── QuoteEntity.ts
│   │   ├── table
│   │   │   ├── TableEntity.spec.ts
│   │   │   └── TableEntity.ts
│   │   ├── toggle
│   │   │   ├── ToggleEntity.spec.ts
│   │   │   └── ToggleEntity.ts
│   │   ├── ui
│   │   │   ├── UiEntity.spec.ts
│   │   │   └── UiEntity.ts
│   │   └── video
│   │       ├── VideoEntity.spec.ts
│   │       └── VideoEntity.ts
│   └── factories
│       ├── children
│       │   ├── AudioRender.factory.ts
│       │   ├── CalloutRender.factory.ts
│       │   ├── CheckboxRender.factory.ts
│       │   ├── CodeBlockRender.factory.ts
│       │   ├── EmbeddingRender.factory.ts
│       │   ├── H1Render.factory.ts
│       │   ├── H2Render.factory.ts
│       │   ├── H3Render.factory.ts
│       │   ├── H4Render.factory.ts
│       │   ├── H5Render.factory.ts
│       │   ├── H6Render.factory.ts
│       │   ├── HrRender.factory.ts
│       │   ├── HtmlRender.factory.ts
│       │   ├── ImageRender.factory.ts
│       │   ├── LatexRender.factory.ts
│       │   ├── OiRender.factory.ts
│       │   ├── ParagraphRender.factory.ts
│       │   ├── QuoteRender.factory.ts
│       │   ├── TableRender.factory.ts
│       │   ├── ToggleRender.factory.ts
│       │   ├── UiRender.factory.ts
│       │   └── VideoRender.factory.ts
│       └── HTMLRender.factory.abstract.ts
├── history
│   ├── benchmarks
│   │   └── history.bench.ts
│   ├── History.spec.ts
│   └── History.ts
├── main.ts
├── memory
│   ├── benchmarks
│   │   └── memory.bench.ts
│   ├── lib
│   │   ├── deleteNode.util.spec.ts
│   │   ├── deleteNode.util.ts
│   │   ├── getFreeSpots.util.spec.ts
│   │   ├── getFreeSpots.util.ts
│   │   ├── index.ts
│   │   ├── updateTailID.util.spec.ts
│   │   └── updateTailID.util.ts
│   ├── Memory.spec.ts
│   ├── Memory.ts
│   ├── Node.spec.ts
│   └── Node.ts
└── types
	├── ActionHandler.strategy.interface.ts
	├── BlockEntity.interface.ts
	├── BlockTypes.enum.ts
	├── Container.interface.ts
	├── History.interface.ts
	├── Memory.interface.ts
	└── Node.interface.ts

45 directories, 131 files
```

Notes:

- Folders like `lib` are used for small helpers/utilities tied to a module.
- Every class or major module has a corresponding `.spec.ts` test file placed beside it.
- Each folder typically includes a short README or descriptive text file describing its purpose.

## Naming Conventions

- Folder names use `-` as separator, example: `some-folder-there`.
- File names follow the pattern: name.pattern.type.ts (for example: `something.factory.interface.ts`).
- Class files: capitalize the first letter and include the class pattern, e.g. `Something.singleton.ts`.
- Helper files end with `.helper.ts` and utilities end with `.util.ts`.

