/**
 * Utility functions for managing memory structures in the editor engine.
 * This file contains helpers for updating IDs in the binary tree-based document structure.
 */

/**
 * Updates the tail ID by traversing the left chain (next blocks) from the head node.
 * This function assumes a binary tree where leftID represents the next block.
 * @param store - The store object containing nodes, keyed by ID.
 * @param headID - The ID of the head node to start traversal from.
 * @returns The ID of the tail node in the left chain.
 */
export function updateTailID(
    store: Record<number, any>,
    headID: number,
): number {
    // Start with the head node
    let currentNode = store[headID];
    // Initialize tailID to headID in case there are no left nodes
    let tailID = headID;

    // Traverse the left chain until no more left nodes or a null node is found
    while (currentNode && currentNode.leftID !== null) {
        // Get the next node in the left chain
        const node = store[currentNode.leftID];
        if (node === null) {
            // If the node is null, stop traversal
            break;
        } else {
            // Update tailID to the current node's ID before moving to the next
            tailID = currentNode.ID;
            // Move to the next node
            currentNode = node;
        }
    }

    // Return the computed tail ID
    return tailID;
}
