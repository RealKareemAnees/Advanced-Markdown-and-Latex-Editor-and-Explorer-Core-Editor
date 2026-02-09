import { DeleteNodeHandlerStrategy } from "./DeleteNodeHandler.strategy";

describe("DeleteNodeHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new DeleteNodeHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
