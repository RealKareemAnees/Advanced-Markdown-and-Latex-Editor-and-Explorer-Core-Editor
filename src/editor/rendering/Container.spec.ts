// /**
//  * Unit tests for Container class
//  * Tests container initialization, rendering, drag-and-drop functionality,
//  * and proper cleanup on destroy.
//  */

// import { Container } from "../../editor/rendering/Container";
// import type { NodeInterface } from "../../types/Node.interface";
// import type { BlockEntityInterface } from "../../types/BlockEntity.interface";
// import { BlockTypesEnum } from "../../types/BlockTypes.enum";

// /**
//  * Creates a mock BlockEntity for testing
//  * Note: BlockEntityInterface only contains data properties (TYPE, DATA, OPTIONS, CONVERTIBLE)
//  * HTML rendering is handled separately by the rendering system
//  * @param {BlockTypesEnum} type - The block type
//  * @param {string} data - The block data
//  * @returns {BlockEntityInterface} A mock entity
//  */
// function createMockEntity(
//     type: BlockTypesEnum = BlockTypesEnum.PARAGRAPH,
//     data: string = "test content",
// ): BlockEntityInterface {
//     return {
//         TYPE: type,
//         DATA: data,
//         OPTIONS: {},
//         CONVERTIBLE: true,
//     } as BlockEntityInterface;
// }

// /**
//  * Creates a mock Node for testing
//  * @param {number} id - The node ID
//  * @param {BlockEntityInterface} entity - The entity for the node
//  * @returns {NodeInterface} A mock node
//  */
// function createMockNode(
//     id: number = 1,
//     entity: BlockEntityInterface | null = null,
// ): NodeInterface {
//     return {
//         ID: id,
//         ENTITY: entity ?? createMockEntity(),
//         parentNodeID: null,
//         leftNodeID: null,
//         rightNodeID: null,
//     } as NodeInterface;
// }

// /**
//  * Creates a mock DragEvent for testing
//  * @param {string} type - The event type
//  * @param {Partial<DragEvent>} overrides - Additional properties
//  * @returns {DragEvent} A mock drag event
//  */
// function createMockDragEvent(
//     type: string,
//     overrides: Partial<DragEvent> = {},
// ): DragEvent {
//     const event = new Event(type, {
//         bubbles: true,
//         cancelable: true,
//     }) as DragEvent;

//     // Add dataTransfer mock
//     Object.defineProperty(event, "dataTransfer", {
//         value: {
//             effectAllowed: "none",
//             setData: jest.fn(),
//             getData: jest.fn(),
//         },
//         writable: true,
//     });

//     // Add client coordinates for position-based tests
//     Object.defineProperty(event, "clientX", {
//         value: overrides.clientX ?? 0,
//         writable: true,
//     });

//     Object.defineProperty(event, "clientY", {
//         value: overrides.clientY ?? 0,
//         writable: true,
//     });

//     // Add relatedTarget for dragleave tests
//     Object.defineProperty(event, "relatedTarget", {
//         value: overrides.relatedTarget ?? null,
//         writable: true,
//     });

//     return event;
// }

// describe("Container", () => {
//     // Clean up DOM and static state after each test
//     afterEach(() => {
//         document.body.innerHTML = "";
//         // Remove injected styles
//         const styleElement = document.getElementById(
//             "container-component-styles",
//         );
//         if (styleElement) {
//             styleElement.remove();
//         }
//         // Reset any dragged container state by triggering dragend if needed
//         // This ensures tests are isolated
//         if (Container.DRAGGED_CONTAINER) {
//             Container.DRAGGED_CONTAINER.HTML_ELEMENT?.dispatchEvent(
//                 new Event("dragend", { bubbles: true }),
//             );
//         }
//     });

//     // =========================================================================
//     // Initialization and Construction Tests
//     // =========================================================================

//     describe("Initialization and Construction", () => {
//         it("should construct with a node parameter", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             expect(container).toBeInstanceOf(Container);
//             expect(container.NODE).toBe(node);
//         });

//         it("should create the main HTML element", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             expect(container.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
//             expect(container.HTML_ELEMENT.tagName).toBe("DIV");
//         });

