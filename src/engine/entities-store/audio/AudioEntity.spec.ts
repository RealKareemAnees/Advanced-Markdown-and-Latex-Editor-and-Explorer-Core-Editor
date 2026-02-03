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
        expect(entity.DATA).toEqual(new URL("about:blank"));
        expect(entity.OPTIONS).toEqual({ autoplay: false, repeat: false });
        expect(entity.CONVERTIBLE).toBe(false);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("audio");
    });

    it("should initialize with provided values", () => {
        const data = new URL("https://example.com/audio.mp3");
        const options = { autoplay: true, repeat: true };
        const entity = new AudioEntity(data, options);
        expect(entity.DATA).toEqual(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
