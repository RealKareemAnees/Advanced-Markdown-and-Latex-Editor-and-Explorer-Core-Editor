/**
 * src/engine/entities-store/h1/H1Entity.spec.ts
 * Unit tests for H1Entity
 */

import { H1Entity } from "./H1Entity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("H1Entity", () => {
    it("should initialize with default values", () => {
        const entity = new H1Entity();
        expect(entity.TYPE).toBe(BlockTypesEnum.H1);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("h1");
    });

    it("should initialize with provided values", () => {
        const data = "Test Heading";
        const options = { align: "center" };
        const entity = new H1Entity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
