import { CheckboxFactory } from "./Checkbox.factory";
import { CheckboxEntity } from "../../entities-store/checkbox/CheckboxEntity";

describe("CheckboxFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new CheckboxEntity();
        const factory = new CheckboxFactory(entity);
        expect(factory).toBeInstanceOf(CheckboxFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