//         it("should apply the CONTAINER class to the main element", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             expect(container.HTML_ELEMENT.classList.contains("CONTAINER")).toBe(
//                 true,
//             );
//         });

//         it("should set draggable attribute to true", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             expect(container.HTML_ELEMENT.draggable).toBe(true);
//         });

//         it("should set appropriate ARIA attributes", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             expect(container.HTML_ELEMENT.getAttribute("role")).toBe(
//                 "listitem",
//             );
//             expect(container.HTML_ELEMENT.getAttribute("aria-grabbed")).toBe(
//                 "false",
//             );
//         });

//         it("should initialize ORDER to 0 by default", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             expect(container.ORDER).toBe(0);
//         });

//         it("should create content wrapper element", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             const contentWrapper = container.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__CONTENT",
//             );
//             expect(contentWrapper).not.toBeNull();
//         });

//         it("should create left drop zone element", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             const leftZone = container.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--left",
//             );
//             expect(leftZone).not.toBeNull();
//         });

//         it("should create right drop zone element", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             const rightZone = container.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--right",
//             );
//             expect(rightZone).not.toBeNull();
//         });

//         it("should inject styles into document head", () => {
//             const node = createMockNode();
//             new Container(node);

//             const styleElement = document.getElementById(
//                 "container-component-styles",
//             );
//             expect(styleElement).not.toBeNull();
//             expect(styleElement?.tagName).toBe("STYLE");
//         });

//         it("should only inject styles once for multiple containers", () => {
//             const node1 = createMockNode(1);
//             const node2 = createMockNode(2);

//             new Container(node1);
//             new Container(node2);

//             const styleElements = document.querySelectorAll(
//                 "#container-component-styles",
//             );
//             expect(styleElements.length).toBe(1);
//         });
//     });

//     // =========================================================================
//     // ORDER Property Tests
//     // =========================================================================

//     describe("ORDER Property", () => {
//         it("should get ORDER value", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             expect(container.ORDER).toBe(0);
//         });

//         it("should set ORDER value", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             container.ORDER = 5;
//             expect(container.ORDER).toBe(5);
//         });

//         it("should allow negative ORDER values", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             container.ORDER = -3;
//             expect(container.ORDER).toBe(-3);
//         });
//     });

//     // =========================================================================
//     // NODE Property Tests
//     // =========================================================================

//     describe("NODE Property", () => {
//         it("should return the node passed in constructor", () => {
//             const node = createMockNode(42);
//             const container = new Container(node);

//             expect(container.NODE).toBe(node);
//             expect(container.NODE.ID).toBe(42);
//         });
//     });

//     // =========================================================================
//     // HTML_ELEMENT Property Tests
//     // =========================================================================

//     describe("HTML_ELEMENT Property", () => {
//         it("should return the main container element", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             expect(container.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
//         });

//         it("should have correct child structure", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             // Should have 3 children: content wrapper, left zone, right zone
//             expect(container.HTML_ELEMENT.children.length).toBe(3);
//         });
//     });

//     // =========================================================================
//     // render() Method Tests
//     // =========================================================================

//     describe("render() Method", () => {
//         it("should return the container instance for chaining", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             const result = container.render();
//             expect(result).toBe(container);
//         });

//         it("should expose CONTENT_WRAPPER for external rendering", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             container.render();

//             // CONTENT_WRAPPER should be available for the rendering system to append content
//             expect(container.CONTENT_WRAPPER).toBeInstanceOf(HTMLElement);
//             expect(
//                 container.CONTENT_WRAPPER.classList.contains(
//                     "CONTAINER__CONTENT",
//                 ),
//             ).toBe(true);
//         });

//         it("should handle node without entity gracefully", () => {
//             const node = {
//                 ID: 1,
//                 ENTITY: null,
//                 parentNodeID: null,
//                 leftNodeID: null,
//                 rightNodeID: null,
//             } as unknown as NodeInterface;

//             const container = new Container(node);

//             // Should not throw
//             expect(() => container.render()).not.toThrow();
//         });

//         it("should allow external content to be appended to CONTENT_WRAPPER", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             container.render();

//             // Simulate external rendering system appending content
//             const externalContent = document.createElement("p");
//             externalContent.textContent = "External content";
//             container.CONTENT_WRAPPER.appendChild(externalContent);

