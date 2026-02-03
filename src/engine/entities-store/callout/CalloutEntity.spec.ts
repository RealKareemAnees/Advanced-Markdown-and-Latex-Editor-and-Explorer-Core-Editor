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
        expect(entity.OPTIONS).toEqual({ type: "info" });
        expect(entity.CONVERTIBLE).toBe(true);
    });

    it("should initialize with provided values", () => {
        const data = "Important note";
        const options = { type: "warning" } as const;
        const entity = new CalloutEntity(data, options as any);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toEqual(options);
    });
});
