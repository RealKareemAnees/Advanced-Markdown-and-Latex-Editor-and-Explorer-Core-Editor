/**
 * Memory.ts (Optimized)
 *
 * This class manages the in-memory storage and relationships between nodes in the document.
 * Nodes are stored in an array indexed by their ID for O(1) access.
 *
 * Node relationships:
 * - leftNodeID: Points to the next sibling block (directly below in document order)
 * - rightNodeID: Points to the first nested child block
 * - parentNodeID: Points to the block above (either parent or previous sibling)
 */

import type { MemoryInterface } from "../../types/Memory.interface";
import type { NodeInterface } from "../../types/Node.interface";
import { deleteNode, getFreeSpots, updateTailID } from "./lib";
import { Node } from "./Node";

export class Memory implements MemoryInterface {
    // ID of the first node in the document (root)
    private _headNodeID: number | null = null;

    // ID of the last node in the main chain (tail)
    private _tailNodeID: number | null = null;

    // Array-based store of nodes, indexed by node ID for O(1) access
    private _memory: (NodeInterface | null)[] = [];

    // Stack of freed node IDs available for reuse
    private _freeSpots: number[] = [];

    /**
     * Get the array representation of all nodes in memory
     * @returns Array of nodes (may contain null for deleted nodes)
     */
    get ArrayRepresentation(): (NodeInterface | null)[] {
        return this._memory;
    }

    /**
     * Get the ID of the head (first) node
     * @returns Head node ID or null if memory is empty
     */
    get HEAD_NODE_ID(): number | null {
        return this._headNodeID;
    }

    /**
     * Get the ID of the tail (last) node in the main chain
     * @returns Tail node ID or null if memory is empty
     */
    get TAIL_NODE_ID(): number | null {
        return this._tailNodeID;
    }

    update(memory: NodeInterface[]): MemoryInterface {
        this._memory = memory;
        this._freeSpots = [];
        this._headNodeID = null;
        this._tailNodeID = null;

        return this;
    }

    /**
     * Retrieves a node by its ID
     * @param nodeID - The ID of the node to retrieve
     * @returns The node if found, null otherwise
     */
    getNodeByID(nodeID: number): NodeInterface | null {
        // Single bounds check and return
        return nodeID >= 0 && nodeID < this._memory.length
            ? (this._memory[nodeID] ?? null)
            : null;
    }

    /**
     * Deletes a node and all its nested children from memory
     * Updates head/tail references and relinks surrounding nodes
     * @param nodeID - The ID of the node to delete
     * @returns This memory instance for chaining
     */
    deleteNode(nodeID: number): MemoryInterface {
        const memory = this._memory;
        const nodeToDelete = memory[nodeID];
        if (!nodeToDelete) return this;

        const tailID = this._tailNodeID;
        const headID = this._headNodeID;

        // Update tail reference if deleting the tail node
        if (nodeID === tailID) {
            this._tailNodeID =
                nodeToDelete.parentNodeID ??
                (headID !== null ? updateTailID(memory, headID) : null);
        }

        // Update head reference if deleting the head node
        if (nodeID === headID) {
            this._headNodeID = nodeToDelete.leftNodeID;
        }

        // Perform the actual deletion
        deleteNode(nodeID, memory, this._freeSpots);

        // Recalculate tail if it was deleted or is now invalid
        const currentTailID = this._tailNodeID;
        if (currentTailID !== null && memory[currentTailID] === null) {
            this._tailNodeID =
                this._headNodeID !== null
                    ? updateTailID(memory, this._headNodeID)
                    : null;
        }

        return this;
    }

    /**
     * Deletes multiple nodes from memory (optimized for batch operations)
     * @param nodeIDs - Array of node IDs to delete
     * @returns This memory instance for chaining
     */
    deleteMultipleNodes(nodeIDs: number[]): MemoryInterface {
        if (nodeIDs.length === 0) return this;

        const memory = this._memory;
        let headID = this._headNodeID;
        let tailID = this._tailNodeID;

        // Delete all nodes first
        for (let i = 0; i < nodeIDs.length; i++) {
            const nodeID = nodeIDs[i];
            const nodeToDelete = memory[nodeID];
            if (!nodeToDelete) continue;

            // Update head if deleting head node
            if (nodeID === headID) {
                headID = nodeToDelete.leftNodeID;
            }

            // Update tail tracking if deleting tail
            if (nodeID === tailID) {
                tailID = nodeToDelete.parentNodeID;
            }

            deleteNode(nodeID, memory, this._freeSpots);
        }

        this._headNodeID = headID;

        // Recalculate tail once after all deletions
        if (tailID !== null && memory[tailID] === null) {
            tailID = headID !== null ? updateTailID(memory, headID) : null;
        }
        this._tailNodeID = tailID;

        return this;
    }

