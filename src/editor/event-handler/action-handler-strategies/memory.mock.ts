import type { MemoryInterface } from "../../../types/Memory.interface";
import type { NodeInterface } from "../../../types/Node.interface";

export class MockMemory implements MemoryInterface {
    private _arr: NodeInterface[] = [];

    get ArrayRepresentation(): NodeInterface[] {
        return this._arr;
    }

    get HEAD_NODE_ID(): number | null {
        return null;
    }
    get TAIL_NODE_ID(): number | null {
        return null;
    }

    update(memory: NodeInterface[]): MemoryInterface {
        this._arr = memory;
        return this;
    }

    getNodeByID(_nodeID: number): NodeInterface | null {
        return null;
    }

    deleteNode(_nodeID: number): MemoryInterface {
        return this;
    }

    deleteMultipleNodes(_nodeIDs: number[]): MemoryInterface {
        return this;
    }

    appendNode(_node: NodeInterface): MemoryInterface {
        return this;
    }

    insertNodeBelow(
        _node: NodeInterface,
        _targetNodeID: number,
    ): MemoryInterface {
        return this;
    }

    insertMultipleNodesBelow(
        _nodes: NodeInterface[],
        _targetNodeID: number,
    ): MemoryInterface {
        return this;
    }

    moveNodeBelow(_nodeID: number, _targetNodeID: number): MemoryInterface {
        return this;
    }

    moveMultipleNodesBelow(
        _nodeIDs: number[],
        _targetNodeID: number,
    ): MemoryInterface {
        return this;
    }

    insertChildNode(
        _node: NodeInterface,
        _targetNodeID: number,
    ): MemoryInterface {
        return this;
    }

    appendChildNode(
        _parentNodeID: number,
        _childNodeID: number,
    ): MemoryInterface {
        return this;
    }

    appendMultipleChildNodes(
        _parentNodeID: number,
        _childNodeIDs: number[],
    ): MemoryInterface {
        return this;
    }

    duplicateNode(_nodeID: number): MemoryInterface {
        return this;
    }

    duplicateMultipleNodes(_nodeIDs: number[]): MemoryInterface {
        return this;
    }

    clearMemory(): MemoryInterface {
        this._arr = [];
        return this;
    }

    exportMemory(): string {
        return JSON.stringify(this._arr);
    }
}
