import { EventHandler } from "./EventHandler";

describe("EventHandler", () => {
    let memory: any;
    let history: any;
    let eventHandler: EventHandler;

    beforeEach(() => {
        memory = {};
        history = {
            do: jest.fn(),
            undo: jest.fn(),
            redo: jest.fn(),
        };
        eventHandler = new EventHandler(memory, history);
    });

    test("select, deselect and action pass correct selected ids and chain", () => {
        const action = {
            handle: jest.fn().mockReturnValue(["new-state"]),
        } as any;

        const returned = eventHandler
            .select([
                { order: 1, id: 10 },
                { order: 2, id: 20 },
            ])
            .action(action);

        expect(returned).toBe(eventHandler);
        expect(action.handle).toHaveBeenCalledWith(memory, [10, 20], undefined);
        expect(history.do).toHaveBeenCalledWith(["new-state"]);

        // Deselect a specific order and ensure selected list updates
        eventHandler.deselect([{ order: 1, id: 10 }]).action(action);
        expect(action.handle).toHaveBeenCalledWith(memory, [20], undefined);

        // Deselect all
        eventHandler.deselect(undefined).action(action);
        expect(action.handle).toHaveBeenCalledWith(memory, [], undefined);
    });

    test("target is forwarded to action.handle", () => {
        const action = { handle: jest.fn().mockReturnValue([]) } as any;
        eventHandler
            .select([{ order: 0, id: 5 }])
            .target({ order: 0, id: 99 })
            .action(action);
        expect(action.handle).toHaveBeenCalledWith(memory, [5], 99);
    });

    test("select overwrites existing order mapping", () => {
        const action = { handle: jest.fn().mockReturnValue([]) } as any;
        eventHandler
            .select([{ order: 1, id: 1 }])
            .select([{ order: 1, id: 2 }])
            .action(action);
        expect(action.handle).toHaveBeenCalledWith(memory, [2], undefined);
    });

    test("undo and redo call history and return this", () => {
        const r1 = eventHandler.undo();
        expect(history.undo).toHaveBeenCalled();
        expect(r1).toBe(eventHandler);
        const r2 = eventHandler.redo();
        expect(history.redo).toHaveBeenCalled();
        expect(r2).toBe(eventHandler);
    });
});
