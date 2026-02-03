/**
 * Node Entity Abstract
 *
 */

import type { BlockEntityInterface } from "../../types/BlockEntity.interface";
import type { NodeInterface } from "../../types/Node.interface";

export class Node implements NodeInterface {
    private _ENTITY!: BlockEntityInterface;

    private _ID: number;
    private _parentNodeID: number | null = null;
    private _leftNodeID: number | null = null;
    private _rightNodeID: number | null = null;

    /**
     * Get the underlying block entity
     *
     * @returns {BlockEntityInterface} The backing block entity instance
     */
    get ENTITY(): BlockEntityInterface {
        // Return the underlying entity reference
        return this._ENTITY;
    }

    /**
 

    /**
     * Get/Set the numeric ID on the underlying entity
     *
     * @returns {number} current ID
     */
    get ID(): number {
        return this._ID;
    }
    set ID(id: number) {
        // Update both local cache and underlying entity
        this._ID = id;
    }

    get parentNodeID(): number | null {
        return this._parentNodeID;
    }

    set parentNodeID(id: number | null) {
        this._parentNodeID = id;
    }

    get leftNodeID(): number | null {
        return this._leftNodeID;
    }

    set leftNodeID(id: number | null) {
        this._leftNodeID = id;
    }

    get rightNodeID(): number | null {
        return this._rightNodeID;
    }

    set rightNodeID(id: number | null) {
        this._rightNodeID = id;
    }

    constructor(
        iD = 0,
        parentNodeID: number | null = null,
        entity: BlockEntityInterface | null = null,
    ) {
        this._ID = iD;
        this._parentNodeID = parentNodeID;
        this._ENTITY = entity as BlockEntityInterface;
    }
}
