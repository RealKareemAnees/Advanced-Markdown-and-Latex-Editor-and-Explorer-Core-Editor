/**
 * DOM utility helper for getting the document object
 * Works in both browser and Jest/jsdom environments
 */

/**
 * Get the document object in a way that works in both browser and test environments
 * @returns The document object
 */
export function getDocument(): Document {
    // Try to access document directly first (works in jsdom)
    try {
        if (typeof document !== "undefined" && document) {
            return document;
        }
    } catch (e) {
        // document not available in this scope
    }

    // Check window (browser)
    try {
        if (typeof window !== "undefined" && window.document) {
            return window.document;
        }
    } catch (e) {
        // window not available
    }

    // Check globalThis (works in Node 12+)
    try {
        if (typeof globalThis !== "undefined" && (globalThis as any).document) {
            return (globalThis as any).document;
        }
    } catch (e) {
        // globalThis not available
    }

    // Check global (Node/Jest)
    try {
        //@ts-ignore
        if (typeof global !== "undefined" && (global as any).document) {
            //@ts-ignore
            return (global as any).document;
        }
    } catch (e) {
        // global not available
    }

    throw new Error(
        "Document object is not available. Make sure testEnvironment is set to 'jsdom' in Jest config.",
    );
}
