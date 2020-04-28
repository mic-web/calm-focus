const path = require('path')
const vars = require('./common-vars')

module.exports = {
  rootDir: vars.srcDir,
  setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setup.js')],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
}
