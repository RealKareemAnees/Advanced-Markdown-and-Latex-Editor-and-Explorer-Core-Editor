/**
 * src/engine/entities-store/checkbox/CheckboxEntity.ts
 * Checkbox block entity implementation
 */

import { BlockEntityAbstract } from "../BlockEntity.abstract";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";
import { getDocument } from "../lib/dom.util";

/**
 * Checkbox block entity
 */
export class CheckboxEntity extends BlockEntityAbstract<string, null> {
    /** Declare protected attributes from abstract class */
    declare protected _TYPE: BlockTypesEnum;
    declare protected _DATA: string;
    declare protected _OPTIONS: null;
    declare protected _HTML_ELEMENT: HTMLElement;

    constructor(data: string = "", options: null = null) {
        super(BlockTypesEnum.CHECKBOX, data, options);
        this._TYPE = BlockTypesEnum.CHECKBOX;
        this._HTML_ELEMENT = getDocument().createElement("div");
    }

    /**
     * Parses the data for the checkbox entity
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
