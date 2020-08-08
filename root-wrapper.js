/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/display-name */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import { Code } from './src/components/Code';

const components = {
  h2: ({ children }) => <h2 style={{ color: 'rebeccapurple' }}>{children}</h2>,
  'p.inlineCode': (props) => (
    <code style={{ backgroundColor: 'lavender', padding: '2px 4px', borderRadius: 3 }} {...props} />
  ),
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
    return null;
  },
};

// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
);
