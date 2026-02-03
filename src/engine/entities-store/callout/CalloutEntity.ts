/**
 * src/engine/entities-store/callout/CalloutEntity.ts
 * Callout block entity implementation
 */

import { BlockEntityAbstract } from "../BlockEntity.abstract";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";
import { getDocument } from "../lib/dom.util";

/**
 * Options type for Callout entity
 */
export type CalloutOptionsType = {
    type: "info" | "warning" | "error" | "success";
};

/**
 * Callout block entity
 */
export class CalloutEntity extends BlockEntityAbstract<
    string,
    CalloutOptionsType
> {
    /** Declare protected attributes from abstract class */
    declare protected _TYPE: BlockTypesEnum;
    declare protected _DATA: string;
    declare protected _OPTIONS: CalloutOptionsType;
    declare protected _HTML_ELEMENT: HTMLElement;

    constructor(
        data: string = "",
        options: CalloutOptionsType = { type: "info" },
    ) {
        super(BlockTypesEnum.CALLOUT, data, options);
        this._TYPE = BlockTypesEnum.CALLOUT;
        this._HTML_ELEMENT = getDocument().createElement("div");
    }

    /**
     * Parses the data for the callout entity
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

    get OPTIONS(): CalloutOptionsType {
        return this._OPTIONS;
    }

    set OPTIONS(options: CalloutOptionsType) {
        this._OPTIONS = options;
    }

    get HTML_ELEMENT(): HTMLElement {
        return this._HTML_ELEMENT;
    }
}
