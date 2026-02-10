/**
 * Utility functions for memory management in the editor engine.
 * This file provides helper functions to manipulate the node store, including deleting nodes.
 */

import type { NodeInterface } from "../../../types/Node.interface";

/**
 * Deletes a node from the store and frees up its memory, including all nested children (right nodes).
 * This function performs a BFS traversal to remove all child nodes and updates parent/sibling references.
 * Note: Only deletes right children (nested blocks), not left siblings.
 *
 * @param nodeID - The ID of the node to delete.
 * @param store - The array-based store of nodes.
 * @param freeSpots - The array to track freed node IDs for reuse.
 */
export function deleteNode(
    nodeID: number,
    store: (NodeInterface | null)[],
    freeSpots: number[],
): void {
    // If the node is invalid or already null, return
    const storeLength = store.length;
    if (nodeID < 0 || nodeID >= storeLength || store[nodeID] === null) {
        return;
    }

    const targetNode = store[nodeID];
    if (!targetNode) return;

    const parentID = targetNode.parentNodeID;
    const leftID = targetNode.leftNodeID;

    // Update parent's reference to skip this node
    if (parentID !== null) {
        const parentNode = store[parentID];
        if (parentNode) {
            // If this node is the left child (next sibling), link parent to this node's left
            if (parentNode.leftNodeID === nodeID) {
                parentNode.leftNodeID = leftID;
            }
            // If this node is the right child (nested head), link parent to this node's left
            if (parentNode.rightNodeID === nodeID) {
                parentNode.rightNodeID = leftID;
            }
        }
    }

    // Update the left sibling's parent reference to point to this node's parent
    if (leftID !== null) {
        const leftNode = store[leftID];
        if (leftNode) {
            leftNode.parentNodeID = parentID;
        }
    }

    // BFS to remove only nested children (right nodes and their descendants)
    // Using index-based iteration instead of shift() for O(1) instead of O(n)
    const queue: number[] = [nodeID];
    let queueIndex = 0;

    while (queueIndex < queue.length) {
        const currentNodeID = queue[queueIndex++];
        const currentNode = store[currentNodeID];

        if (!currentNode) continue;

        // Only traverse right children (nested blocks) for deletion
        const rightID = currentNode.rightNodeID;
        if (rightID !== null) {
            queue.push(rightID);
        }

        // For nested children, also delete their left siblings (the entire nested level)
        if (currentNodeID !== nodeID) {
            const currentLeftID = currentNode.leftNodeID;
            if (currentLeftID !== null) {
                queue.push(currentLeftID);
            }
        }

        // Free the node
        store[currentNodeID] = null;
        freeSpots.push(currentNodeID);
    }
}
