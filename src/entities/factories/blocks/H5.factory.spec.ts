import { H5Factory } from "./H5.factory";
import { H5Entity } from "../../entities-store/h5/H5Entity";

describe("H5Factory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new H5Entity();
        const factory = new H5Factory(entity);
        expect(factory).toBeInstanceOf(H5Factory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
