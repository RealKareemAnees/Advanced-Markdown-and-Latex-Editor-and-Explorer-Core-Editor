import { InsertChildNodeHandlerStrategy } from "./InsertChildNodeHandler.strategy";

describe("InsertChildNodeHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new InsertChildNodeHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
