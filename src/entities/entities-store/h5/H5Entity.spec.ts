/**
 * src/engine/entities-store/h5/H5Entity.spec.ts
 * Unit tests for H5Entity
 */

import { H5Entity } from "./H5Entity";
import { BlockTypesEnum } from "../../../types/BlockTypes.enum";

describe("H5Entity", () => {
    it("should initialize with default values", () => {
        const entity = new H5Entity();
        expect(entity.TYPE).toBe(BlockTypesEnum.H5);
        expect(entity.DATA).toBe("");
        expect(entity.OPTIONS).toBeNull();
        expect(entity.CONVERTIBLE).toBe(true);
    });

    it("should initialize with provided values", () => {
        const data = "Test Heading";
        const entity = new H5Entity(data);
        expect(entity.DATA).toBe(data);
        expect(entity.OPTIONS).toBeNull();
    });
});
