import { CodeBlockFactory } from "./CodeBlock.factory";
import { CodeBlockEntity } from "../../entities-store/code-block/CodeBlockEntity";

describe("CodeBlockFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new CodeBlockEntity();
        const factory = new CodeBlockFactory(entity);
        expect(factory).toBeInstanceOf(CodeBlockFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
