module.exports = {
  preset: 'jest-playwright-preset',
  testMatch: ['**/*.pw-spec.ts'],
  transform: {"^.+\\.tsx?$": "ts-jest"},
}