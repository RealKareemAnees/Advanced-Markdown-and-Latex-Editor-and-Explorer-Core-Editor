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
    // Validate headID
    if (headID < 0 || headID >= store.length || store[headID] === null) {
        return headID;
    }

    let tailID = headID;
    let currentNode = store[headID];

    // Traverse the left chain until no more left nodes or a null node is found
    while (currentNode) {
        const nextNodeID = currentNode.leftNodeID;

        // If no more left nodes, we've found the tail
        if (nextNodeID === null) {
            break;
        }

        const nextNode = store[nextNodeID];

        // If the next node is null (deleted), stop traversal
        if (!nextNode) {
            break;
        }

        // Move to the next node
        tailID = nextNodeID;
        currentNode = nextNode;
    }

    return tailID;
}
