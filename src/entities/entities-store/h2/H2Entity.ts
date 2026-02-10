/**
 * src/engine/entities-store/h2/H2Entity.ts
 * H2 block entity implementation
 */

import { BlockEntityAbstract } from "../BlockEntity.abstract";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

/**
 * H2 heading block entity
 */
export class H2Entity extends BlockEntityAbstract<string, null> {
    /** Declare protected attributes from abstract class */
    declare protected _TYPE: BlockTypesEnum;
    declare protected _DATA: string;
    declare protected _OPTIONS: null;

    constructor(data: string = "", options: null = null) {
        super(BlockTypesEnum.H2, data, options);
        this._TYPE = BlockTypesEnum.H2;
    }

    /**
     * Parses the data for the H2 entity
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
}
