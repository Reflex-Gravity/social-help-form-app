module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(mjs|js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'mjs'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  testMatch: ['<rootDir>/test/**/*.test.js'],
};