    /**
     * Appends a node to the end of the document (after the current tail)
     * @param node - The node to append
     * @returns This memory instance for chaining
     */
    appendNode(node: NodeInterface): MemoryInterface {
        const memory = this._memory;
        const [freeSpot] = getFreeSpots(this._freeSpots, memory, 1);

        node.ID = freeSpot;
        memory[freeSpot] = node;

        const tailID = this._tailNodeID;

        // Link the new node to the current tail
        if (tailID !== null) {
            const tailNode = memory[tailID];
            if (tailNode) {
                tailNode.leftNodeID = freeSpot;
            }
            node.parentNodeID = tailID;
        }

        // Update head if this is the first node
        if (this._headNodeID === null) {
            this._headNodeID = freeSpot;
        }

        // Update the tail reference
        this._tailNodeID = freeSpot;

        return this;
    }

    /**
     * Inserts a node directly below (after) a target node
     * @param node - The node to insert
     * @param targetNodeID - The ID of the node to insert below
     * @returns This memory instance for chaining
     */
    insertNodeBelow(
        node: NodeInterface,
        targetNodeID: number,
    ): MemoryInterface {
        const memory = this._memory;
        const targetNode = memory[targetNodeID];
        if (!targetNode) return this;

        // If inserting after the tail, just append
        if (targetNodeID === this._tailNodeID) {
            return this.appendNode(node);
        }

        const [freeSpot] = getFreeSpots(this._freeSpots, memory, 1);
        node.ID = freeSpot;
        memory[freeSpot] = node;

        // Cache the old left node ID
        const oldLeftID = targetNode.leftNodeID;

        // Link the new node to the target node
        node.parentNodeID = targetNodeID;
        targetNode.leftNodeID = freeSpot;

        // Link the old left node to the new node
        if (oldLeftID !== null) {
            const oldLeftNode = memory[oldLeftID];
            if (oldLeftNode) {
                node.leftNodeID = oldLeftID;
                oldLeftNode.parentNodeID = freeSpot;
            }
        }

        return this;
    }

    /**
     * Inserts multiple nodes below a target node (in order)
     * @param nodes - Array of nodes to insert
     * @param targetNodeID - The ID of the node to insert below
     * @returns This memory instance for chaining
     */
    insertMultipleNodesBelow(
        nodes: NodeInterface[],
        targetNodeID: number,
    ): MemoryInterface {
        let currentTargetID = targetNodeID;
        for (let i = 0; i < nodes.length; i++) {
            this.insertNodeBelow(nodes[i], currentTargetID);
            currentTargetID = nodes[i].ID;
        }
        return this;
    }

    /**
     * Moves an existing node to a position below a target node
     * @param nodeID - The ID of the node to move
     * @param targetNodeID - The ID of the node to move below
     * @returns This memory instance for chaining
     */
    moveNodeBelow(nodeID: number, targetNodeID: number): MemoryInterface {
        const sourceNode = this._memory[nodeID];
        if (!sourceNode) return this;

        // Create a new node with the same entity
        const node = new Node(0, null, sourceNode.ENTITY);

        // Delete the original node first
        this.deleteNode(nodeID);

        // Insert the new node below target
        this.insertNodeBelow(node, targetNodeID);

        return this;
    }

    /**
     * Moves multiple nodes below a target node (in order)
     * @param nodeIDs - Array of node IDs to move
     * @param targetNodeID - The ID of the node to move below
     * @returns This memory instance for chaining
     */
    moveMultipleNodesBelow(
        nodeIDs: number[],
        targetNodeID: number,
    ): MemoryInterface {
        const memory = this._memory;
        let currentTargetID = targetNodeID;

        for (let i = 0; i < nodeIDs.length; i++) {
            const nodeID = nodeIDs[i];
            const sourceNode = memory[nodeID];
            if (!sourceNode) continue;

            const node = new Node(0, null, sourceNode.ENTITY);
            this.deleteNode(nodeID);
            this.insertNodeBelow(node, currentTargetID);
            currentTargetID = node.ID;
        }
        return this;
    }

