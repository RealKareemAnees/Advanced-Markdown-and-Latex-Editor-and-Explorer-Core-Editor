import { DuplicateMultipleNodesHandlerStrategy } from "./DuplicateMultipleNodesHandler.strategy";

describe("DuplicateMultipleNodesHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new DuplicateMultipleNodesHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
