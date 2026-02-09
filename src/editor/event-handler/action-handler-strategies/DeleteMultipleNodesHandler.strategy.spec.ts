import { DeleteMultipleNodesHandlerStrategy } from "./DeleteMultipleNodesHandler.strategy";

describe("DeleteMultipleNodesHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new DeleteMultipleNodesHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
