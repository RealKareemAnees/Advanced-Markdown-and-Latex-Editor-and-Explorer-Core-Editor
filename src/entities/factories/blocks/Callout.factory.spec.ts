import { CalloutFactory } from "./Callout.factory";
import { CalloutEntity } from "../../entities-store/callout/CalloutEntity";

describe("CalloutFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new CalloutEntity();
        const factory = new CalloutFactory(entity);
        expect(factory).toBeInstanceOf(CalloutFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
