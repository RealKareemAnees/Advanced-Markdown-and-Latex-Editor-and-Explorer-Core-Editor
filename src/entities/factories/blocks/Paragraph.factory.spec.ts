import { ParagraphFactory } from "./Paragraph.factory";
import { ParagraphEntity } from "../../entities-store/paragraph/ParagraphEntity";

describe("ParagraphFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new ParagraphEntity("hello world");
        const factory = new ParagraphFactory(entity);
        expect(factory).toBeInstanceOf(ParagraphFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
