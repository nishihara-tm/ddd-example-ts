/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  transformIgnorePatterns: ['/node_modules'],
  extensionsToTreatAsEsm: ['.ts'],
};
