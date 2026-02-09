/**
 * memory.bench.ts
 *
 * Comprehensive benchmark suite for the Memory class.
 * Tests all major operations under different scales (small, medium, large).
 * Results are displayed in milliseconds for better readability.
 */

import { Bench } from "tinybench";
import { Memory } from "../Memory";
import { Node } from "../Node";
import type { NodeInterface } from "../../../types/Node.interface";
import { ParagraphEntity } from "../../entities-store/paragraph/ParagraphEntity";

// ============================================================================
// CONFIGURATION
// ============================================================================

const BENCHMARK_TIME_MS = 500;
const WARMUP_TIME_MS = 100;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Helper function to create a node with a paragraph entity
 * @param data - The text data for the paragraph
 * @returns A new node instance
 */
function createParagraphNode(data: string): NodeInterface {
    const entity = new ParagraphEntity(data);
    return new Node(0, null, entity);
}

/**
 * Helper function to populate memory with a specified number of nodes
 * @param memory - The memory instance to populate
 * @param count - Number of nodes to create
 * @returns Array of created node IDs
 */
function populateMemory(memory: Memory, count: number): number[] {
    const nodeIDs: number[] = [];
    for (let i = 0; i < count; i++) {
        const node = createParagraphNode(`Node ${i}`);
        memory.appendNode(node);
        nodeIDs.push(node.ID);
    }
    return nodeIDs;
}

/**
 * Helper function to create a nested structure
 * @param memory - The memory instance
 * @param parentCount - Number of parent nodes
 * @param childrenPerParent - Number of children for each parent
 * @returns Object with parent and child IDs
 */
function createNestedStructure(
    memory: Memory,
    parentCount: number,
    childrenPerParent: number,
): { parentIDs: number[]; childIDs: number[][] } {
    const parentIDs: number[] = [];
    const childIDs: number[][] = [];

    for (let i = 0; i < parentCount; i++) {
        const parent = createParagraphNode(`Parent ${i}`);
        memory.appendNode(parent);
        parentIDs.push(parent.ID);

        const children: number[] = [];
        for (let j = 0; j < childrenPerParent; j++) {
            const child = createParagraphNode(`Child ${i}-${j}`);
            memory.insertChildNode(child, parent.ID);
            children.push(child.ID);
        }
        childIDs.push(children);
    }

    return { parentIDs, childIDs };
}

/**
 * Helper function to format benchmark results with milliseconds
 * @param bench - The benchmark instance
 * @returns Formatted results array with times in milliseconds
 */
function formatResults(bench: Bench) {
    const table = bench.table();
    return table.map((row: any) => {
        // Parse latency avg value like "38.89 ± 0.19%"
        const latencyAvgStr = row["Latency avg (ns)"];
        const latencyMedStr = row["Latency med (ns)"];
        const throughputStr = row["Throughput avg (ops/s)"];

        // Extract the average latency in nanoseconds
        const avgNs = latencyAvgStr
            ? parseFloat(latencyAvgStr.split(" ±")[0])
            : NaN;

        // Extract median latency for min/max (tinybench doesn't provide min/max directly)
        const medNs = latencyMedStr
            ? parseFloat(latencyMedStr.split(" ±")[0])
            : NaN;

        // Extract throughput
        const throughput = throughputStr
            ? parseInt(throughputStr.replace(/,/g, "").split(" ±")[0])
            : NaN;

        // Extract margin from latency string
        const marginMatch = latencyAvgStr
            ? latencyAvgStr.match(/±\s*([\d.]+)%/)
            : null;
        const margin = marginMatch ? parseFloat(marginMatch[1]) : NaN;

        return {
            "Test Name": row["Task name"],
            "Avg (ms)": !isNaN(avgNs) ? (avgNs / 1_000_000).toFixed(6) : "N/A",
            "Med (ms)": !isNaN(medNs) ? (medNs / 1_000_000).toFixed(6) : "N/A",
            "Ops/sec": !isNaN(throughput) ? throughput.toLocaleString() : "N/A",
            "Margin ±%": !isNaN(margin) ? margin.toFixed(2) : "N/A",
            Samples: row["Samples"] || "N/A",
        };
    });
}

