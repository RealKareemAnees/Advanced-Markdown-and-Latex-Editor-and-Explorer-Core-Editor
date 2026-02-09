import { ExportMemoryHandlerStrategy } from "./ExportMemoryHandler.strategy";

describe("ExportMemoryHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new ExportMemoryHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
