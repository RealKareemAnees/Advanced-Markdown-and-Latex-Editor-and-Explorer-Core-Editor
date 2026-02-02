/**
 * Memory.ts
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
    private _headNodeID: number | null = 0;

    // ID of the last node in the main chain (tail)
    private _tailNodeID: number | null = 0;

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

    /**
     * Creates a new Memory instance with an optional initial node
     * @param initialNode - The first node to add to memory (defaults to empty node at ID 0)
     */
    constructor(initialNode: NodeInterface = new Node(0)) {
        this._headNodeID = initialNode.ID;
        this._tailNodeID = initialNode.ID;
        this._memory[initialNode.ID] = initialNode;
    }

    /**
     * Retrieves a node by its ID
     * @param nodeID - The ID of the node to retrieve
     * @returns The node if found, null otherwise
     */
    getNodeByID(nodeID: number): NodeInterface | null {
        if (nodeID < 0 || nodeID >= this._memory.length) {
            return null;
        }
        return this._memory[nodeID] ?? null;
    }

    /**
     * Deletes a node and all its nested children from memory
     * Updates head/tail references and relinks surrounding nodes
     * @param nodeID - The ID of the node to delete
     * @returns This memory instance for chaining
     */
    deleteNode(nodeID: number): MemoryInterface {
        const nodeToDelete = this._memory[nodeID];
        if (!nodeToDelete) return this;

        // update tail reference if deleting the tail node
        if (nodeID === this._tailNodeID) {
            if (nodeToDelete.parentNodeID !== null) {
                this._tailNodeID = nodeToDelete.parentNodeID;
            } else {
                // recalculate tail from head
                this._tailNodeID =
                    this._headNodeID !== null
                        ? updateTailID(this._memory, this._headNodeID)
                        : null;
            }
        }

        // update head reference if deleting the head node
        if (nodeID === this._headNodeID) {
            this._headNodeID = nodeToDelete.leftNodeID;
        }

        // perform the actual deletion
        deleteNode(nodeID, this._memory, this._freeSpots);

        // recalculate tail if it was deleted or is now invalid
        if (
            this._tailNodeID !== null &&
            this._memory[this._tailNodeID] === null
        ) {
            this._tailNodeID =
                this._headNodeID !== null
                    ? updateTailID(this._memory, this._headNodeID)
                    : null;
        }

        return this;
    }

    /**
     * Deletes multiple nodes from memory
     * @param nodeIDs - Array of node IDs to delete
     * @returns This memory instance for chaining
     */
    deleteMultipleNodes(nodeIDs: number[]): MemoryInterface {
        for (const nodeID of nodeIDs) {
            this.deleteNode(nodeID);
        }
        return this;
    }

    /**
     * Appends a node to the end of the document (after the current tail)
     * @param node - The node to append
     * @returns This memory instance for chaining
     */
    appendNode(node: NodeInterface): MemoryInterface {
        // get a free spot and assign the node's ID
        const [freeSpot] = getFreeSpots(this._freeSpots, this._memory, 1);
        node.ID = freeSpot;
        this._memory[freeSpot] = node;

        // link the new node to the current tail
        node.parentNodeID = this._tailNodeID;

        // update the current tail to point to the new node
        if (this._tailNodeID !== null) {
            const tailNode = this._memory[this._tailNodeID];
            if (tailNode) {
                tailNode.leftNodeID = node.ID;
            }
        }

        // update head if this is the first node
        if (this._headNodeID === null) {
            this._headNodeID = node.ID;
        }

        // update the tail reference
        this._tailNodeID = node.ID;

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
        const targetNode = this._memory[targetNodeID];
        if (!targetNode) return this;

        // if inserting after the tail, just append
        if (targetNodeID === this._tailNodeID) {
            return this.appendNode(node);
        }

        // get a free spot and assign the node's ID
        const [freeSpot] = getFreeSpots(this._freeSpots, this._memory, 1);
        node.ID = freeSpot;
        this._memory[freeSpot] = node;

        // save reference to the old left node
        const oldLeftID = targetNode.leftNodeID;

        // link the new node to the target node
        node.parentNodeID = targetNodeID;
        targetNode.leftNodeID = node.ID;

        // link the old left node to the new node
        if (oldLeftID !== null) {
            const oldLeftNode = this._memory[oldLeftID];
            if (oldLeftNode) {
                node.leftNodeID = oldLeftID;
                oldLeftNode.parentNodeID = node.ID;
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
        for (const node of nodes) {
            this.insertNodeBelow(node, currentTargetID);
            // update target so next node is inserted after the one we just added
            currentTargetID = node.ID;
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

        // create a new node with the same entity
        const node = new Node(0, null, sourceNode.ENTITY);

        // delete the original node first
        this.deleteNode(nodeID);

        // insert the new node below target
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
        let currentTargetID = targetNodeID;
        for (const nodeID of nodeIDs) {
            const sourceNode = this._memory[nodeID];
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
        const targetNode = this._memory[targetNodeID];
        if (!targetNode) return this;

        // get a free spot and assign the node's ID
        const [freeSpot] = getFreeSpots(this._freeSpots, this._memory, 1);
        node.ID = freeSpot;
        this._memory[freeSpot] = node;

        // save reference to the old right (child) node
        const oldRightID = targetNode.rightNodeID;

        // link the new node as the right child of the target node
        node.parentNodeID = targetNodeID;
        targetNode.rightNodeID = node.ID;

        // push down the old right node as a sibling of the new node
        if (oldRightID !== null) {
            const oldRightNode = this._memory[oldRightID];
            if (oldRightNode) {
                node.leftNodeID = oldRightID;
                oldRightNode.parentNodeID = node.ID;
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

        // create a new node with the same entity
        const node = new Node(0, null, sourceNode.ENTITY);

        // delete the original node
        this.deleteNode(childNodeID);

        // insert as child of target
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
        for (const childNodeID of childNodeIDs) {
            this.appendChildNode(childNodeID, parentNodeID);
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

        // create a new node with the same entity
        const node = new Node(0, null, sourceNode.ENTITY);

        // insert below the original node
        this.insertNodeBelow(node, nodeID);

        return this;
    }

    /**
     * Duplicates multiple nodes, inserting each copy below its original
     * @param nodeIDs - Array of node IDs to duplicate
     * @returns This memory instance for chaining
     */
    duplicateMultipleNodes(nodeIDs: number[]): MemoryInterface {
        for (const nodeID of nodeIDs) {
            this.duplicateNode(nodeID);
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
        const output = {
            headID: this._headNodeID,
            tailID: this._tailNodeID,
            nodes: this._memory.map((node) =>
                node
                    ? {
                          ID: node.ID,
                          DATA: node.ENTITY?.DATA ?? "",
                          TYPE: node.ENTITY?.TYPE ?? null,
                          OPTIONS: node.ENTITY?.OPTIONS ?? {},
                      }
                    : null,
            ),
        };
        return JSON.stringify(output);
    }
}