// ============================================================================
// BENCHMARK RUNNER
// ============================================================================

(async () => {
    console.log("\n" + "=".repeat(80));
    console.log("🚀 MEMORY CLASS - COMPREHENSIVE BENCHMARK SUITE");
    console.log("=".repeat(80));

    // ========================================================================
    // 1. NODE RETRIEVAL BENCHMARKS
    // ========================================================================
    console.log("\n📖 1. NODE RETRIEVAL BENCHMARKS");
    console.log("   Testing O(1) node access by ID at different scales\n");
    {
        const bench = new Bench({
            time: BENCHMARK_TIME_MS,
            warmupTime: WARMUP_TIME_MS,
        });

        // Pre-create memories for read-only operations
        const memorySmall = new Memory();
        const idsSmall = populateMemory(memorySmall, 50);
        const idSmall = idsSmall[Math.floor(idsSmall.length / 2)];

        const memoryMedium = new Memory();
        const idsMedium = populateMemory(memoryMedium, 500);
        const idMedium = idsMedium[Math.floor(idsMedium.length / 2)];

        const memoryLarge = new Memory();
        const idsLarge = populateMemory(memoryLarge, 5000);
        const idLarge = idsLarge[Math.floor(idsLarge.length / 2)];

        bench
            .add("Get node by ID - 50 nodes", () => {
                memorySmall.getNodeByID(idSmall);
            })
            .add("Get node by ID - 500 nodes", () => {
                memoryMedium.getNodeByID(idMedium);
            })
            .add("Get node by ID - 5000 nodes", () => {
                memoryLarge.getNodeByID(idLarge);
            });

        await bench.run();
        console.table(formatResults(bench));
    }

    // ========================================================================
    // 2. APPEND NODE BENCHMARKS
    // ========================================================================
    console.log("\n➕ 2. APPEND NODE BENCHMARKS");
    console.log("   Testing sequential node appending at various scales\n");
    {
        const bench = new Bench({
            time: BENCHMARK_TIME_MS,
            warmupTime: WARMUP_TIME_MS,
        });

        bench
            .add("Append 10 nodes sequentially", () => {
                const memory = new Memory();
                for (let i = 0; i < 10; i++) {
                    memory.appendNode(createParagraphNode(`Node ${i}`));
                }
            })
            .add("Append 100 nodes sequentially", () => {
                const memory = new Memory();
                for (let i = 0; i < 100; i++) {
                    memory.appendNode(createParagraphNode(`Node ${i}`));
                }
            })
            .add("Append 1000 nodes sequentially", () => {
                const memory = new Memory();
                for (let i = 0; i < 1000; i++) {
                    memory.appendNode(createParagraphNode(`Node ${i}`));
                }
            });

        await bench.run();
        console.table(formatResults(bench));
    }

    // ========================================================================
    // 3. INSERT NODE BELOW BENCHMARKS
    // ========================================================================
    console.log("\n⬇️  3. INSERT NODE BELOW BENCHMARKS");
    console.log("   Testing node insertion at different positions\n");
    {
        const bench = new Bench({
            time: BENCHMARK_TIME_MS,
            warmupTime: WARMUP_TIME_MS,
        });

        bench
            .add("Insert at head (beginning)", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                memory.insertNodeBelow(createParagraphNode("New"), ids[0]);
            })
            .add("Insert at middle position", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                memory.insertNodeBelow(
                    createParagraphNode("New"),
                    ids[Math.floor(ids.length / 2)],
                );
            })
            .add("Insert before tail", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                // Insert before the last node (not at tail which triggers appendNode)
                memory.insertNodeBelow(
                    createParagraphNode("New"),
                    ids[ids.length - 2],
                );
            });

        await bench.run();
        console.table(formatResults(bench));
    }

    // ========================================================================
    // 4. BATCH INSERT BENCHMARKS
    // ========================================================================
    console.log("\n⬇️⬇️  4. BATCH INSERT BENCHMARKS");
    console.log("   Testing bulk node insertion operations\n");
    {
        const bench = new Bench({
            time: BENCHMARK_TIME_MS,
            warmupTime: WARMUP_TIME_MS,
        });

        bench
            .add("Insert 10 nodes in batch", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                const newNodes = Array.from({ length: 10 }, (_, i) =>
                    createParagraphNode(`New ${i}`),
                );
                memory.insertMultipleNodesBelow(newNodes, ids[0]);
            })
            .add("Insert 50 nodes in batch", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 100);
                const newNodes = Array.from({ length: 50 }, (_, i) =>
                    createParagraphNode(`New ${i}`),
                );
                memory.insertMultipleNodesBelow(newNodes, ids[0]);
            })
            .add("Insert 100 nodes in batch", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 500);
                const newNodes = Array.from({ length: 100 }, (_, i) =>
                    createParagraphNode(`New ${i}`),
                );
                memory.insertMultipleNodesBelow(newNodes, ids[0]);
            });

        await bench.run();
        console.table(formatResults(bench));
    }

    // ========================================================================
    // 5. DELETE NODE BENCHMARKS
    // ========================================================================
    console.log("\n🗑️  5. DELETE NODE BENCHMARKS");
    console.log("   Testing single node deletion at different positions\n");
    {
        const bench = new Bench({
            time: BENCHMARK_TIME_MS,
            warmupTime: WARMUP_TIME_MS,
        });

        bench
            .add("Delete node at head", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                memory.deleteNode(ids[0]);
            })
            .add("Delete node at middle", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                memory.deleteNode(ids[Math.floor(ids.length / 2)]);
            })
            .add("Delete node at tail", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                memory.deleteNode(ids[ids.length - 1]);
            })
            .add("Delete node with nested children", () => {
                const memory = new Memory();
                const { parentIDs } = createNestedStructure(memory, 10, 5);
                memory.deleteNode(parentIDs[0]);
            });

        await bench.run();
        console.table(formatResults(bench));
    }

    // ========================================================================
    // 6. BATCH DELETE BENCHMARKS
    // ========================================================================
    console.log("\n🗑️🗑️  6. BATCH DELETE BENCHMARKS");
    console.log("   Testing bulk node deletion operations\n");
    {
        const bench = new Bench({
            time: BENCHMARK_TIME_MS,
            warmupTime: WARMUP_TIME_MS,
        });

        bench
            .add("Delete 10 nodes in batch", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 100);
                memory.deleteMultipleNodes(ids.slice(0, 10));
            })
            .add("Delete 50 nodes in batch", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 500);
                memory.deleteMultipleNodes(ids.slice(0, 50));
            })
            .add("Delete 100 nodes in batch", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 1000);
                memory.deleteMultipleNodes(ids.slice(0, 100));
            });

        await bench.run();
        console.table(formatResults(bench));
    }

    // ========================================================================
    // 7. MOVE NODE BENCHMARKS
    // ========================================================================
    console.log("\n↔️  7. MOVE NODE BENCHMARKS");
    console.log("   Testing node repositioning operations\n");
    {
        const bench = new Bench({
            time: BENCHMARK_TIME_MS,
            warmupTime: WARMUP_TIME_MS,
        });

        bench
            .add("Move node to adjacent position", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                memory.moveNodeBelow(ids[10], ids[11]);
            })
            .add("Move node across document", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                memory.moveNodeBelow(ids[5], ids[45]);
            })
            .add("Move node in large document", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 500);
                memory.moveNodeBelow(ids[50], ids[450]);
            });

        await bench.run();
        console.table(formatResults(bench));
    }

    // ========================================================================
    // 8. BATCH MOVE BENCHMARKS
    // ========================================================================
    console.log("\n↔️↔️  8. BATCH MOVE BENCHMARKS");
    console.log("   Testing bulk node repositioning operations\n");
    {
        const bench = new Bench({
            time: BENCHMARK_TIME_MS,
            warmupTime: WARMUP_TIME_MS,
        });

        bench
            .add("Move 5 nodes in batch", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                memory.moveMultipleNodesBelow(ids.slice(0, 5), ids[40]);
            })
            .add("Move 10 nodes in batch", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 100);
                memory.moveMultipleNodesBelow(ids.slice(0, 10), ids[80]);
            })
            .add("Move 50 nodes in batch", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 500);
                memory.moveMultipleNodesBelow(ids.slice(0, 50), ids[400]);
            });

        await bench.run();
        console.table(formatResults(bench));
    }

    // ========================================================================
    // 9. CHILD NODE OPERATIONS BENCHMARKS
    // ========================================================================
    console.log("\n👶 9. CHILD NODE OPERATIONS BENCHMARKS");
    console.log("   Testing nested node operations\n");
    {
        const bench = new Bench({
            time: BENCHMARK_TIME_MS,
            warmupTime: WARMUP_TIME_MS,
        });

        bench
            .add("Insert child node (simple)", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                memory.insertChildNode(createParagraphNode("Child"), ids[0]);
            })
            .add("Insert child 10 levels deep", () => {
                const memory = new Memory();
                const parent = createParagraphNode("Root");
                memory.appendNode(parent);
                let currentID = parent.ID;
                for (let i = 0; i < 10; i++) {
                    const child = createParagraphNode(`Level ${i}`);
                    memory.insertChildNode(child, currentID);
                    currentID = child.ID;
                }
            })
            .add("Move node as child", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                memory.appendChildNode(ids[10], ids[0]);
            })
            .add("Move 5 nodes as children", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                memory.appendMultipleChildNodes(ids[0], ids.slice(1, 6));
            });

        await bench.run();
        console.table(formatResults(bench));
    }

    // ========================================================================
    // 10. DUPLICATE NODE BENCHMARKS
    // ========================================================================
    console.log("\n📋 10. DUPLICATE NODE BENCHMARKS");
    console.log("   Testing node duplication operations\n");
    {
        const bench = new Bench({
            time: BENCHMARK_TIME_MS,
            warmupTime: WARMUP_TIME_MS,
        });

        bench
            .add("Duplicate single node", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                memory.duplicateNode(ids[0]);
            })
            .add("Duplicate node with children", () => {
                const memory = new Memory();
                const { parentIDs } = createNestedStructure(memory, 5, 10);
                memory.duplicateNode(parentIDs[0]);
            })
            .add("Duplicate 10 nodes in batch", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);
                memory.duplicateMultipleNodes(ids.slice(0, 10));
            })
            .add("Duplicate 50 nodes in batch", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 500);
                memory.duplicateMultipleNodes(ids.slice(0, 50));
            });

        await bench.run();
        console.table(formatResults(bench));
    }

    // ========================================================================
    // 11. MEMORY MANAGEMENT BENCHMARKS
    // ========================================================================
    console.log("\n🧹 11. MEMORY MANAGEMENT BENCHMARKS");
    console.log("   Testing memory clearing operations\n");
    {
        const bench = new Bench({
            time: BENCHMARK_TIME_MS,
            warmupTime: WARMUP_TIME_MS,
        });

        bench
            .add("Clear memory - 50 nodes", () => {
                const memory = new Memory();
                populateMemory(memory, 50);
                memory.clearMemory();
            })
            .add("Clear memory - 500 nodes", () => {
                const memory = new Memory();
                populateMemory(memory, 500);
                memory.clearMemory();
            })
            .add("Clear memory - 5000 nodes", () => {
                const memory = new Memory();
                populateMemory(memory, 5000);
                memory.clearMemory();
            });

        await bench.run();
        console.table(formatResults(bench));
    }

    // ========================================================================
    // 12. EXPORT BENCHMARKS
    // ========================================================================
    console.log("\n💾 12. EXPORT BENCHMARKS");
    console.log("   Testing JSON serialization performance\n");
    {
        const bench = new Bench({
            time: BENCHMARK_TIME_MS,
            warmupTime: WARMUP_TIME_MS,
        });

        // Pre-create memories for read-only export operations
        const memory50 = new Memory();
        populateMemory(memory50, 50);

        const memory500 = new Memory();
        populateMemory(memory500, 500);

        const memory5000 = new Memory();
        populateMemory(memory5000, 5000);

        const memoryNested = new Memory();
        createNestedStructure(memoryNested, 100, 5);

        bench
            .add("Export 50 nodes to JSON", () => {
                memory50.exportMemory();
            })
            .add("Export 500 nodes to JSON", () => {
                memory500.exportMemory();
            })
            .add("Export 5000 nodes to JSON", () => {
                memory5000.exportMemory();
            })
            .add("Export nested structure (100×5)", () => {
                memoryNested.exportMemory();
            });

        await bench.run();
        console.table(formatResults(bench));
    }

    // ========================================================================
    // 13. COMPLEX OPERATIONS BENCHMARKS
    // ========================================================================
    console.log("\n🔧 13. COMPLEX OPERATIONS BENCHMARKS");
    console.log("   Testing real-world mixed operation scenarios\n");
    {
        const bench = new Bench({
            time: BENCHMARK_TIME_MS,
            warmupTime: WARMUP_TIME_MS,
        });

        bench
            .add("Build and reorganize document (100 ops)", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 50);

                // Append 10 new nodes
                for (let i = 0; i < 10; i++) {
                    memory.appendNode(createParagraphNode(`New ${i}`));
                }

                // Duplicate 5 nodes
                for (let i = 0; i < 5; i++) {
                    memory.duplicateNode(ids[i]);
                }

                // Delete 5 nodes
                for (let i = 0; i < 5; i++) {
                    memory.deleteNode(ids[i + 10]);
                }

                // Move 5 nodes
                for (let i = 0; i < 5; i++) {
                    memory.moveNodeBelow(ids[i + 20], ids[i + 30]);
                }
            })
            .add("Complex nested operations", () => {
                const memory = new Memory();
                const { parentIDs, childIDs } = createNestedStructure(
                    memory,
                    20,
                    5,
                );

                // Reparent children
                for (let i = 0; i < 5; i++) {
                    memory.appendChildNode(
                        childIDs[i][0],
                        parentIDs[(i + 5) % parentIDs.length],
                    );
                }

                // Duplicate parents
                for (let i = 0; i < 3; i++) {
                    memory.duplicateNode(parentIDs[i]);
                }

                // Delete children
                for (let i = 0; i < 5; i++) {
                    memory.deleteNode(childIDs[i][1]);
                }
            })
            .add("Frequent free spot reuse", () => {
                const memory = new Memory();
                const ids = populateMemory(memory, 100);

                for (let i = 0; i < 20; i++) {
                    memory.deleteNode(ids[i]);
                    memory.appendNode(createParagraphNode(`Reused ${i}`));
                }
            });

        await bench.run();
        console.table(formatResults(bench));
    }

    // ========================================================================
    // 14. STRESS TEST BENCHMARKS
    // ========================================================================
    console.log("\n💪 14. STRESS TEST BENCHMARKS");
    console.log("   Testing performance under extreme conditions\n");
    {
        const bench = new Bench({
            time: BENCHMARK_TIME_MS,
            warmupTime: WARMUP_TIME_MS,
        });

        bench
            .add("Rapidly append 1000 nodes", () => {
                const memory = new Memory();
                for (let i = 0; i < 1000; i++) {
                    memory.appendNode(createParagraphNode(`Node ${i}`));
                }
            })
            .add("Deeply nested structure (100 levels)", () => {
                const memory = new Memory();
                const root = createParagraphNode("Root");
                memory.appendNode(root);
                let currentID = root.ID;
                for (let i = 0; i < 100; i++) {
                    const child = createParagraphNode(`Level ${i}`);
                    memory.insertChildNode(child, currentID);
                    currentID = child.ID;
                }
            })
            .add("Wide nested structure (100×50)", () => {
                const memory = new Memory();
                createNestedStructure(memory, 100, 50);
            });

        await bench.run();
        console.table(formatResults(bench));
    }

    console.log("\n" + "=".repeat(80));
    console.log("✅ BENCHMARK SUITE COMPLETED");
    console.log("=".repeat(80) + "\n");
})();
