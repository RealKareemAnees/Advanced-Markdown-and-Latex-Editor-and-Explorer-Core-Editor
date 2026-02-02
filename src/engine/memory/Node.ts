/**
 * Node Entity Abstract
 *
 */

import type { BlockEntityInterface } from "../../types/BlockEntity.interface";
import type { BlockTypesEnum } from "../../types/BlockTypes.enum";
import type { NodeInterface } from "../../types/Node.interface";

export class Node implements NodeInterface {
    private _ENTITY!: BlockEntityInterface;

    private _ID: number;
    private _parentNodeID: number | null = null;
    private _leftNodeID: number | null = null;
    private _rightNodeID: number | null = null;

    get OPTIONS(): Record<string, unknown> {
        throw new Error("Method not implemented.");
    }
    set OPTIONS(options: Record<string, unknown>) {
        throw new Error("Method not implemented.");
    }

    readonly CONVERTIBLE: boolean;

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
     * Get/Set the block type on the underlying entity
     *
     * @returns {BlockTypesEnum} current block type
     */
    get TYPE(): BlockTypesEnum {
        // Delegate to underlying entity; cast to any to tolerate differing entity shapes
        return (this._ENTITY as any).TYPE;
    }
    set TYPE(type: BlockTypesEnum) {
        // Keep local and entity in sync where applicable
        this._ID = this._ID; // explicit noop to satisfy linter about side-effects (kept for symmetry)
        (this._ENTITY as any).TYPE = type;
    }

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

    /**
     * Get/Set the data payload on the underlying entity
     *
     * @returns {string} current data
     */
    get DATA(): string {
        const ent = this._ENTITY as any;
        return ent && typeof ent.DATA === "string" ? ent.DATA : "";
    }
    set DATA(data: string) {
        (this._ENTITY as any).DATA = data;
    }

    /**
     * Get the HTML element associated with the underlying entity
     *
     * @returns {HTMLElement} element used for rendering this block
     */
    get HTML_ELEMENT(): HTMLElement {
        // Delegate to entity; caller expects an HTMLElement
        return (this._ENTITY as any).HTML_ELEMENT as HTMLElement;
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
