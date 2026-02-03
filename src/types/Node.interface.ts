/**
 *
 */

import type { BlockEntityInterface } from "./BlockEntity.interface";

export interface NodeInterface {
    get ENTITY(): BlockEntityInterface;

    get ID(): number;
    set ID(id: number);

    get parentNodeID(): number | null;
    set parentNodeID(id: number | null);

    get leftNodeID(): number | null;
    set leftNodeID(id: number | null);

    get rightNodeID(): number | null;
    set rightNodeID(id: number | null);
}
