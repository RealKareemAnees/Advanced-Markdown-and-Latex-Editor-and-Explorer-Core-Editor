/**
 * src/engine/entities-store/table/TableEntity.ts
 * Table block entity implementation
 */

import { BlockEntityAbstract } from "../BlockEntity.abstract";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";
import { getDocument } from "../lib/dom.util";

/**
 * Options type for Table entity
 */
export type TableOptionsType = {
    orderBy: string;
};

/**
 * Table block entity
 */
export class TableEntity extends BlockEntityAbstract<
    string[][],
    TableOptionsType
> {
    /** Declare protected attributes from abstract class */
    declare protected _TYPE: BlockTypesEnum;
    declare protected _DATA: string[][];
    declare protected _OPTIONS: TableOptionsType;
    declare protected _HTML_ELEMENT: HTMLElement;

    constructor(
        data: string[][] = [],
        options: TableOptionsType = { orderBy: "" },
    ) {
        super(BlockTypesEnum.TABLE, data, options);
        this._TYPE = BlockTypesEnum.TABLE;
        this._HTML_ELEMENT = getDocument().createElement("table");
    }

    /**
     * Parses the data for the table entity
     * @param data - The raw data 2D array
     * @returns The parsed data
     */
    private _parseData(data: string[][]): string[][] {
        return data;
    }

    get TYPE(): BlockTypesEnum {
        return this._TYPE;
    }

    set TYPE(type: BlockTypesEnum) {
        this._TYPE = type;
    }

    get DATA(): string[][] {
        return this._DATA;
    }

    set DATA(data: string[][]) {
        this._DATA = this._parseData(data);
    }

    get OPTIONS(): TableOptionsType {
        return this._OPTIONS;
    }

    set OPTIONS(options: TableOptionsType) {
        this._OPTIONS = options;
    }

    get HTML_ELEMENT(): HTMLElement {
        return this._HTML_ELEMENT;
    }
}
