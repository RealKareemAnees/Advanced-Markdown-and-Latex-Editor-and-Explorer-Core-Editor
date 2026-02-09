/**
 * Utility function to retrieve free spots from the provided freeSpots array.
 * If not enough spots are available, expands the store by adding null entries and returns the additional indices.
 *
 * @param freeSpots - Array of available free spot indices, modified in place.
 * @param store - The store array to expand if needed, modified in place.
 * @param amount - The number of free spots required.
 * @returns An array of free spot indices.
 */
export function getFreeSpots<T>(
    freeSpots: number[],
    store: (T | null)[],
    amount: number,
): number[] {
    const availableCount = freeSpots.length;

    // If we have enough free spots, extract and return them
    if (availableCount >= amount) {
        return freeSpots.splice(0, amount);
    }

    // Extract all available spots
    const spots = freeSpots.splice(0, availableCount);

    // Calculate how many new spots we need
    const needed = amount - availableCount;
    const startIndex = store.length;

    // Pre-allocate space in store (more efficient than pushing one at a time)
    const newLength = startIndex + needed;
    store.length = newLength;

    // Fill the new slots with null and record their indices
    for (let i = 0; i < needed; i++) {
        store[startIndex + i] = null;
        spots.push(startIndex + i);
    }

    return spots;
}
