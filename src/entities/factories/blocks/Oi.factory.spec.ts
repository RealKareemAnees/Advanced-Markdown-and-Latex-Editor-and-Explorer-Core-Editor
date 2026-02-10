import { OiFactory } from "./Oi.factory";
import { OiEntity } from "../../entities-store/oi/OiEntity";

describe("OiFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new OiEntity();
        const factory = new OiFactory(entity);
        expect(factory).toBeInstanceOf(OiFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
