---
title: Adding Styling
date: 2020-08-17
published: true
tags: ['site info']
excerpt: Making things look good
---

_A quick note about SEO_: [react-seo-component](https://github.com/spences10/react-seo-component) made everything super-easy.

I had grand plans of using Emotion to create a theme, but then somehow I stumbled on [Typography.js](https://kyleamathews.github.io/typography.js/). It made styling the site text as easy as adding the plugin to `gatsby-config.js` and pointing it to a file with the following line:

```js
const typography = new Typography(github);
```

Then it was time to add the ability to highlight individual lines. I figured out the solution when I realized that everything after the language modifier in the markdown files became part of a `metastring` prop that gets passed to the `Code.tsx` component from the MDXProvider. With that knowledge, I could modify `Code.tsx` to look for line numbers (with help of the `parse-numeric-range` library):

```typescript 5-7,15-31
export const Code = ({ codeString, language, ...props }: CodeProps): React.ReactElement => {

...

  const { metastring } = props;
  let numbers: number[] = [];
  numbers = rangeParser(metastring);

...

  return (

...

              let highlightClass = css``;
              if (numbers.indexOf(i + 1) !== -1) {
                highlightClass = css`
                  background-color: rgb(53, 59, 69, 0.9);
                `;
              }

              let diffClass = css``;
              if (firstToken.content.startsWith('+')) {
                diffClass = css`
                  background-color: darkgreen;
                `;
              } else if (firstToken.content.startsWith('-')) {
                diffClass = css`
                  background-color: darkred;
                `;
              }

...

```

Then all I had to do was to add line numbers after the language for highlighting of individial lines, or att a `+` or `-` to make something look like a git diff. Not perfectly generalized, but good enough for my blog!

````markdown
```javascript 1-3,5
<code snippet>
+ git diff add
- git diff remove
```
````

It occurs to me that with line highlighting, I'll probably never use the git diff functionality. But it looks cool, so I leave it in. I now have a theme that I like, line highlighting, AND the copy button. Time to start publishing.
