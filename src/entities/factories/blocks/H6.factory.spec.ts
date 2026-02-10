import { H6Factory } from "./H6.factory";
import { H6Entity } from "../../entities-store/h6/H6Entity";

describe("H6Factory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new H6Entity();
        const factory = new H6Factory(entity);
        expect(factory).toBeInstanceOf(H6Factory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
