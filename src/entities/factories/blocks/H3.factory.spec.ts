import { H3Factory } from "./H3.factory";
import { H3Entity } from "../../entities-store/h3/H3Entity";

describe("H3Factory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new H3Entity();
        const factory = new H3Factory(entity);
        expect(factory).toBeInstanceOf(H3Factory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
