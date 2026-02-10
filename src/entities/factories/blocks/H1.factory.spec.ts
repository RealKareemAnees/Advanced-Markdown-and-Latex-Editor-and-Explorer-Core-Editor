import { H1Factory } from "./H1.factory";
import { H1Entity } from "../../entities-store/h1/H1Entity";

describe("H1Factory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new H1Entity();
        const factory = new H1Factory(entity);
        expect(factory).toBeInstanceOf(H1Factory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
