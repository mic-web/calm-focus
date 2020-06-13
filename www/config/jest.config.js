const path = require('path')
const paths = require('./paths')

module.exports = {
  rootDir: paths.srcDir,
  setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setup.js')],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
}
