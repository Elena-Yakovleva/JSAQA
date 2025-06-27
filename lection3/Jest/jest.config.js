/* eslint-disable no-undef */
module.exports = {
  verbose: true, // Показывать подробности прохождения тестов
  collectCoverage: true, // Сбор данных о покрытии тестов
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js',
  ],
};
