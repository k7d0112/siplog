import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/src/__test__/jest.setup.ts'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '^next/navigation$': '<rootDir>/__mocks__/next/navigation.ts',
  },
};

export default createJestConfig(config);