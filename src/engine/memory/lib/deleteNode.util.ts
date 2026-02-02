/**
 * Utility functions for memory management in the editor engine.
 * This file provides helper functions to manipulate the node store, including deleting nodes.
 */

/**
 * Deletes a node from the store and frees up its memory, including all nested children.
 * This function performs a BFS traversal to remove all child nodes and updates parent references.
 * @param nodeID - The ID of the node to delete.
 * @param store - The array-based store of nodes.
 * @param freeSpots - The array to track freed node IDs for reuse.
 */
export function deleteNode(
    nodeID: number,
    store: any[],
    freeSpots: number[],
): void {
    // if the node is invalid or already null, return
    if (nodeID < 1 || nodeID >= store.length || store[nodeID] === null) {
        return;
    }

    const currentNode = store[nodeID];
    // remove references from parent
    if (currentNode.parentID !== null) {
        const parentNode = store[currentNode.parentID];

        // if the current node is the left child, replace it with its left child
        if (parentNode.leftID === nodeID) {
            parentNode.setLeft(currentNode.leftID);
        }

        // if the current node is the right child, replace it with its left child too
        if (parentNode.rightID === nodeID) {
            parentNode.setRight(currentNode.leftID);
        }
    }

    // BFS to remove all nested child nodes
    let Q: number[] = [];
    Q.push(nodeID);

    // BFS to free all child nodes
    while (Q.length > 0) {
        const currentNodeID = Q.shift() as number;

        const currentNode = store[currentNodeID];

        if (currentNode.rightID !== null) {
            Q.push(currentNode.rightID);
        }
        if (currentNode.leftID !== null) {
            Q.push(currentNode.leftID);
        }

        // free the node
        store[currentNodeID] = null;
        freeSpots.push(currentNodeID);
    }
}
