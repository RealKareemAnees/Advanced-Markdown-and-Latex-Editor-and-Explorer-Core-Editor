/**
 * src/engine/entities-store/h6/H6Entity.spec.ts
 * Unit tests for H6Entity
 */

import { H6Entity } from "./H6Entity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("H6Entity", () => {
    it("should initialize with default values", () => {
        const entity = new H6Entity();
        expect(entity.TYPE).toBe(BlockTypesEnum.H6);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("h6");
    });

    it("should initialize with provided values", () => {
        const data = "Test Heading";
        const options = { align: "center" };
        const entity = new H6Entity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
