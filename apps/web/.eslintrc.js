module.exports = {
  extends: [
    '../../.eslintrc.js',
    'next/core-web-vitals',
    'next/typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // Next.js specific rules
    '@next/next/no-img-element': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
}; 