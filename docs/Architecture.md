# This is How the App Works, Follow Me Step by Step

## Format

- The format is just a Markdown file.
- Also, it is only row-based, so no columns are there.

## Entities

An entity is the representation of a block. The following is the interface of the entity:

In editor mode, the rendering of the entity provides extra features for editing itself. This is because editing is in preview. This might hurt architecture cleanliness and cause circular dependencies, but this is the best option so far.

```ts
export interface BlockEntityInterface<OptionsType, DataType> {
  /**
   * Indicates whether the block entity can be converted to other types
   */
  readonly CONVERTABLE?: boolean;

  get BLOCK_TYPE(): keyof typeof BlockTypesEnum;

  /**
   * The data of the block entity; its type depends on the block type
   */
  get DATA(): DataType;

  /**
   * The underlying HTML element representing the block entity in the DOM
   */
  get HTML_ELEMENT(): HTMLElement;

  /**
   * Unique identifier for the block entity
   */
  get ID(): number;

  set ID(value: number);

  set OPTIONS(value: OptionsType | undefined);

  get OPTIONS(): OptionsType | undefined;

  /**
   * Parses the DATA and generates the HTML content based on the current MODE and ships it to the DOM
   */
  render(): BlockEntityInterface<OptionsType, DataType>;

  /**
   * Converts the current block entity to another type and returns the new block entity.
   * Some entities do not support conversion to certain types; in that case, an error is thrown.
   * These entities are: EmbeddedContent, HR, VIDEO, AUDIO, IMAGE, and CUSTOM_HTML.
   * They have CONVERTABLE set to false.
   * @param newType
   */
  convertTo(
    newType: keyof typeof BlockTypesEnum,
  ): BlockEntityInterface<OptionsType, DataType>;
}
```

Also, block types are represented in [[./All-Features.md]]. They have the following class names in the DOM:

```ts
export enum BlockTypesEnum {
  H1 = "H1",
  H2 = "H2",
  H3 = "H3",
  H4 = "H4",
  H5 = "H5",
  H6 = "H6",
  PARAGRAPH = "PARAGRAPH",
  CHECKBOX = "CHECKBOX",
  QUOTE = "QUOTE",
  CALLOUT = "CALLOUT",
  HR = "HR",
  LIST = "LIST",
  TOGGLE = "TOGGLE",
  TABLE = "TABLE",
  CODE_BLOCK = "CODE_BLOCK",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  HTML = "HTML",
  EMBEDDING = "EMBEDDING",
  LATEX = "LATEX",
}
```

By the way, all class names are:

```ts
H1 = "H1",
H2 = "H2",
H3 = "H3",
H4 = "H4",
H5 = "H5",
H6 = "H6",
PARAGRAPH = "PARAGRAPH",
CHECKBOX = "CHECKBOX",
QUOTE = "QUOTE",
CALLOUT = "CALLOUT",
HR = "HR",
LIST = "LIST",
TOGGLE = "TOGGLE",
TABLE = "TABLE",
CODE_BLOCK = "CODE_BLOCK",
IMAGE = "IMAGE",
VIDEO = "VIDEO",
AUDIO = "AUDIO",
HTML = "HTML",
EMBEDDING = "EMBEDDING",
LATEX = "LATEX",
ABBREVIATIONS = "ABBREVIATIONS",
ADDRESS = "ADDRESS",
BUTTON = "BUTTON",
KEYBOARD_BUTTONS = "KEYBOARD_BUTTONS",
HYPERLINKS = "HYPERLINKS",
PROGRESS_BAR = "PROGRESS_BAR",
HIGHLIGHT = "HIGHLIGHT",
BOLD = "BOLD",
ITALIC = "ITALIC",
STRIKE_THROUGH = "STRIKE_THROUGH",
UNDERLINE = "UNDERLINE",
INLINE_LATEX = "INLINE_LATEX",
```

Every inline effect has a class name.

## Nodes

Nodes are the representation of Entities in memory. They have child-parent and below-above relationships. They are also the gateway to accessing entities.

```ts
/**
 * This represents the entity in memory and the editor interface as a node in a binary tree
 */
export interface EntityNodeInterface {
  get entity(): BlockEntityInterface<any, any>;

  get ID(): number | null; // The ID of the entity should match the node ID in memory

  get parentID(): NodeID | null;
  get leftID(): NodeID | null;
  get rightID(): NodeID | null;

  setID(id: number): void;

  setParent(nodeID: NodeID | null): void;
  setLeft(nodeID: NodeID | null): void;
  setRight(nodeID: NodeID | null): void;

  /**
   * Converts the entity to a new block type
   */
  convertTo(newType: keyof typeof BlockTypesEnum): EntityNodeInterface;
}
```

## Memory

Memory is where nodes are present. In the app's lifetime, there is only one memory manager singleton, which holds a `memoryRecord`. That memory record does all the heavy work and stores all nodes in `ArrayRepresentation` for the binary tree.

Example:
![alt text](image.png)

```ts
/**
 * The architecture is a simple binary tree.
 * The left node is the next block.
 * The right node is the nested block.
 * If there is no nested block, the right node is null.
 */

// A record of blocks using Binary Tree structure
export interface MemoryRecordInterface {
  /**
   * Root level HEAD node ID
   */
  get HEAD_ID(): NodeID | null;
  /**
   * Root level TAIL node ID
   */
  get TAIL_ID(): NodeID | null;

  /**
   * Adds a node to the end of the memory record
   * @param node
   */
  appendNewNode(node: EntityNodeInterface): MemoryRecordInterface;

  /**
   * Puts a block as a child of the target block
   * @param parentID
   * @param newNode
   */
  nestNewNodeBelow(
    parentID: NodeID,
    newNode: EntityNodeInterface,
  ): MemoryRecordInterface;

  /**
   * Adds a node below the target node
   * @param parentID - null means root level
   * @param newNode
   */
  appendNewNodeBelow(
    parentID: NodeID | null,
    newNode: EntityNodeInterface,
  ): MemoryRecordInterface;

  // Working with existing nodes

  /**
   * Adds multiple nodes below the target node
   * @param parentID - null means root level
   * @param nodesIDs
   */
  appendNodesBelow(
    parentID: NodeID | null,
    nodesIDs: NodeID[],
  ): MemoryRecordInterface;

  /**
   * Puts a block as a child of the target block
   * @param parentID - null means root level
   * @param nodesIDs
   */
  nestNodes(parentID: NodeID | null, nodesIDs: NodeID[]): MemoryRecordInterface;

  /**
   * Removes nodes by their IDs
   * @param nodesIDs
   */
  removeNodes(nodesIDs: NodeID[]): MemoryRecordInterface;

  /**
   * Gets nodes by their IDs
   * @param IDs
   */
  getNodesById(IDs: NodeID[]): EntityNodeInterface[];

  exportJSON(): string;
}

export type NodeID = number;
```

The `ArrayRepresentation` is how we can store and rebuild the document again.

The rules are simple:

- The first item in the array is the root node.

About `exportJSON`, it exports the array representation in the form of an array of nodes instead of just IDs. This is for portability.

## Container

Containers are what the **_Renderer_** gives us on the screen. They are wrappers over the nodes.

![alt text](image-1.png)

## Putting It All Together

This is how it should work so far:

![alt text](image-2.png)
