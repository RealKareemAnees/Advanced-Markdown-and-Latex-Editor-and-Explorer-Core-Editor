import { HtmlFactory } from "./Html.factory";
import { HtmlEntity } from "../../entities-store/html/HtmlEntity";

describe("HtmlFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new HtmlEntity();
        const factory = new HtmlFactory(entity);
        expect(factory).toBeInstanceOf(HtmlFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