//             expect(container.CONTENT_WRAPPER.contains(externalContent)).toBe(
//                 true,
//             );
//         });
//     });

//     // =========================================================================
//     // distroy() Method Tests
//     // =========================================================================

//     describe("distroy() Method", () => {
//         it("should remove the element from the DOM", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             document.body.appendChild(container.HTML_ELEMENT);
//             expect(document.body.contains(container.HTML_ELEMENT)).toBe(true);

//             container.distroy();
//             expect(document.body.contains(container.HTML_ELEMENT)).toBe(false);
//         });

//         it("should handle element not in DOM gracefully", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             // Element is not in DOM
//             expect(() => container.distroy()).not.toThrow();
//         });

//         it("should clean up HTML_ELEMENT reference", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             container.distroy();

//             // HTML_ELEMENT should be nullified
//             expect(container.HTML_ELEMENT).toBeNull();
//         });
//     });

//     // =========================================================================
//     // Drag Start Event Tests
//     // =========================================================================

//     describe("Drag Start Event", () => {
//         it("should add dragging class on dragstart", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             const event = createMockDragEvent("dragstart");
//             container.HTML_ELEMENT.dispatchEvent(event);

//             expect(
//                 container.HTML_ELEMENT.classList.contains(
//                     "CONTAINER--dragging",
//                 ),
//             ).toBe(true);
//         });

//         it("should set aria-grabbed to true on dragstart", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             const event = createMockDragEvent("dragstart");
//             container.HTML_ELEMENT.dispatchEvent(event);

//             expect(container.HTML_ELEMENT.getAttribute("aria-grabbed")).toBe(
//                 "true",
//             );
//         });

//         it("should set DRAGGED_CONTAINER static reference", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             const event = createMockDragEvent("dragstart");
//             container.HTML_ELEMENT.dispatchEvent(event);

//             expect(Container.DRAGGED_CONTAINER).toBe(container);
//         });

//         it("should set dataTransfer effectAllowed to move", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             const event = createMockDragEvent("dragstart");
//             container.HTML_ELEMENT.dispatchEvent(event);

//             expect(event.dataTransfer?.effectAllowed).toBe("move");
//         });
//     });

//     // =========================================================================
//     // Drag End Event Tests
//     // =========================================================================

//     describe("Drag End Event", () => {
//         it("should remove dragging class on dragend", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             // First trigger dragstart
//             const startEvent = createMockDragEvent("dragstart");
//             container.HTML_ELEMENT.dispatchEvent(startEvent);

//             // Then trigger dragend
//             const endEvent = createMockDragEvent("dragend");
//             container.HTML_ELEMENT.dispatchEvent(endEvent);

//             expect(
//                 container.HTML_ELEMENT.classList.contains(
//                     "CONTAINER--dragging",
//                 ),
//             ).toBe(false);
//         });

//         it("should set aria-grabbed to false on dragend", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             // Trigger dragstart then dragend
//             container.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragstart"),
//             );
//             container.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragend"),
//             );

//             expect(container.HTML_ELEMENT.getAttribute("aria-grabbed")).toBe(
//                 "false",
//             );
//         });

//         it("should clear DRAGGED_CONTAINER static reference on dragend", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             container.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragstart"),
//             );
//             container.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragend"),
//             );

//             expect(Container.DRAGGED_CONTAINER).toBeNull();
//         });

//         it("should clear drop zone highlights on dragend", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             const leftZone = container.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--left",
//             );
//             const rightZone = container.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--right",
//             );

//             // Manually add active class to simulate highlighted state
//             leftZone?.classList.add("CONTAINER__drop-zone--active");

//             container.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragend"),
//             );

//             expect(
//                 leftZone?.classList.contains("CONTAINER__drop-zone--active"),
//             ).toBe(false);
//             expect(
//                 rightZone?.classList.contains("CONTAINER__drop-zone--active"),
//             ).toBe(false);
//         });
//     });

//     // =========================================================================
//     // Drag Over Event Tests
//     // =========================================================================

