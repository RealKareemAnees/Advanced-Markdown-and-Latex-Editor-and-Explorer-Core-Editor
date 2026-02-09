import { RedoHandlerStrategy } from "./RedoHandler.strategy";

describe("RedoHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new RedoHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
