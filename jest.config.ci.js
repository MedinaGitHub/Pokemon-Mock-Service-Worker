module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-.*|@react-navigation|expo.*|msw)/)'
  ],
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    '!**/*.d.ts',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  // Specific configuration for CI/CD
  testEnvironmentOptions: {
    // Ensure browser polyfills are not used
    pretendToBeVisual: false,
  },
  // For CI/CD pipelines
  verbose: true,
  detectOpenHandles: true,
  forceExit: true,
  // Coverage configuration for Bitbucket reports
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage',
}; 