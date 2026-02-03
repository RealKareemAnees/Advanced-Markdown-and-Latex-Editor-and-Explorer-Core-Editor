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
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(false);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("video");
    });

    it("should initialize with provided values", () => {
        const data = "video.mp4";
        const options = { controls: true };
        const entity = new VideoEntity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
