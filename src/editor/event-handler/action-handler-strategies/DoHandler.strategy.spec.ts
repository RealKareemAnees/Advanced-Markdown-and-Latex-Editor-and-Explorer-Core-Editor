import { DoHandlerStrategy } from "./DoHandler.strategy";

describe("DoHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new DoHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
