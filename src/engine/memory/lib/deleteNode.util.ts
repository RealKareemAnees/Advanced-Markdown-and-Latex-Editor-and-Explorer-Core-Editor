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
    // if the node is invalid or already null, return
    if (nodeID < 0 || nodeID >= store.length || store[nodeID] === null) {
        return;
    }

    const targetNode = store[nodeID];
    if (!targetNode) return;

    // update parent's reference to skip this node
    if (targetNode.parentNodeID !== null) {
        const parentNode = store[targetNode.parentNodeID];
        if (parentNode) {
            // if this node is the left child (next sibling), link parent to this node's left
            if (parentNode.leftNodeID === nodeID) {
                parentNode.leftNodeID = targetNode.leftNodeID;
            }
            // if this node is the right child (nested head), link parent to this node's left
            if (parentNode.rightNodeID === nodeID) {
                parentNode.rightNodeID = targetNode.leftNodeID;
            }
        }
    }

    // update the left sibling's parent reference to point to this node's parent
    if (targetNode.leftNodeID !== null) {
        const leftNode = store[targetNode.leftNodeID];
        if (leftNode) {
            leftNode.parentNodeID = targetNode.parentNodeID;
        }
    }

    // BFS to remove only nested children (right nodes and their descendants)
    const queue: number[] = [nodeID];

    while (queue.length > 0) {
        const currentNodeID = queue.shift() as number;
        const currentNode = store[currentNodeID];

        if (!currentNode) continue;

        // only traverse right children (nested blocks) for deletion
        if (currentNode.rightNodeID !== null) {
            queue.push(currentNode.rightNodeID);
        }

        // for nested children, also delete their left siblings (the entire nested level)
        if (currentNodeID !== nodeID && currentNode.leftNodeID !== null) {
            queue.push(currentNode.leftNodeID);
        }

        // free the node
        store[currentNodeID] = null;
        freeSpots.push(currentNodeID);
    }
}
