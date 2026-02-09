import { ExportHandlerStrategy } from "./ExportHandler.strategy";

describe("ExportHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new ExportHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
