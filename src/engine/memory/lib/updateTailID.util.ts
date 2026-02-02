/**
 * Utility functions for managing memory structures in the editor engine.
 * This file contains helpers for updating IDs in the binary tree-based document structure.
 */

import type { NodeInterface } from "../../../types/Node.interface";

/**
 * Finds the tail node ID by traversing the left chain (next blocks) from the head node.
 * This function assumes a binary tree where leftNodeID represents the next block.
 *
 * @param store - The array-based store containing nodes.
 * @param headID - The ID of the head node to start traversal from.
 * @returns The ID of the tail node (last node in the left chain).
 */
export function updateTailID(
    store: (NodeInterface | null)[],
    headID: number,
): number {
    // validate headID
    if (headID < 0 || headID >= store.length || store[headID] === null) {
        return headID;
    }

    // start with the head node
    let currentNode = store[headID];
    // initialize tailID to headID in case there are no left nodes
    let tailID = headID;

    // traverse the left chain until no more left nodes or a null node is found
    while (currentNode && currentNode.leftNodeID !== null) {
        const nextNodeID = currentNode.leftNodeID;
        const nextNode = store[nextNodeID];

        if (nextNode === null) {
            // if the next node is null (deleted), stop traversal
            break;
        }

        // update tailID to the next node's ID
        tailID = nextNodeID;
        // move to the next node
        currentNode = nextNode;
    }

    // return the computed tail ID
    return tailID;
}
