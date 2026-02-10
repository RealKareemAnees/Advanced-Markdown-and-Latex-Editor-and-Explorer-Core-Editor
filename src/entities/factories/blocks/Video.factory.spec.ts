import { VideoFactory } from "./Video.factory";
import { VideoEntity } from "../../entities-store/video/VideoEntity";

describe("VideoFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new VideoEntity();
        const factory = new VideoFactory(entity);
        expect(factory).toBeInstanceOf(VideoFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
