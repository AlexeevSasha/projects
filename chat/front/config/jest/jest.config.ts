import path from "path";

export default {
  clearMocks: true,
  testEnvironment: "jsdom",
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  moduleDirectories: ["node_modules"],
  testMatch: ["<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>config/jest/jest.setup.ts"],
  rootDir: "../../",
  moduleNameMapper: {
    "\\.s?css$": "identity-obj-proxy",
    "\\.svg": path.resolve(__dirname, "jest.empty.tsx"),
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
