module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/*.(test|spec).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{ts,tsx}",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.spec.{ts,tsx}"
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@parkit/ui": "<rootDir>/../../packages/ui/src",
    "^@parkit/shared": "<rootDir>/../../packages/shared/src",
    "^@parkit/types": "<rootDir>/../../packages/types/src"
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/build/"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json"
    }
  }
}; 