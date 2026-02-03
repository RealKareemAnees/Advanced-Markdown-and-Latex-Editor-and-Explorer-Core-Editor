/**
 * src/engine/entities-store/image/ImageEntity.ts
 * Image block entity implementation
 */

import { BlockEntityAbstract } from "../BlockEntity.abstract";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";
import { getDocument } from "../lib/dom.util";

/**
 * Image block entity
 */
export class ImageEntity extends BlockEntityAbstract<URL, null> {
    /** Declare protected attributes from abstract class */
    declare protected _TYPE: BlockTypesEnum;
    declare protected _DATA: URL;
    declare protected _OPTIONS: null;
    declare protected _HTML_ELEMENT: HTMLElement;

    constructor(data: URL = new URL("about:blank"), options: null = null) {
        super(BlockTypesEnum.IMAGE, data, options);
        this._TYPE = BlockTypesEnum.IMAGE;
        this._HTML_ELEMENT = getDocument().createElement("img");
    }

    /**
     * Parses the data for the image entity
     * @param data - The raw data URL
     * @returns The parsed data
     */
    private _parseData(data: URL): URL {
        return data;
    }

    get TYPE(): BlockTypesEnum {
        return this._TYPE;
    }

    set TYPE(type: BlockTypesEnum) {
        this._TYPE = type;
    }

    get DATA(): URL {
        return this._DATA;
    }

    set DATA(data: URL) {
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
