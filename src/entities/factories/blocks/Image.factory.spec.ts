import { ImageFactory } from "./Image.factory";
import { ImageEntity } from "../../entities-store/image/ImageEntity";

describe("ImageFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new ImageEntity();
        const factory = new ImageFactory(entity);
        expect(factory).toBeInstanceOf(ImageFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
