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
        expect(entity.OPTIONS).toBeNull();
        expect(entity.CONVERTIBLE).toBe(true);
    });

    it("should initialize with provided values", () => {
        const data = "E = mc^2";
        const entity = new LatexEntity(data);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toBeNull();
    });
});
