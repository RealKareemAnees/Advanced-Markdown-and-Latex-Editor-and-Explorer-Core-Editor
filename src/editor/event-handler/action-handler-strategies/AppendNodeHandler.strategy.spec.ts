import { AppendNodeHandlerStrategy } from "./AppendNodeHandler.strategy";

describe("AppendNodeHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new AppendNodeHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
