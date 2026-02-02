// src/engine/memory/Memory.ts

import type { MemoryInterface } from "../../types/Memory.interface";
import type { NodeInterface } from "../../types/Node.interface";
import { deleteNode, getFreeSpots, updateTailID } from "./lib";
import { Node } from "./Node";

export class Memory implements MemoryInterface {
    private _headNodeID: number | null = 0;
    private _tailNodeID: number | null = 0;

    // this is the store of node, nodes are arranged by ID in this array
    private _memory: NodeInterface[] = [];

    // store free spots for reuse
    private _freeSpots: number[] = [];

    get ArrayRepresentation(): NodeInterface[] {
        return this._memory;
    }

    get HEAD_NODE_ID(): number {
        return this._headNodeID as number;
    }

    get TAIL_NODE_ID(): number {
        return this._tailNodeID as number;
    }

    constructor(initialNode: NodeInterface = new Node(0)) {
        this._headNodeID = initialNode.ID;
        this._tailNodeID = initialNode.ID;
        this._memory.push(initialNode);
    }

    getNodeByID(nodeID: number): NodeInterface | null {
        return this._memory[nodeID] || null;
    }

    deleteNode(nodeID: number): MemoryInterface {
        if (nodeID === this._tailNodeID) {
            if (this._memory[nodeID].parentNodeID)
                this._tailNodeID = this._memory[nodeID].parentNodeID;
            else
                this._tailNodeID = updateTailID(
                    this._memory,
                    this._headNodeID as number,
                );
        }

        if (nodeID === this._headNodeID) {
            this._headNodeID = this._memory[nodeID].leftNodeID;
        }

        deleteNode(nodeID, this._memory, this._freeSpots);
        return this;
    }

    deleteMultipleNodes(nodeIDs: number[]): MemoryInterface {
        for (const nodeID of nodeIDs) {
            deleteNode(nodeID, this._memory, this._freeSpots);
        }

        this._tailNodeID = updateTailID(
            this._memory,
            this._headNodeID as number,
        );

        return this;
    }

    appendNode(node: NodeInterface): MemoryInterface {
        const [freeSpot] = getFreeSpots(this._freeSpots, this._memory, 1);
        this._memory[freeSpot] = node;

        // link the new node to the current tail
        node.parentNodeID = this._tailNodeID;

        // update the current tail to point to the new node
        if (this._tailNodeID !== null) {
            const tailNode = this._memory[this._tailNodeID];
            tailNode.leftNodeID = node.ID;
        }

        // update the tail reference
        this._tailNodeID = node.ID;

        return this;
    }

    insertNodeBelow(
        node: NodeInterface,
        targetNodeID: number,
    ): MemoryInterface {
        if (targetNodeID === this._tailNodeID) return this.appendNode(node);

        const oldLeftID = this._memory[targetNodeID].leftNodeID;
        const [freeSpot] = getFreeSpots(this._freeSpots, this._memory, 1);
        this._memory[freeSpot] = node;

        // link the new node to the target node
        node.parentNodeID = targetNodeID;
        this._memory[targetNodeID].leftNodeID = node.ID;

        // link the old left node to the new node
        if (oldLeftID !== null) {
            node.leftNodeID = oldLeftID;
            this._memory[oldLeftID].parentNodeID = node.ID;
        }

        return this;
    }

    insertMultipleNodesBelow(
        nodes: NodeInterface[],
        targetNodeID: number,
    ): MemoryInterface {
        for (const node of nodes) {
            this.insertNodeBelow(node, targetNodeID);
        }
        return this;
    }

    moveNodeBelow(nodeID: number, targetNodeID: number): MemoryInterface {
        const node = new Node(null, null, this._memory[nodeID].ENTITY);

        this.deleteNode(nodeID);

        this.insertNodeBelow(node, targetNodeID);

        return this;
    }

    moveMultipleNodesBelow(
        nodeIDs: number[],
        targetNodeID: number,
    ): MemoryInterface {
        for (const nodeID of nodeIDs) {
            this.moveNodeBelow(nodeID, targetNodeID);
        }
        return this;
    }

    insertChildNode(
        node: NodeInterface,
        targetNodeID: number,
    ): MemoryInterface {
        const oldRightID = this._memory[targetNodeID].rightNodeID;
        const [freeSpot] = getFreeSpots(this._freeSpots, this._memory, 1);

        this._memory[freeSpot] = node;
        node.ID = freeSpot;
        node.parentNodeID = targetNodeID;

        // link the new node as the right child of the target node

        this._memory[targetNodeID].rightNodeID = node.ID;

        // link the old right node to the new node
        if (oldRightID !== null) {
            node.leftNodeID = oldRightID;
            this._memory[oldRightID].parentNodeID = node.ID;
        }

        return this;
    }

    appendChildNode(
        childNodeID: number,
        targetNodeID: number,
    ): MemoryInterface {
        const node = new Node(null, null, this._memory[childNodeID].ENTITY);

        this.deleteNode(childNodeID);
        this.insertChildNode(node, targetNodeID);

        return this;
    }

    appendMultipleChildNodes(
        parentNodeID: number,
        childNodeIDs: number[],
    ): MemoryInterface {
        for (const childNodeID of childNodeIDs) {
            this.appendChildNode(childNodeID, parentNodeID);
        }
        return this;
    }

    dublicateNode(nodeID: number): MemoryInterface {
        const node = new Node(null, null, this._memory[nodeID].ENTITY);
        this.moveNodeBelow(node.ID, nodeID);
        return this;
    }

    dublicateMultipleNodes(nodeIDs: number[]): MemoryInterface {
        for (const nodeID of nodeIDs) {
            this.dublicateNode(nodeID);
        }
        return this;
    }

    clearMemory(): MemoryInterface {
        this._memory = [];
        this._freeSpots = [];
        this._headNodeID = null;
        this._tailNodeID = null;
        return this;
    }

    exportMemory(): string {
        const output = {
            headID: this._headNodeID, // important for reconstruction
            tailID: this._tailNodeID,
            nodes: this._memory.map((node) =>
                node
                    ? {
                          ID: node.ID,
                          DATA: node.ENTITY.DATA,
                          TYPE: node.ENTITY.TYPE,
                          OPTION: node.ENTITY.OPTIONS,
                      }
                    : null,
            ),
        };
        return JSON.stringify(output);
    }
}
