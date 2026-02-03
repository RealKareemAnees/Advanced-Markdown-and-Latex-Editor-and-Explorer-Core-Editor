/**
 * src/engine/entities-store/code-block/CodeBlockEntity.spec.ts
 * Unit tests for CodeBlockEntity
 */

import { CodeBlockEntity } from "./CodeBlockEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("CodeBlockEntity", () => {
    it("should initialize with default values", () => {
        const entity = new CodeBlockEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.CODE_BLOCK);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
        expect(entity.HTML_ELEMENT.tagName.toLowerCase()).toBe("pre");
    });

    it("should initialize with provided values", () => {
        const data = "console.log('Hello');";
        const options = { language: "javascript" };
        const entity = new CodeBlockEntity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
