/**
 * the interface for Block entity
 */

import { BlockTypesEnum } from "./BlockTypes.enum";

// 2 feb 2026, the most minimal interface possible for now
// i dont know if entities should have methods or not yet

export interface BlockEntityInterface<
    DataType = string,
    OptionsType = Record<string, unknown>,
> {
    get CONVERTIBLE(): boolean;

    get TYPE(): BlockTypesEnum;
    set TYPE(type: BlockTypesEnum);

    get DATA(): DataType;
    set DATA(data: DataType);

    get OPTIONS(): OptionsType;
    set OPTIONS(options: OptionsType);
}
