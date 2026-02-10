import { H4Factory } from "./H4.factory";
import { H4Entity } from "../../entities-store/h4/H4Entity";

describe("H4Factory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new H4Entity();
        const factory = new H4Factory(entity);
        expect(factory).toBeInstanceOf(H4Factory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
