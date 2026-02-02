/**
 * src/engine/entities-store/BlockEntity.abstract.ts
 * Abstract base class for block entities in the editor engine.
 *
 * Provides the contract for block properties (TYPE, DATA, OPTIONS, HTML_ELEMENT)
 * and whether a block is CONVERTIBLE. All members are left abstract so concrete
 * block entity classes must implement them.
 */

import type { BlockEntityInterface } from "../../types/BlockEntity.interface";
import { BlockTypesEnum } from "../../types/BlockTypes.enum";

/**
 * Abstract implementation of BlockEntityInterface.
 *
 * @template DataType - type of the block's data payload
 * @template OptionsType - type of the block's options
 */
export abstract class BlockEntityAbstract<
    DataType = string,
    OptionsType = Record<string, unknown>,
> implements BlockEntityInterface<DataType, OptionsType> {
    /** Indicates whether this block type can be converted to other block types. */

    protected _TYPE!: BlockTypesEnum;
    protected _DATA!: DataType;
    protected _OPTIONS!: OptionsType;
    protected _HTML_ELEMENT!: HTMLElement;
    protected readonly _CONVERTIBLE!: boolean;

    get CONVERTIBLE(): boolean {
        return this._CONVERTIBLE;
    }

    /** The block type (enum). */
    abstract get TYPE(): BlockTypesEnum;
    /** Set the block type. */
    abstract set TYPE(type: BlockTypesEnum);

    /** The block's data payload. */
    abstract get DATA(): DataType;
    /** Set the block's data payload. */
    abstract set DATA(data: DataType);

    /** The block's options. */
    abstract get OPTIONS(): OptionsType;
    /** Set the block's options. */
    abstract set OPTIONS(options: OptionsType);

    /** The DOM element used to render this block. */
    abstract get HTML_ELEMENT(): HTMLElement;

    constructor(
        type: BlockTypesEnum = BlockTypesEnum.PARAGRAPH,
        data: DataType = "" as unknown as DataType,
        options: OptionsType = {} as OptionsType,
    ) {
        this._TYPE = type;
        this._DATA = data;
        this._OPTIONS = options;
        this._CONVERTIBLE = this._isConvertible();
    }

    /**
     * checks if the block type is convertible, non convertible types are:
     * VIDEO, AUDIO, HR, IMAGE, EMBEDDING, because they cant contain text and they have special data formats
     * @returns
     */
    private _isConvertible(): boolean {
        const nonConvertableBlockTypes: string[] = [
            BlockTypesEnum.VIDEO,
            BlockTypesEnum.AUDIO,
            BlockTypesEnum.HR,
            BlockTypesEnum.IMAGE,
            BlockTypesEnum.EMBEDDING,
        ];
        if (!nonConvertableBlockTypes.includes(this._TYPE)) {
            return true;
        }
        return false;
    }
}
