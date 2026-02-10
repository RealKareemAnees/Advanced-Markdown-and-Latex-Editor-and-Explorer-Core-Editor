import { LatexFactory } from "./Latex.factory";
import { LatexEntity } from "../../entities-store/latex/LatexEntity";

describe("LatexFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new LatexEntity();
        const factory = new LatexFactory(entity);
        expect(factory).toBeInstanceOf(LatexFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
