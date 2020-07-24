---
title: Adding TypeScript
date: 2020-07-23
published: true
tags: site info
---

# Adding TypeScript Support

I am a complete TypeScript n00b, but I love everything about it that I have used so far. This section is fraught with peril, but I'm confident things will turn out ok in the end. It does occur to me at this point that I could have just used [this starter](https://www.gatsbyjs.org/starters/tylergreulich/gatsby-typescript-mdx-prismjs-starter/) and swapped out Emotion for Styled Component. But miss out on all the learning that comes from building it myself? No thank you.

## Adding TypeScript Itself

The first step is to run the following commands:

```
yarn add typescript gatsby-plugin-typescript
```

```
npx install-peerdeps --dev eslint-config-airbnb
```

Today I found out that this works with Yarn (from a prompt)! I would like to take this moment to say that the very idea of peer dependencies just seems dumb.

```
yarn add -D @types/react @types/react-dom @types/node eslint eslint-config-prettier eslint-plugin-prettier
```

Now it's time to add `` `gatsby-plugin-typescript` `` to the plugins section of `gatsby-config.js`.

Finally, it's time for some configs. I have eslint configurations for a small TypeScript project that I did, and I have one for a Gatsby project that I did. However, they use different parsers, so I'm not sure what the right thing do do it here. For now, I copy the one from the TypeScript project and see how it goes.

.eslintrc.js

```javascript
module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'airbnb',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
```

I like to be able to lint from the command line, so I add the following to the scrips section of my `package.json`:

```json
"lint": "eslint -c .eslintrc.js --ext .js --ext .jsx --ext .ts --ext .tsx --ignore-path .gitignore .",
```

Running the linter manually returns an error saying that I forgot the `@typescript-eslint/eslint-plugin`.

```
yarn add -D @typescript-eslint/eslint-plugin
```

Yet another error reveals I need to install the parser manually as well. JavaScript, am I right?

```
yarn add -D @typescript-eslint/parser
```

Now linting works! As I have Prettier installed, I'm deciding to not rely on VS Code's settings and create my own .prettierrc.js.

```javascript
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  arrowParens: 'always',
};
```

Since I have a Prettier configuration for the project, I'd like to be able to run it manually as well. The following go into the scripts section of the `package.json` file:

```json
    "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|jsx|ts|tsx|json|css|scss)\"",
    "format": "yarn prettier -- --write",
```

Now for the `.tsconfig.json` file. As I'm a TypeScript n00b, I just copy and paste the file I have in my existing TS project.

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noEmit": true,
    "jsx": "react",
    "sourceMap": true,
    "declaration": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "experimentalDecorators": true,
    "noFallthroughCasesInSwitch": true,
    "isolatedModules": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "build"]
}
```

Running `yarn develop` reveals that everything is still working. Now I can change things like this

```javascript
export function Layout({ children }) {
  const { title, description } = useSiteMetadata();

  return (
    <AppStyles>
      <Header siteTitle={title} siteDescription={description} />
      {children}
    </AppStyles>
  );
}
```

to this

```javascript
type ExportProps = {
  children: React.ReactChild | React.ReactChildren;
};

export function Layout({ children }: ExportProps): React.ReactElement {
  const { title, description } = useSiteMetadata();

  return (
    <AppStyles>
      <Header siteTitle={title} siteDescription={description} />
      {children}
    </AppStyles>
  );
}
```

Time for a commit, and back to the tutorial tomorrow!
