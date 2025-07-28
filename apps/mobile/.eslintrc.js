module.exports = {
  extends: [
    '../../.eslintrc.js',
    '@react-native',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // React Native specific rules
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
  },
  env: {
    'react-native/react-native': true,
  },
  plugins: ['react-native'],
}; 