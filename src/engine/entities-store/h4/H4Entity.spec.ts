/**
 * src/engine/entities-store/h4/H4Entity.spec.ts
 * Unit tests for H4Entity
 */

import { H4Entity } from "./H4Entity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("H4Entity", () => {
    it("should initialize with default values", () => {
        const entity = new H4Entity();
        expect(entity.TYPE).toBe(BlockTypesEnum.H4);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toBeNull();
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("h4");
    });

    it("should initialize with provided values", () => {
        const data = "Test Heading";
        const entity = new H4Entity(data);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toBeNull();
    });
});
