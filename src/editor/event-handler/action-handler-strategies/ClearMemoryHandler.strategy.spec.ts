import { ClearMemoryHandlerStrategy } from "./ClearMemoryHandler.strategy";

describe("ClearMemoryHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new ClearMemoryHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
