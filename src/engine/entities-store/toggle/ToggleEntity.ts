/**
 * src/engine/entities-store/toggle/ToggleEntity.ts
 * Toggle block entity implementation
 */

import { BlockEntityAbstract } from "../BlockEntity.abstract";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";
import { getDocument } from "../lib/dom.util";

/**
 * Options type for Toggle entity
 */
export type ToggleOptionsType = {
    opened: boolean;
};

/**
 * Toggle block entity
 */
export class ToggleEntity extends BlockEntityAbstract<
    string,
    ToggleOptionsType
> {
    /** Declare protected attributes from abstract class */
    declare protected _TYPE: BlockTypesEnum;
    declare protected _DATA: string;
    declare protected _OPTIONS: ToggleOptionsType;
    declare protected _HTML_ELEMENT: HTMLElement;

    constructor(
        data: string = "",
        options: ToggleOptionsType = { opened: false },
    ) {
        super(BlockTypesEnum.TOGGLE, data, options);
        this._TYPE = BlockTypesEnum.TOGGLE;
        this._HTML_ELEMENT = getDocument().createElement("details");
    }

    /**
     * Parses the data for the toggle entity
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

    get OPTIONS(): ToggleOptionsType {
        return this._OPTIONS;
    }

    set OPTIONS(options: ToggleOptionsType) {
        this._OPTIONS = options;
    }

    get HTML_ELEMENT(): HTMLElement {
        return this._HTML_ELEMENT;
    }
}
