/**
 * src/engine/entities-store/h3/H3Entity.spec.ts
 * Unit tests for H3Entity
 */

import { H3Entity } from "./H3Entity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("H3Entity", () => {
    it("should initialize with default values", () => {
        const entity = new H3Entity();
        expect(entity.TYPE).toBe(BlockTypesEnum.H3);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toBeNull();
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("h3");
    });

    it("should initialize with provided values", () => {
        const data = "Test Heading";
        const entity = new H3Entity(data);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toBeNull();
    });
});
