module.exports = {
  displayName: 'Tests Typescript Application - Job',
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/build/'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};