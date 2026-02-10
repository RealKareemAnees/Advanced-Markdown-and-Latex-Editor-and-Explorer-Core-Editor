import { HrFactory } from "./Hr.factory";
import { HrEntity } from "../../entities-store/hr/HrEntity";

describe("HrFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new HrEntity();
        const factory = new HrFactory(entity);
        expect(factory).toBeInstanceOf(HrFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
