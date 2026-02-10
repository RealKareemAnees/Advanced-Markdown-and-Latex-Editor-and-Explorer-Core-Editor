/**
 * history.bench.ts
 *
 * Comprehensive benchmark suite for the History class.
 * Tests all major operations under different scales (small, medium, large).
 */

import { Bench } from "tinybench";
import { History } from "../History";
import { Node } from "../../memory/Node";
import type { NodeInterface } from "../../../types/Node.interface";
import { ParagraphEntity } from "../../../entities/entities-store/paragraph/ParagraphEntity";

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
 * Helper function to create a snapshot (array of nodes)
 * @param count - Number of nodes to create in the snapshot
 * @param prefix - Prefix for node data
 * @returns Array of nodes
 */
function createSnapshot(
    count: number,
    prefix: string = "Node",
): NodeInterface[] {
    const nodes: NodeInterface[] = [];
    for (let i = 0; i < count; i++) {
        nodes.push(createParagraphNode(`${prefix} ${i}`));
    }
    return nodes;
}

/**
 * Helper function to populate history with multiple states
 * @param history - The history instance
 * @param stateCount - Number of states to create
 * @param nodesPerState - Number of nodes in each state
 */
function populateHistory(
    history: History,
    stateCount: number,
    nodesPerState: number,
): void {
    for (let i = 0; i < stateCount; i++) {
        const snapshot = createSnapshot(nodesPerState, `State${i}`);
        history.do(snapshot);
    }
}

// ============================================================================
// MAIN BENCHMARK RUNNER
// ============================================================================

