import type { MemoryInterface } from "../../types/Memory.interface";

/**
 * this takes memory, renders it into containers, ships it to the dom
 */
export class Renderer {
    private _memory: MemoryInterface;

    constructor(memory: MemoryInterface) {
        this._memory = memory;
    }

    get MEMORY(): MemoryInterface {
        return this._memory;
    }
}
