import { UiFactory } from "./Ui.factory";
import { UiEntity } from "../../entities-store/ui/UiEntity";

describe("UiFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new UiEntity();
        const factory = new UiFactory(entity);
        expect(factory).toBeInstanceOf(UiFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
