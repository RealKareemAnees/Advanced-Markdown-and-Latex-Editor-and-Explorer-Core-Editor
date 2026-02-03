/**
 * src/engine/entities-store/h2/H2Entity.spec.ts
 * Unit tests for H2Entity
 */

import { H2Entity } from "./H2Entity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("H2Entity", () => {
    it("should initialize with default values", () => {
        const entity = new H2Entity();
        expect(entity.TYPE).toBe(BlockTypesEnum.H2);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("h2");
    });

    it("should initialize with provided values", () => {
        const data = "Test Heading";
        const options = { align: "center" };
        const entity = new H2Entity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