(async () => {
    console.log("🚀 Starting History Benchmark Suite\n");
    console.log("=".repeat(80));

    // ========================================================================
    // 1. DO OPERATION BENCHMARKS
    // ========================================================================
    console.log("\n📝 1. Do Operation Benchmarks");
    {
        const bench = new Bench({ time: 500, warmupTime: 100 });

        bench
            .add("do - 10 small states (10 nodes each)", () => {
                const history = new History();
                for (let i = 0; i < 10; i++) {
                    const snapshot = createSnapshot(10, `State${i}`);
                    history.do(snapshot);
                }
            })
            .add("do - 50 small states (10 nodes each)", () => {
                const history = new History();
                for (let i = 0; i < 50; i++) {
                    const snapshot = createSnapshot(10, `State${i}`);
                    history.do(snapshot);
                }
            })
            .add("do - 100 small states (10 nodes each)", () => {
                const history = new History();
                for (let i = 0; i < 100; i++) {
                    const snapshot = createSnapshot(10, `State${i}`);
                    history.do(snapshot);
                }
            })
            .add("do - 10 medium states (100 nodes each)", () => {
                const history = new History();
                for (let i = 0; i < 10; i++) {
                    const snapshot = createSnapshot(100, `State${i}`);
                    history.do(snapshot);
                }
            })
            .add("do - 10 large states (1000 nodes each)", () => {
                const history = new History();
                for (let i = 0; i < 10; i++) {
                    const snapshot = createSnapshot(1000, `State${i}`);
                    history.do(snapshot);
                }
            });

        await bench.run();
        console.table(bench.table());
    }

    // ========================================================================
    // 2. UNDO OPERATION BENCHMARKS
    // ========================================================================
    console.log("\n⬅️  2. Undo Operation Benchmarks");
    {
        const bench = new Bench({ time: 500, warmupTime: 100 });

        // Setup histories with different sizes
        const historySmall = new History();
        populateHistory(historySmall, 10, 10);

        const historyMedium = new History();
        populateHistory(historyMedium, 50, 10);

        const historyLarge = new History();
        populateHistory(historyLarge, 100, 10);

        const historyDeep = new History();
        populateHistory(historyDeep, 10, 1000);

        bench
            .add("undo - 10 states", () => {
                historySmall.undo();
            })
            .add("undo - 50 states", () => {
                historyMedium.undo();
            })
            .add("undo - 100 states", () => {
                historyLarge.undo();
            })
            .add("undo - large nodes per state", () => {
                historyDeep.undo();
            });

        await bench.run();
        console.table(bench.table());
    }

    // ========================================================================
    // 3. REDO OPERATION BENCHMARKS
    // ========================================================================
    console.log("\n➡️  3. Redo Operation Benchmarks");
    {
        const bench = new Bench({ time: 500, warmupTime: 100 });

        // Setup histories and undo to enable redo
        const historySmall = new History();
        populateHistory(historySmall, 10, 10);
        for (let i = 0; i < 5; i++) historySmall.undo();

        const historyMedium = new History();
        populateHistory(historyMedium, 50, 10);
        for (let i = 0; i < 25; i++) historyMedium.undo();

        const historyLarge = new History();
        populateHistory(historyLarge, 100, 10);
        for (let i = 0; i < 50; i++) historyLarge.undo();

        const historyDeep = new History();
        populateHistory(historyDeep, 10, 1000);
        for (let i = 0; i < 5; i++) historyDeep.undo();

        bench
            .add("redo - 10 states", () => {
                historySmall.redo();
            })
            .add("redo - 50 states", () => {
                historyMedium.redo();
            })
            .add("redo - 100 states", () => {
                historyLarge.redo();
            })
            .add("redo - large nodes per state", () => {
                historyDeep.redo();
            });

        await bench.run();
        console.table(bench.table());
    }

    // ========================================================================
    // 4. MIXED UNDO/REDO SEQUENCES BENCHMARKS
    // ========================================================================
    console.log("\n🔄 4. Mixed Undo/Redo Sequences Benchmarks");
    {
        const bench = new Bench({ time: 500, warmupTime: 100 });

        bench
            .add("mixed - 10 do, 5 undo, 5 redo", () => {
                const history = new History();
                for (let i = 0; i < 10; i++) {
                    history.do(createSnapshot(10));
                }
                for (let i = 0; i < 5; i++) {
                    history.undo();
                }
                for (let i = 0; i < 5; i++) {
                    history.redo();
                }
            })
            .add("mixed - 50 do, 25 undo, 25 redo", () => {
                const history = new History();
                for (let i = 0; i < 50; i++) {
                    history.do(createSnapshot(10));
                }
                for (let i = 0; i < 25; i++) {
                    history.undo();
                }
                for (let i = 0; i < 25; i++) {
                    history.redo();
                }
            })
            .add("mixed - rapid alternating undo/redo (20 cycles)", () => {
                const history = new History();
                populateHistory(history, 20, 10);
                for (let i = 0; i < 20; i++) {
                    history.undo();
                    history.redo();
                }
            })
            .add("mixed - progressive undo then redo all", () => {
                const history = new History();
                populateHistory(history, 50, 10);
                for (let i = 0; i < 50; i++) {
                    history.undo();
                }
                for (let i = 0; i < 50; i++) {
                    history.redo();
                }
            });

        await bench.run();
        console.table(bench.table());
    }

    // ========================================================================
    // 5. HISTORY TRUNCATION BENCHMARKS
    // ========================================================================
    console.log("\n✂️  5. History Truncation Benchmarks");
    {
        const bench = new Bench({ time: 500, warmupTime: 100 });

        bench
            .add("truncation - do after undo (10 states)", () => {
                const history = new History();
                populateHistory(history, 10, 10);
                for (let i = 0; i < 5; i++) {
                    history.undo();
                }
                history.do(createSnapshot(10));
            })
            .add("truncation - do after undo (50 states)", () => {
                const history = new History();
                populateHistory(history, 50, 10);
                for (let i = 0; i < 25; i++) {
                    history.undo();
                }
                history.do(createSnapshot(10));
            })
            .add("truncation - do after undo (100 states)", () => {
                const history = new History();
                populateHistory(history, 100, 10);
                for (let i = 0; i < 50; i++) {
                    history.undo();
                }
                history.do(createSnapshot(10));
            })
            .add("truncation - immediate do after undo", () => {
                const history = new History();
                populateHistory(history, 50, 10);
                history.undo();
                history.do(createSnapshot(10));
            });

        await bench.run();
        console.table(bench.table());
    }

    // ========================================================================
    // 6. GETTER OPERATION BENCHMARKS
    // ========================================================================
    console.log("\n📊 6. Getter Operation Benchmarks");
    {
        const bench = new Bench({ time: 500, warmupTime: 100 });

        // Setup histories
        const historySmall = new History();
        populateHistory(historySmall, 10, 10);
        historySmall.undo();
        historySmall.undo();

        const historyMedium = new History();
        populateHistory(historyMedium, 50, 10);
        for (let i = 0; i < 25; i++) historyMedium.undo();

        const historyLarge = new History();
        populateHistory(historyLarge, 100, 100);
        for (let i = 0; i < 50; i++) historyLarge.undo();

        await bench.run();
        console.table(bench.table());
    }

    // ========================================================================
    // 7. EXPORT OPERATION BENCHMARKS
    // ========================================================================
    console.log("\n💾 7. Export Operation Benchmarks");
    {
        const bench = new Bench({ time: 500, warmupTime: 100 });

        // Pre-create histories for export
        const historySmall = new History();
        populateHistory(historySmall, 10, 10);

        const historyMedium = new History();
        populateHistory(historyMedium, 50, 50);

        const historyLarge = new History();
        populateHistory(historyLarge, 100, 100);

        const historyDeep = new History();
        populateHistory(historyDeep, 10, 1000);

        const historyWide = new History();
        populateHistory(historyWide, 1000, 10);

        bench
            .add("export - 10 states x 10 nodes", () => {
                historySmall.export();
            })
            .add("export - 50 states x 50 nodes", () => {
                historyMedium.export();
            })
            .add("export - 100 states x 100 nodes", () => {
                historyLarge.export();
            })
            .add("export - 10 states x 1000 nodes (deep)", () => {
                historyDeep.export();
            })
            .add("export - 1000 states x 10 nodes (wide)", () => {
                historyWide.export();
            });

        await bench.run();
        console.table(bench.table());
    }

    // ========================================================================
    // 8. INITIALIZATION BENCHMARKS
    // ========================================================================
    console.log("\n🏁 8. Initialization Benchmarks");
    {
        const bench = new Bench({ time: 500, warmupTime: 100 });

        const initialSmall = createSnapshot(10);
        const initialMedium = createSnapshot(100);
        const initialLarge = createSnapshot(1000);
        const initialXLarge = createSnapshot(10000);

        bench
            .add("new History() - empty", () => {
                new History();
            })
            .add("new History(initial) - 10 nodes", () => {
                new History(initialSmall);
            })
            .add("new History(initial) - 100 nodes", () => {
                new History(initialMedium);
            })
            .add("new History(initial) - 1000 nodes", () => {
                new History(initialLarge);
            })
            .add("new History(initial) - 10000 nodes", () => {
                new History(initialXLarge);
            });

        await bench.run();
        console.table(bench.table());
    }

    // ========================================================================
    // 9. BOUNDARY CONDITION BENCHMARKS
    // ========================================================================
    console.log("\n🚧 9. Boundary Condition Benchmarks");
    {
        const bench = new Bench({ time: 500, warmupTime: 100 });

        bench
            .add("undo at beginning (no-op)", () => {
                const history = new History();
                history.undo();
            })
            .add("redo at end (no-op)", () => {
                const history = new History();
                populateHistory(history, 10, 10);
                history.redo();
            })
            .add("do with empty array", () => {
                const history = new History();
                history.do([]);
            })
            .add("multiple undo at beginning", () => {
                const history = new History();
                populateHistory(history, 5, 10);
                for (let i = 0; i < 10; i++) {
                    history.undo();
                }
            })
            .add("multiple redo at end", () => {
                const history = new History();
                populateHistory(history, 5, 10);
                for (let i = 0; i < 10; i++) {
                    history.redo();
                }
            });

        await bench.run();
        console.table(bench.table());
    }

    // ========================================================================
    // 10. COMPLEX WORKFLOW BENCHMARKS
    // ========================================================================
    console.log("\n🔧 10. Complex Workflow Benchmarks");
    {
        const bench = new Bench({ time: 500, warmupTime: 100 });

        bench
            .add("Workflow - typical editing session (30 ops)", () => {
                const history = new History();
                // Simulate typical user editing
                for (let i = 0; i < 10; i++) {
                    history.do(createSnapshot(20));
                }
                // User undoes a few times
                for (let i = 0; i < 3; i++) {
                    history.undo();
                }
                // User makes new changes (truncates history)
                for (let i = 0; i < 5; i++) {
                    history.do(createSnapshot(20));
                }
                // User undoes and redoes
                history.undo();
                history.undo();
                history.redo();
            })
            .add("Workflow - heavy editing (100 changes)", () => {
                const history = new History();
                for (let i = 0; i < 100; i++) {
                    history.do(createSnapshot(50));
                }
            })
            .add("Workflow - exploration (50 do, undo all, redo all)", () => {
                const history = new History();
                for (let i = 0; i < 50; i++) {
                    history.do(createSnapshot(10));
                }
                for (let i = 0; i < 50; i++) {
                    history.undo();
                }
                for (let i = 0; i < 50; i++) {
                    history.redo();
                }
            })
            .add("Workflow - branching history (do after mid-undo)", () => {
                const history = new History();
                for (let i = 0; i < 20; i++) {
                    history.do(createSnapshot(10));
                }
                for (let i = 0; i < 10; i++) {
                    history.undo();
                }
                for (let i = 0; i < 15; i++) {
                    history.do(createSnapshot(10));
                }
                for (let i = 0; i < 7; i++) {
                    history.undo();
                }
                for (let i = 0; i < 5; i++) {
                    history.do(createSnapshot(10));
                }
            });

        await bench.run();
        console.table(bench.table());
    }

    // ========================================================================
    // 11. MEMORY SCALING BENCHMARKS
    // ========================================================================
    console.log("\n📈 11. Memory Scaling Benchmarks");
    {
        const bench = new Bench({ time: 500, warmupTime: 100 });

        bench
            .add("Scaling - 100 states x 10 nodes", () => {
                const history = new History();
                populateHistory(history, 100, 10);
            })
            .add("Scaling - 50 states x 100 nodes", () => {
                const history = new History();
                populateHistory(history, 50, 100);
            })
            .add("Scaling - 10 states x 500 nodes", () => {
                const history = new History();
                populateHistory(history, 10, 500);
            })
            .add("Scaling - 500 states x 10 nodes", () => {
                const history = new History();
                populateHistory(history, 500, 10);
            })
            .add("Scaling - 5 states x 1000 nodes", () => {
                const history = new History();
                populateHistory(history, 5, 1000);
            });

        await bench.run();
        console.table(bench.table());
    }

    // ========================================================================
    // 12. STRESS TEST BENCHMARKS
    // ========================================================================
    console.log("\n💪 12. Stress Test Benchmarks");
    {
        const bench = new Bench({ time: 500, warmupTime: 100 });

        bench
            .add("Stress - 1000 states x 10 nodes", () => {
                const history = new History();
                populateHistory(history, 1000, 10);
            })
            .add("Stress - 100 states x 1000 nodes", () => {
                const history = new History();
                populateHistory(history, 100, 1000);
            })
            .add("Stress - 500 rapid undo/redo cycles", () => {
                const history = new History();
                populateHistory(history, 100, 10);
                for (let i = 0; i < 500; i++) {
                    history.undo();
                    history.redo();
                }
            })
            .add("Stress - deep history with frequent truncation", () => {
                const history = new History();
                for (let i = 0; i < 100; i++) {
                    populateHistory(history, 10, 10);
                    for (let j = 0; j < 5; j++) {
                        history.undo();
                    }
                    history.do(createSnapshot(10));
                }
            });

        await bench.run();
        console.table(bench.table());
    }

    console.log("\n" + "=".repeat(80));
    console.log("✅ Benchmark suite completed\n");
})();
