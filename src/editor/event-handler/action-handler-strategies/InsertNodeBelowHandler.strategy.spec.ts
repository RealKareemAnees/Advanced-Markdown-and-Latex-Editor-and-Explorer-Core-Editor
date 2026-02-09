import { InsertNodeBelowHandlerStrategy } from "./InsertNodeBelowHandler.strategy";

describe("InsertNodeBelowHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new InsertNodeBelowHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
