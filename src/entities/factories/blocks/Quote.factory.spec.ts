import { QuoteFactory } from "./Quote.factory";
import { QuoteEntity } from "../../entities-store/quote/QuoteEntity";

describe("QuoteFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new QuoteEntity();
        const factory = new QuoteFactory(entity);
        expect(factory).toBeInstanceOf(QuoteFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
