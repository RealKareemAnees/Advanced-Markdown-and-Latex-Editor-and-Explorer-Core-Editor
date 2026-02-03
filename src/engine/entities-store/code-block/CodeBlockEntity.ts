/**
 * src/engine/entities-store/code-block/CodeBlockEntity.ts
 * Code block entity implementation
 */

import { BlockEntityAbstract } from "../BlockEntity.abstract";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";
import { getDocument } from "../lib/dom.util";

/**
 * Options type for CodeBlock entity
 */
export type CodeBlockOptionsType = {
    language: string;
    filename: string;
    isCopyable: boolean;
};

/**
 * Code block entity
 */
export class CodeBlockEntity extends BlockEntityAbstract<
    string,
    CodeBlockOptionsType
> {
    /** Declare protected attributes from abstract class */
    declare protected _TYPE: BlockTypesEnum;
    declare protected _DATA: string;
    declare protected _OPTIONS: CodeBlockOptionsType;
    declare protected _HTML_ELEMENT: HTMLElement;

    constructor(
        data: string = "",
        options: CodeBlockOptionsType = {
            language: "",
            filename: "",
            isCopyable: true,
        },
    ) {
        super(BlockTypesEnum.CODE_BLOCK, data, options);
        this._TYPE = BlockTypesEnum.CODE_BLOCK;
        this._HTML_ELEMENT = getDocument().createElement("pre");
    }

    /**
     * Parses the data for the code block entity
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

    get OPTIONS(): CodeBlockOptionsType {
        return this._OPTIONS;
    }

    set OPTIONS(options: CodeBlockOptionsType) {
        this._OPTIONS = options;
    }

    get HTML_ELEMENT(): HTMLElement {
        return this._HTML_ELEMENT;
    }
}
