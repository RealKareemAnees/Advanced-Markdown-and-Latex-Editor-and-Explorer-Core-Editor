import { ToggleFactory } from "./Toggle.factory";
import { ToggleEntity } from "../../entities-store/toggle/ToggleEntity";

describe("ToggleFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new ToggleEntity();
        const factory = new ToggleFactory(entity);
        expect(factory).toBeInstanceOf(ToggleFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