//     describe("Drag Over Event", () => {
//         it("should not highlight if no element is being dragged", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             // Mock getBoundingClientRect
//             jest.spyOn(
//                 container.HTML_ELEMENT,
//                 "getBoundingClientRect",
//             ).mockReturnValue({
//                 left: 0,
//                 right: 100,
//                 width: 100,
//                 top: 0,
//                 bottom: 50,
//                 height: 50,
//                 x: 0,
//                 y: 0,
//                 toJSON: () => ({}),
//             });

//             const event = createMockDragEvent("dragover", { clientX: 50 });
//             container.HTML_ELEMENT.dispatchEvent(event);

//             const leftZone = container.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--left",
//             );
//             const rightZone = container.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--right",
//             );

//             expect(
//                 leftZone?.classList.contains("CONTAINER__drop-zone--active"),
//             ).toBe(false);
//             expect(
//                 rightZone?.classList.contains("CONTAINER__drop-zone--active"),
//             ).toBe(false);
//         });

//         it("should not highlight if dragging over itself", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             // Start dragging this container
//             container.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragstart"),
//             );

//             // Mock getBoundingClientRect
//             jest.spyOn(
//                 container.HTML_ELEMENT,
//                 "getBoundingClientRect",
//             ).mockReturnValue({
//                 left: 0,
//                 right: 100,
//                 width: 100,
//                 top: 0,
//                 bottom: 50,
//                 height: 50,
//                 x: 0,
//                 y: 0,
//                 toJSON: () => ({}),
//             });

//             const event = createMockDragEvent("dragover", { clientX: 50 });
//             container.HTML_ELEMENT.dispatchEvent(event);

//             const rightZone = container.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--right",
//             );
//             expect(
//                 rightZone?.classList.contains("CONTAINER__drop-zone--active"),
//             ).toBe(false);
//         });

//         it("should highlight left zone when dragging over left 25% of target", () => {
//             const sourceNode = createMockNode(1);
//             const targetNode = createMockNode(2);
//             const sourceContainer = new Container(sourceNode);
//             const targetContainer = new Container(targetNode);

//             // Start dragging source container
//             sourceContainer.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragstart"),
//             );

//             // Mock getBoundingClientRect for target
//             jest.spyOn(
//                 targetContainer.HTML_ELEMENT,
//                 "getBoundingClientRect",
//             ).mockReturnValue({
//                 left: 0,
//                 right: 100,
//                 width: 100,
//                 top: 0,
//                 bottom: 50,
//                 height: 50,
//                 x: 0,
//                 y: 0,
//                 toJSON: () => ({}),
//             });

//             // Drag over left 10% of target (within left quarter)
//             const event = createMockDragEvent("dragover", { clientX: 10 });
//             targetContainer.HTML_ELEMENT.dispatchEvent(event);

//             const leftZone = targetContainer.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--left",
//             );
//             const rightZone = targetContainer.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--right",
//             );

//             expect(
//                 leftZone?.classList.contains("CONTAINER__drop-zone--active"),
//             ).toBe(true);
//             expect(
//                 rightZone?.classList.contains("CONTAINER__drop-zone--active"),
//             ).toBe(false);
//         });

//         it("should highlight right zone when dragging over right 75% of target", () => {
//             const sourceNode = createMockNode(1);
//             const targetNode = createMockNode(2);
//             const sourceContainer = new Container(sourceNode);
//             const targetContainer = new Container(targetNode);

//             // Start dragging source container
//             sourceContainer.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragstart"),
//             );

//             // Mock getBoundingClientRect for target
//             jest.spyOn(
//                 targetContainer.HTML_ELEMENT,
//                 "getBoundingClientRect",
//             ).mockReturnValue({
//                 left: 0,
//                 right: 100,
//                 width: 100,
//                 top: 0,
//                 bottom: 50,
//                 height: 50,
//                 x: 0,
//                 y: 0,
//                 toJSON: () => ({}),
//             });

//             // Drag over right side (50% of width)
//             const event = createMockDragEvent("dragover", { clientX: 50 });
//             targetContainer.HTML_ELEMENT.dispatchEvent(event);

//             const leftZone = targetContainer.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--left",
//             );
//             const rightZone = targetContainer.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--right",
//             );

//             expect(
//                 leftZone?.classList.contains("CONTAINER__drop-zone--active"),
//             ).toBe(false);
//             expect(
//                 rightZone?.classList.contains("CONTAINER__drop-zone--active"),
//             ).toBe(true);
//         });

