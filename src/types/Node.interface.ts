/**
 *
 */

import type { BlockEntityInterface } from "./BlockEntity.interface";
import type { BlockTypesEnum } from "./BlockTypes.enum";

// all properties are inherited from BlockEntityInterface as it works as a proxy to the Block entity

export interface NodeInterface extends BlockEntityInterface {
    get CONVERTIBLE(): boolean;

    get ENTITY(): BlockEntityInterface;

    get TYPE(): BlockTypesEnum;
    set TYPE(type: BlockTypesEnum);

    get ID(): number;
    set ID(id: number);

    get DATA(): string;
    set DATA(data: string);

    get HTML_ELEMENT(): HTMLElement;

    get parentNodeID(): number | null;
    set parentNodeID(id: number | null);

    get leftNodeID(): number | null;
    set leftNodeID(id: number | null);

    get rightNodeID(): number | null;
    set rightNodeID(id: number | null);
}
