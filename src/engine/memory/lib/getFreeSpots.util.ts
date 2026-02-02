/**
 * Utility function to retrieve free spots from the provided freeSpots array.
 * If not enough spots are available, expands the store by adding null entries and returns the additional indices.
 * @param freeSpots - Array of available free spot indices, modified in place.
 * @param store - The store array to expand if needed, modified in place.
 * @param amount - The number of free spots required.
 * @returns An array of free spot indices.
 */
export function getFreeSpots(
    freeSpots: number[],
    store: any[],
    amount: number,
): number[] {
    // Extract the required number of free spots from the array
    const spots: number[] = freeSpots.splice(0, amount);

    // If not enough spots, expand the store
    if (spots.length < amount) {
        const needed = amount - spots.length;
        const startIndex = store.length;

        for (let i = 0; i < needed; i++) {
            // Add null to the store and record the new index
            store.push(null);
            spots.push(startIndex + i);
        }
    }

    return spots;
}