//         it("should highlight right zone at exactly 25% boundary", () => {
//             const sourceNode = createMockNode(1);
//             const targetNode = createMockNode(2);
//             const sourceContainer = new Container(sourceNode);
//             const targetContainer = new Container(targetNode);

//             sourceContainer.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragstart"),
//             );

//             jest.spyOn(
//                 targetContainer.HTML_ELEMENT,
//                 "getBoundingClientRect",
//             ).mockReturnValue({
//                 left: 0,
//                 right: 100,
//                 width: 100,
//                 top: 0,
//                 bottom: 50,
//                 height: 50,
//                 x: 0,
//                 y: 0,
//                 toJSON: () => ({}),
//             });

//             // Exactly at 25% boundary
//             const event = createMockDragEvent("dragover", { clientX: 25 });
//             targetContainer.HTML_ELEMENT.dispatchEvent(event);

//             const rightZone = targetContainer.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--right",
//             );
//             expect(
//                 rightZone?.classList.contains("CONTAINER__drop-zone--active"),
//             ).toBe(true);
//         });
//     });

//     // =========================================================================
//     // Drag Leave Event Tests
//     // =========================================================================

//     describe("Drag Leave Event", () => {
//         it("should clear highlights when leaving container", () => {
//             const sourceNode = createMockNode(1);
//             const targetNode = createMockNode(2);
//             const sourceContainer = new Container(sourceNode);
//             const targetContainer = new Container(targetNode);

//             // Setup drag
//             sourceContainer.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragstart"),
//             );

//             // Manually add active class
//             const leftZone = targetContainer.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--left",
//             );
//             leftZone?.classList.add("CONTAINER__drop-zone--active");

//             // Trigger drag leave with relatedTarget outside container
//             const externalElement = document.createElement("div");
//             const leaveEvent = createMockDragEvent("dragleave", {
//                 relatedTarget: externalElement,
//             });
//             targetContainer.HTML_ELEMENT.dispatchEvent(leaveEvent);

//             expect(
//                 leftZone?.classList.contains("CONTAINER__drop-zone--active"),
//             ).toBe(false);
//         });

//         it("should not clear highlights when moving between child elements", () => {
//             const sourceNode = createMockNode(1);
//             const targetNode = createMockNode(2);
//             const sourceContainer = new Container(sourceNode);
//             const targetContainer = new Container(targetNode);

//             // Setup drag
//             sourceContainer.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragstart"),
//             );

//             // Manually add active class
//             const leftZone = targetContainer.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--left",
//             );
//             leftZone?.classList.add("CONTAINER__drop-zone--active");

//             // Trigger drag leave with relatedTarget inside container (content wrapper)
//             const contentWrapper = targetContainer.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__CONTENT",
//             );
//             const leaveEvent = createMockDragEvent("dragleave", {
//                 relatedTarget: contentWrapper,
//             });
//             targetContainer.HTML_ELEMENT.dispatchEvent(leaveEvent);

//             // Should NOT clear because relatedTarget is inside the container
//             expect(
//                 leftZone?.classList.contains("CONTAINER__drop-zone--active"),
//             ).toBe(true);
//         });
//     });

//     // =========================================================================
//     // Drop Event Tests
//     // =========================================================================

//     describe("Drop Event", () => {
//         it("should clear highlights on drop", () => {
//             const sourceNode = createMockNode(1);
//             const targetNode = createMockNode(2);
//             const sourceContainer = new Container(sourceNode);
//             const targetContainer = new Container(targetNode);

//             // Setup drag
//             sourceContainer.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragstart"),
//             );

//             // Manually add active class
//             const leftZone = targetContainer.HTML_ELEMENT.querySelector(
//                 ".CONTAINER__drop-zone--left",
//             );
//             leftZone?.classList.add("CONTAINER__drop-zone--active");

//             // Trigger drop
//             const dropEvent = createMockDragEvent("drop");
//             targetContainer.HTML_ELEMENT.dispatchEvent(dropEvent);

//             expect(
//                 leftZone?.classList.contains("CONTAINER__drop-zone--active"),
//             ).toBe(false);
//         });

