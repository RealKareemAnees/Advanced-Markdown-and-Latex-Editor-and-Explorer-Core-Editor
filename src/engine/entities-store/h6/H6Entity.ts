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
export class H6Entity extends BlockEntityAbstract<
    string,
    Record<string, unknown>
> {
    constructor(data: string = "", options: Record<string, unknown> = {}) {
        super(BlockTypesEnum.H6, data, options);
        this._HTML_ELEMENT = getDocument().createElement("h6");
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
        this._DATA = data;
    }

    get OPTIONS(): Record<string, unknown> {
        return this._OPTIONS;
    }

    set OPTIONS(options: Record<string, unknown>) {
        this._OPTIONS = options;
    }

    get HTML_ELEMENT(): HTMLElement {
        return this._HTML_ELEMENT;
    }
}
