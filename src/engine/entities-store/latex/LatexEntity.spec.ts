/**
 * src/engine/entities-store/latex/LatexEntity.spec.ts
 * Unit tests for LatexEntity
 */

import { LatexEntity } from "./LatexEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("LatexEntity", () => {
    it("should initialize with default values", () => {
        const entity = new LatexEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.LATEX);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
    });

    it("should initialize with provided values", () => {
        const data = "E = mc^2";
        const options = { displayMode: true };
        const entity = new LatexEntity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
