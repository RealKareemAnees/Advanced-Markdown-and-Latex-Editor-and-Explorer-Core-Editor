import { GetNodeByIDHandlerStrategy } from "./GetNodeByIDHandler.strategy";

describe("GetNodeByIDHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new GetNodeByIDHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
