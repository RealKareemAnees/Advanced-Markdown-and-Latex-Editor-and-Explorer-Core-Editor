/**
 * src/engine/entities-store/callout/CalloutEntity.spec.ts
 * Unit tests for CalloutEntity
 */

import { CalloutEntity } from "./CalloutEntity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("CalloutEntity", () => {
    it("should initialize with default values", () => {
        const entity = new CalloutEntity();
        expect(entity.TYPE).toBe(BlockTypesEnum.CALLOUT);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toEqual({});
        expect(entity.CONVERTIBLE).toBe(true);
        expect(entity.HTML_ELEMENT).toBeInstanceOf(HTMLElement);
    });

    it("should initialize with provided values", () => {
        const data = "Important note";
        const options = { type: "warning" };
        const entity = new CalloutEntity(data, options);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
