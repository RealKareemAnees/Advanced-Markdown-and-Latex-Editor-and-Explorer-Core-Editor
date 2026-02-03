/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",

    roots: ["<rootDir>/src"],

    testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],

    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.test.json",
                useESM: false,
            },
        ],
    },

    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.d.ts",
        "!src/**/*.interface.ts",
    ],

    verbose: true,

    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
};
