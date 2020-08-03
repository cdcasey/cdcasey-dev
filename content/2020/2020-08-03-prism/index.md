---
title: Prism
date: 2020-08-03
published: true
tags: site info
---

I follow the tutorial to add syntax highlighting to the code blocks in the MDX files. I have to say, I love the way the code blocks look in the published blog, but I'm not a huge fan of the code itself. It uses `prism-react-renderer` to apply the styles and I must say it looks like a lot more effort than just including PrismJS and linking to a theme in the `gatsby-browser.js` file. The main code that I have a problem with is the `Code.jsx` file:

```jsx
export const Code = ({ codeString, language }) => {
  const handleClick = () => {
    copyToClipboard(codeString);
  };

  return (
    <Highlight {...defaultProps} code={codeString} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          <CopyCode onClick={handleClick}>Copy</CopyCode>
          {tokens.map((line, i) => (
            <div key={line} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              {line.map((token, key) => (
                <span key="token" {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Pre>
      )}
    </Highlight>
  );
};
```

Specifically, I'm having a hard time wrapping my head around the component contained withing the `<Highlight... />` component. In the line `{({ className, style, tokens, getLineProps, getTokenProps })`, where did those props come from? This is a kind of magic that I'm not usually a fan of. I like to be able to read my code and see explicitly where everything comes from. After reading the [documentation](https://github.com/FormidableLabs/prism-react-renderer) for `prism-react-renderer`, however, it's clear to me that the `<Highlight... />` component returns a `highlight` object and applies it to its child component. All of those props are part of that highlight object. I take learning something new as a win, and decide that I'll try a version with just PrismJS at some point in the future.
