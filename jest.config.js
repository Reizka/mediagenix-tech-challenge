const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
};
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"]
};

module.exports = createJestConfig(customJestConfig);