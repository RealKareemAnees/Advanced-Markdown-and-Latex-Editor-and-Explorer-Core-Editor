import { MoveNodeBelowHandlerStrategy } from "./MoveNodeBelowHandler.strategy";

describe("MoveNodeBelowHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new MoveNodeBelowHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
