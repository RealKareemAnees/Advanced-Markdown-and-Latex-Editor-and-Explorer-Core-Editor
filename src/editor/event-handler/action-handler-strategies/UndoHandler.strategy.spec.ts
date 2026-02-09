import { UndoHandlerStrategy } from "./UndoHandler.strategy";

describe("UndoHandlerStrategy", () => {
    it("should be defined", () => {
        const strategy = new UndoHandlerStrategy();
        expect(strategy).toBeDefined();
    });
});
