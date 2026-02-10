import { H2Factory } from "./H2.factory";
import { H2Entity } from "../../entities-store/h2/H2Entity";

describe("H2Factory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new H2Entity();
        const factory = new H2Factory(entity);
        expect(factory).toBeInstanceOf(H2Factory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