//         it("should log drop event (placeholder for future implementation)", () => {
//             const consoleSpy = jest.spyOn(console, "log").mockImplementation();

//             const sourceNode = createMockNode(1);
//             const targetNode = createMockNode(2);
//             const sourceContainer = new Container(sourceNode);
//             const targetContainer = new Container(targetNode);

//             sourceContainer.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragstart"),
//             );

//             const dropEvent = createMockDragEvent("drop");
//             targetContainer.HTML_ELEMENT.dispatchEvent(dropEvent);

//             expect(consoleSpy).toHaveBeenCalled();
//             consoleSpy.mockRestore();
//         });
//     });

//     // =========================================================================
//     // Static DRAGGED_CONTAINER Property Tests
//     // =========================================================================

//     describe("Static DRAGGED_CONTAINER Property", () => {
//         it("should be null initially", () => {
//             expect(Container.DRAGGED_CONTAINER).toBeNull();
//         });

//         it("should return the currently dragged container", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             container.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragstart"),
//             );

//             expect(Container.DRAGGED_CONTAINER).toBe(container);

//             // Cleanup
//             container.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragend"),
//             );
//         });
//     });

//     // =========================================================================
//     // CSS Styles Injection Tests
//     // =========================================================================

//     describe("CSS Styles Injection", () => {
//         it("should inject styles with correct ID", () => {
//             const node = createMockNode();
//             new Container(node);

//             const styleElement = document.getElementById(
//                 "container-component-styles",
//             );
//             expect(styleElement).not.toBeNull();
//         });

//         it("should include CONTAINER class styles", () => {
//             const node = createMockNode();
//             new Container(node);

//             const styleElement = document.getElementById(
//                 "container-component-styles",
//             );
//             expect(styleElement?.textContent).toContain(".CONTAINER");
//         });

//         it("should include drop zone styles", () => {
//             const node = createMockNode();
//             new Container(node);

//             const styleElement = document.getElementById(
//                 "container-component-styles",
//             );
//             expect(styleElement?.textContent).toContain(
//                 ".CONTAINER__drop-zone--left",
//             );
//             expect(styleElement?.textContent).toContain(
//                 ".CONTAINER__drop-zone--right",
//             );
//         });

//         it("should include active state styles", () => {
//             const node = createMockNode();
//             new Container(node);

//             const styleElement = document.getElementById(
//                 "container-component-styles",
//             );
//             expect(styleElement?.textContent).toContain(
//                 ".CONTAINER__drop-zone--active",
//             );
//         });

//         it("should reference CSS variables for theming", () => {
//             const node = createMockNode();
//             new Container(node);

//             const styleElement = document.getElementById(
//                 "container-component-styles",
//             );
//             expect(styleElement?.textContent).toContain("var(--");
//             expect(styleElement?.textContent).toContain("--accent-primary");
//         });
//     });

//     // =========================================================================
//     // Integration Tests
//     // =========================================================================

//     describe("Integration Tests", () => {
//         it("should work with multiple containers", () => {
//             const containers: Container[] = [];

//             for (let i = 0; i < 5; i++) {
//                 const node = createMockNode(i);
//                 const container = new Container(node);
//                 container.ORDER = i;
//                 containers.push(container);
//             }

//             expect(containers.length).toBe(5);
//             containers.forEach((container, index) => {
//                 expect(container.ORDER).toBe(index);
//                 expect(container.NODE.ID).toBe(index);
//             });
//         });

//         it("should allow chained render calls", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             const result = container.render();
//             expect(result).toBe(container);

//             // Can chain another call
//             expect(result.render()).toBe(container);
//         });

//         it("should properly clean up on destroy", () => {
//             const node = createMockNode();
//             const container = new Container(node);

//             document.body.appendChild(container.HTML_ELEMENT);

//             // Start a drag operation
//             container.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragstart"),
//             );
//             expect(Container.DRAGGED_CONTAINER).toBe(container);

//             // End drag before destroy
//             container.HTML_ELEMENT.dispatchEvent(
//                 createMockDragEvent("dragend"),
//             );

//             // Destroy
//             container.distroy();

//             expect(document.body.children.length).toBe(0);
//             expect(container.HTML_ELEMENT).toBeNull();
//         });
//     });
// });

describe("Container Component", () => {});
