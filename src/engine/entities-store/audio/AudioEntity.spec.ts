/**
 * src/engine/entities-store/audio/AudioEntity.spec.ts
 * Unit tests for AudioEntity
 */

import { AudioEntity } from "./AudioEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("AudioEntity", () => {
    it("should initialize with default values", () => {
        const entity = new AudioEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.AUDIO);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(false);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("audio");
    });

    it("should initialize with provided values", () => {
        const data = "audio.mp3";
        const options = { controls: true };
        const entity = new AudioEntity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
