/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    // Use ts-jest preset for TypeScript support
    preset: "ts-jest",

    // Use jsdom environment for DOM testing
    testEnvironment: "jsdom",

    // Root directory for tests
    roots: ["<rootDir>/tests", "<rootDir>/src"],

    // Test file patterns
    testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],

    // Module name mapper for path aliases (if needed)
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },

    // Transform files using ts-jest
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.test.json",
                useESM: false,
            },
        ],
    },

    // Support for ES modules
    extensionsToTreatAsEsm: [],

    // Coverage configuration
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.d.ts",
        "!src/**/*.interface.ts",
    ],

    // Setup files - run before test environment is set up (needed for localStorage)
    setupFiles: ["<rootDir>/tests/setup.ts"],

    // Verbose output
    verbose: true,

    // Module file extensions
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    // Ignore CSS imports in tests
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
};
