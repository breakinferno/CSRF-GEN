const transformIgnorePatterns = [
  '/dist/',
  'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
];

module.exports = {
  name: 'csrf-token',
  verbose: true,
//   setupFiles: [
//     './tests/setup.js',
//   ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'md',
  ],
  modulePathIgnorePatterns: [
    // '/_site/',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    'node',
  ],
  transform: {
    "^.+\\.(tsx?|jsx)$": "ts-jest"
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  collectCoverageFrom: [
    // 'components/**/*.{ts,tsx}',
    // '!components/*/style/index.tsx',
    // '!components/style/index.tsx',
    // '!components/*/locale/index.tsx',
    // '!components/*/__tests__/**/type.tsx',
    // '!components/**/*/interface.{ts,tsx}',
  ],
  transformIgnorePatterns,
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
};