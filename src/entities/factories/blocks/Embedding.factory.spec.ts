import { EmbeddingFactory } from "./Embedding.factory";
import { EmbeddingEntity } from "../../entities-store/embedding/EmbeddingEntity";

describe("EmbeddingFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new EmbeddingEntity();
        const factory = new EmbeddingFactory(entity);
        expect(factory).toBeInstanceOf(EmbeddingFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