    /**
     * Inserts a node as a child (nested) of a target node
     * @param node - The node to insert
     * @param targetNodeID - The ID of the parent node
     * @returns This memory instance for chaining
     */
    insertChildNode(
        node: NodeInterface,
        targetNodeID: number,
    ): MemoryInterface {
        const memory = this._memory;
        const targetNode = memory[targetNodeID];
        if (!targetNode) return this;

        const [freeSpot] = getFreeSpots(this._freeSpots, memory, 1);
        node.ID = freeSpot;
        memory[freeSpot] = node;

        // Cache the old right (child) node ID
        const oldRightID = targetNode.rightNodeID;

        // Link the new node as the right child of the target node
        node.parentNodeID = targetNodeID;
        targetNode.rightNodeID = freeSpot;

        // Push down the old right node as a sibling of the new node
        if (oldRightID !== null) {
            const oldRightNode = memory[oldRightID];
            if (oldRightNode) {
                node.leftNodeID = oldRightID;
                oldRightNode.parentNodeID = freeSpot;
            }
        }

        return this;
    }

    /**
     * Moves an existing node to become a child of a target node
     * Note: Parameter order matches interface (childNodeID, targetNodeID)
     * @param childNodeID - The ID of the node to move
     * @param targetNodeID - The ID of the new parent node
     * @returns This memory instance for chaining
     */
    appendChildNode(
        childNodeID: number,
        targetNodeID: number,
    ): MemoryInterface {
        const sourceNode = this._memory[childNodeID];
        if (!sourceNode) return this;

        // Create a new node with the same entity
        const node = new Node(0, null, sourceNode.ENTITY);

        // Delete the original node
        this.deleteNode(childNodeID);

        // Insert as child of target
        this.insertChildNode(node, targetNodeID);

        return this;
    }

    /**
     * Moves multiple nodes to become children of a parent node
     * @param parentNodeID - The ID of the new parent node
     * @param childNodeIDs - Array of node IDs to move as children
     * @returns This memory instance for chaining
     */
    appendMultipleChildNodes(
        parentNodeID: number,
        childNodeIDs: number[],
    ): MemoryInterface {
        for (let i = 0; i < childNodeIDs.length; i++) {
            this.appendChildNode(childNodeIDs[i], parentNodeID);
        }
        return this;
    }

    /**
     * Creates a duplicate of a node and inserts it directly below the original
     * @param nodeID - The ID of the node to duplicate
     * @returns This memory instance for chaining
     */
    duplicateNode(nodeID: number): MemoryInterface {
        const sourceNode = this._memory[nodeID];
        if (!sourceNode) return this;

        // Create a new node with the same entity
        const node = new Node(0, null, sourceNode.ENTITY);

        // Insert below the original node
        this.insertNodeBelow(node, nodeID);

        return this;
    }

    /**
     * Duplicates multiple nodes, inserting each copy below its original
     * @param nodeIDs - Array of node IDs to duplicate
     * @returns This memory instance for chaining
     */
    duplicateMultipleNodes(nodeIDs: number[]): MemoryInterface {
        for (let i = 0; i < nodeIDs.length; i++) {
            this.duplicateNode(nodeIDs[i]);
        }
        return this;
    }

    /**
     * Clears all nodes from memory, resetting to empty state
     * @returns This memory instance for chaining
     */
    clearMemory(): MemoryInterface {
        this._memory = [];
        this._freeSpots = [];
        this._headNodeID = null;
        this._tailNodeID = null;
        return this;
    }

    /**
     * Exports the memory state as a JSON string for persistence
     * @returns JSON string representation of the memory
     */
    exportMemory(): string {
        const memory = this._memory;
        const nodes = new Array(memory.length);

        for (let i = 0; i < memory.length; i++) {
            const node = memory[i];
            nodes[i] = node
                ? {
                      ID: node.ID,
                      DATA: node.ENTITY?.DATA ?? "",
                      TYPE: node.ENTITY?.TYPE ?? null,
                      OPTIONS: node.ENTITY?.OPTIONS ?? {},
                  }
                : null;
        }

        return JSON.stringify({
            headID: this._headNodeID,
            tailID: this._tailNodeID,
            nodes,
        });
    }
}
