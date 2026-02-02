import type { NodeInterface } from "./Node.interface";

/**
 * the interface for Memory
 * the memory is responsible for managing the relationships between nodes and their order
 * all operations that change the order or relationships between nodes should be handled by the memory
 */
export interface MemoryInterface {
    /**
     * this is array of node ids representing the order of nodes in memory
     */
    get ArrayRepresentation(): NodeInterface[];

    get HEAD_NODE_ID(): number | null;
    get TAIL_NODE_ID(): number | null;

    /**
     * get a node by its ID
     *
     * @param {number} nodeID - the id of the node to get
     * @returns {NodeInterface | null} - the node with the given id or null if not found
     */
    getNodeByID(nodeID: number): NodeInterface | null;

    /**
     * delete a node from memory
     *
     * @param {number} nodeID - the id of the node to delete
     */
    deleteNode(nodeID: number): MemoryInterface;

    /**
     * deletes multiple nodes from memory, no matter where they are deleting a node deletes its children as well
     * @param nodeIDs
     */
    deleteMultipleNodes(nodeIDs: number[]): MemoryInterface;

    /**
     * append a node to the end of memory, very often task
     * @param node
     */
    appendNode(node: NodeInterface): MemoryInterface;

    /**
     * insert a node below a target node
     * @param node
     * @param targetNodeID
     */
    insertNodeBelow(node: NodeInterface, targetNodeID: number): MemoryInterface;

    /**
     * insert multiple nodes below a target node
     * @param nodes
     * @param targetNodeID
     */
    insertMultipleNodesBelow(
        nodes: NodeInterface[],
        targetNodeID: number,
    ): MemoryInterface;

    /**
     * move a node below a target node
     * @param nodeID
     * @param targetNodeID
     */
    moveNodeBelow(nodeID: number, targetNodeID: number): MemoryInterface;

    /**
     * move multiple nodes below a target node
     * @param nodeIDs
     * @param targetNodeID
     */
    moveMultipleNodesBelow(
        nodeIDs: number[],
        targetNodeID: number,
    ): MemoryInterface;

    /**
     * create and insert a child node to a target node
     * @param node
     * @param targetNodeID
     */
    insertChildNode(node: NodeInterface, targetNodeID: number): MemoryInterface;

    /**
     * append a child node to a parent node
     * @param parentNodeID
     * @param childNodeID
     */
    appendChildNode(parentNodeID: number, childNodeID: number): MemoryInterface;

    /**
     * append multiple child nodes to a parent node
     * @param parentNodeID
     * @param childNodeIDs
     */
    appendMultipleChildNodes(
        parentNodeID: number,
        childNodeIDs: number[],
    ): MemoryInterface;

    /**
     * Duplicate a node in memory, inserting the copy directly below the original
     * @param nodeID - The ID of the node to duplicate
     * @returns This memory instance for chaining
     */
    duplicateNode(nodeID: number): MemoryInterface;

    /**
     * Duplicate multiple nodes in memory
     * @param nodeIDs - Array of node IDs to duplicate
     * @returns This memory instance for chaining
     */
    duplicateMultipleNodes(nodeIDs: number[]): MemoryInterface;

    /**
     * Clear all nodes from memory, resetting to empty state
     * @returns This memory instance for chaining
     */
    clearMemory(): MemoryInterface;

    /**
     * Export the memory state as a JSON string for persistence
     * @returns JSON string representation of the memory
     */
    exportMemory(): string;
}
