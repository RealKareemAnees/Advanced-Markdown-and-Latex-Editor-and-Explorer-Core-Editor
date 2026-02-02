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
    get ArrayRepresentation(): number[];

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
    deleteNode(nodeID: number): void;

    /**
     * deletes multiple nodes from memory, no matter where they are deleting a node deletes its children as well
     * @param nodeIDs
     */
    deleteMultipleNodes(nodeIDs: number[]): void;

    /**
     * append a node to the end of memory, very often task
     * @param node
     */
    appendNode(node: NodeInterface): void;

    /**
     * insert a node below a target node
     * @param node
     * @param targetNode
     */
    insertNodeBelow(node: NodeInterface, targetNode: number): void;

    /**
     * insert multiple nodes below a target node
     * @param nodes
     * @param targetNode
     */
    insertMultipleNodesBelow(nodes: NodeInterface[], targetNode: number): void;

    /**
     * move a node below a target node
     * @param nodeID
     * @param targetNodeID
     */
    moveNodeBelow(nodeID: number, targetNodeID: number): void;

    /**
     * move multiple nodes below a target node
     * @param nodeIDs
     * @param targetNodeID
     */
    moveMultipleNodesBelow(nodeIDs: number[], targetNodeID: number): void;

    /**
     * create and insert a child node to a target node
     * @param node
     * @param targetNodeID
     */
    insertChildNode(node: NodeInterface, targetNodeID: number): void;

    /**
     * append a child node to a parent node
     * @param parentNodeID
     * @param childNodeID
     */
    appendChildNode(parentNodeID: number, childNodeID: number): void;

    /**
     * append multiple child nodes to a parent node
     * @param parentNodeID
     * @param childNodeIDs
     */
    appendMultipleChildNodes(
        parentNodeID: number,
        childNodeIDs: number[],
    ): void;

    /**
     * duplicate a node in memory
     * @param nodeID
     * @returns the id of the duplicated node
     */
    dublicateNode(nodeID: number): number;

    /**
     * clear all nodes from memory
     */
    clearMemory(): void;

    /**
     * export the memory as JSON string
     * @returns
     */
    exportMemory(): string;
}
