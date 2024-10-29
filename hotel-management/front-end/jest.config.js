module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy", // Mock CSS imports
    "\\.(svg|jpg|jpeg|png|gif)$": "<rootDir>/__mocks__/fileMock.js", // Mock image imports
  },
};
