import { DuplicateNodeHandlerStrategy } from "./DuplicateNodeHandler.strategy";

describe("DuplicateNodeHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new DuplicateNodeHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
