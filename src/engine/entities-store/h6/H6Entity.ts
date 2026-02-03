/**
 * src/engine/entities-store/h6/H6Entity.ts
 * H6 block entity implementation
 */

import { BlockEntityAbstract } from "../BlockEntity.abstract";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";
import { getDocument } from "../lib/dom.util";

/**
 * H6 heading block entity
 */
export class H6Entity extends BlockEntityAbstract<string, null> {
    /** Declare protected attributes from abstract class */
    declare protected _TYPE: BlockTypesEnum;
    declare protected _DATA: string;
    declare protected _OPTIONS: null;
    declare protected _HTML_ELEMENT: HTMLElement;

    constructor(data: string = "", options: null = null) {
        super(BlockTypesEnum.H6, data, options);
        this._TYPE = BlockTypesEnum.H6;
        this._HTML_ELEMENT = getDocument().createElement("h6");
    }

    /**
     * Parses the data for the H6 entity
     * @param data - The raw data string
     * @returns The parsed data
     */
    private _parseData(data: string): string {
        return data;
    }

    get TYPE(): BlockTypesEnum {
        return this._TYPE;
    }

    set TYPE(type: BlockTypesEnum) {
        this._TYPE = type;
    }

    get DATA(): string {
        return this._DATA;
    }

    set DATA(data: string) {
        this._DATA = this._parseData(data);
    }

    get OPTIONS(): null {
        return this._OPTIONS;
    }

    set OPTIONS(options: null) {
        this._OPTIONS = options;
    }

    get HTML_ELEMENT(): HTMLElement {
        return this._HTML_ELEMENT;
    }
}
