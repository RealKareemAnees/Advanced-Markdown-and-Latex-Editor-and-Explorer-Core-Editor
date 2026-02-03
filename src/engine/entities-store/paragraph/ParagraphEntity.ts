/**
 * src/engine/entities-store/paragraph/ParagraphEntity.ts
 * Paragraph block entity implementation
 */

import { BlockEntityAbstract } from "../BlockEntity.abstract";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";
import { getDocument } from "../lib/dom.util";

/**
 * Paragraph block entity
 */
export class ParagraphEntity extends BlockEntityAbstract<
    string,
    Record<string, unknown>
> {
    constructor(data: string = "", options: Record<string, unknown> = {}) {
        super(BlockTypesEnum.PARAGRAPH, data, options);
        this._HTML_ELEMENT = getDocument().createElement("p");
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
