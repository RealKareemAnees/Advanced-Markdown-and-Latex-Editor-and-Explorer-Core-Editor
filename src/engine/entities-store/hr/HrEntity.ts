/**
 * src/engine/entities-store/hr/HrEntity.ts
 * HR (horizontal rule) block entity implementation
 */

import { BlockEntityAbstract } from "../BlockEntity.abstract";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";
import { getDocument } from "../lib/dom.util";

/**
 * HR (horizontal rule) block entity
 * Note: HR has neither data nor options
 */
export class HrEntity extends BlockEntityAbstract<null, null> {
    /** Declare protected attributes from abstract class */
    declare protected _TYPE: BlockTypesEnum;
    declare protected _DATA: null;
    declare protected _OPTIONS: null;
    declare protected _HTML_ELEMENT: HTMLElement;

    constructor() {
        super(BlockTypesEnum.HR, null, null);
        this._TYPE = BlockTypesEnum.HR;
        this._HTML_ELEMENT = getDocument().createElement("hr");
    }

    get TYPE(): BlockTypesEnum {
        return this._TYPE;
    }

    set TYPE(type: BlockTypesEnum) {
        this._TYPE = type;
    }

    get DATA(): null {
        return this._DATA;
    }

    set DATA(data: null) {
        this._DATA = data;
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
