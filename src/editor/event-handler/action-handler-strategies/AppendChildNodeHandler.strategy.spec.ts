import { AppendChildNodeHandlerStrategy } from "./AppendChildNodeHandler.strategy";

describe("AppendChildNodeHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new AppendChildNodeHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
