/**
 * src/engine/entities-store/video/VideoEntity.spec.ts
 * Unit tests for VideoEntity
 */

import { VideoEntity } from "./VideoEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("VideoEntity", () => {
    it("should initialize with default values", () => {
        const entity = new VideoEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.VIDEO);
        expect(entity.DATA).toEqual(new URL("about:blank"));
        expect(entity.OPTIONS).toEqual({
            showControls: true,
            autoplay: false,
            repeat: false,
            sound: true,
        });
        expect(entity.CONVERTIBLE).toBe(false);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("video");
    });

    it("should initialize with provided values", () => {
        const data = new URL("https://example.com/video.mp4");
        const options = {
            showControls: false,
            autoplay: true,
            repeat: true,
            sound: false,
        };
        const entity = new VideoEntity(data, options);
        expect(entity.DATA).toEqual(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
