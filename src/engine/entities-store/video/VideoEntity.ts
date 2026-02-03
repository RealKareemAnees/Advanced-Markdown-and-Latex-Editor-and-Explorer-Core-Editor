/**
 * src/engine/entities-store/video/VideoEntity.ts
 * Video block entity implementation
 */

import { BlockEntityAbstract } from "../BlockEntity.abstract";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";
import { getDocument } from "../lib/dom.util";

/**
 * Options type for Video entity
 */
export type VideoOptionsType = {
    showControls: boolean;
    autoplay: boolean;
    repeat: boolean;
    sound: boolean;
};

/**
 * Video block entity
 */
export class VideoEntity extends BlockEntityAbstract<URL, VideoOptionsType> {
    /** Declare protected attributes from abstract class */
    declare protected _TYPE: BlockTypesEnum;
    declare protected _DATA: URL;
    declare protected _OPTIONS: VideoOptionsType;
    declare protected _HTML_ELEMENT: HTMLElement;

    constructor(
        data: URL = new URL("about:blank"),
        options: VideoOptionsType = {
            showControls: true,
            autoplay: false,
            repeat: false,
            sound: true,
        },
    ) {
        super(BlockTypesEnum.VIDEO, data, options);
        this._TYPE = BlockTypesEnum.VIDEO;
        this._HTML_ELEMENT = getDocument().createElement("video");
    }

    /**
     * Parses the data for the video entity
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

    get OPTIONS(): VideoOptionsType {
        return this._OPTIONS;
    }

    set OPTIONS(options: VideoOptionsType) {
        this._OPTIONS = options;
    }

    get HTML_ELEMENT(): HTMLElement {
        return this._HTML_ELEMENT;
    }
}
