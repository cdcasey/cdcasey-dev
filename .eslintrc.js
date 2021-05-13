module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'react/jsx-fragments': [2, 'element'],
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }], // allow JSX in TS files
    // Latest typescript-eslint reports import React as an error if React isn't explicitly used
    'no-use-before-define': 'off',
  },
  overrides: [
    {
      files: '**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'eslint-config-prettier/@typescript-eslint',
      ],
      rules: {
        'import/extensions': ['error', 'never'],
      },
    },
  ],
  settings: {
    //   react: {
    //     version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    //   },
    // 'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    // not sure this actually did anything. Update: it did SOMETHING for module imports (plus the TS rules)
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
}
