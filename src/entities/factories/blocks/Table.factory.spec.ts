import { TableFactory } from "./Table.factory";
import { TableEntity } from "../../entities-store/table/TableEntity";

describe("TableFactory", () => {
    test("initializes and render() returns a string", () => {
        const entity = new TableEntity();
        const factory = new TableFactory(entity);
        expect(factory).toBeInstanceOf(TableFactory);
        const out = factory.render();
        expect(typeof out).toBe("string");
    });
});
