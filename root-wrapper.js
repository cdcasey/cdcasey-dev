/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/display-name */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import { Code } from './src/components/Code';

const components = {
  h2: ({ children }) => <h2 style={{ color: 'rebeccapurple' }}>{children}</h2>,
  'p.inlineCode': (props) => <code style={{ backgroundColor: 'lightgray' }} {...props}></code>,
  pre: ({ children: { props: childProps } }) => {
    if (childProps.mdxType === 'code') {
      return (
        <Code
          codeString={childProps.children.trim()}
          language={childProps.className && childProps.className.replace('language-', '')}
          {...childProps}
        />
      );
    }
  },
};

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
);
