import { AudioFactory } from "./Audio.factory";
import { AudioEntity } from "../../entities-store/audio/AudioEntity";

describe("AudioFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new AudioEntity();
        const factory = new AudioFactory(entity);
        expect(factory).toBeInstanceOf(AudioFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
