/**
 * src/engine/entities-store/audio/AudioEntity.ts
 * Audio block entity implementation
 */

import { BlockEntityAbstract } from "../BlockEntity.abstract";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";
import { getDocument } from "../lib/dom.util";

/**
 * Options type for Audio entity
 */
export type AudioOptionsType = {
    autoplay: boolean;
    repeat: boolean;
};

/**
 * Audio block entity
 */
export class AudioEntity extends BlockEntityAbstract<URL, AudioOptionsType> {
    /** Declare protected attributes from abstract class */
    declare protected _TYPE: BlockTypesEnum;
    declare protected _DATA: URL;
    declare protected _OPTIONS: AudioOptionsType;
    declare protected _HTML_ELEMENT: HTMLElement;

    constructor(
        data: URL = new URL("about:blank"),
        options: AudioOptionsType = { autoplay: false, repeat: false },
    ) {
        super(BlockTypesEnum.AUDIO, data, options);
        this._TYPE = BlockTypesEnum.AUDIO;
        this._HTML_ELEMENT = getDocument().createElement("audio");
    }

    /**
     * Parses the data for the audio entity
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

    get OPTIONS(): AudioOptionsType {
        return this._OPTIONS;
    }

    set OPTIONS(options: AudioOptionsType) {
        this._OPTIONS = options;
    }

    get HTML_ELEMENT(): HTMLElement {
        return this._HTML_ELEMENT;
    }
}
