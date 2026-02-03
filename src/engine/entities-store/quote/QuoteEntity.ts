/**
 * src/engine/entities-store/quote/QuoteEntity.ts
 * Quote block entity implementation
 */

import { BlockEntityAbstract } from "../BlockEntity.abstract";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";
import { getDocument } from "../lib/dom.util";

/**
 * Quote block entity
 */
export class QuoteEntity extends BlockEntityAbstract<
    string,
    Record<string, unknown>
> {
    constructor(data: string = "", options: Record<string, unknown> = {}) {
        super(BlockTypesEnum.QUOTE, data, options);
        this._HTML_ELEMENT = getDocument().createElement("blockquote");
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
