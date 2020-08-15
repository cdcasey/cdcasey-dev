/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import styled from '@emotion/styled';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import theme from 'prism-react-renderer/themes/vsDark';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import rangeParser from 'parse-numeric-range';

import { copyToClipboard } from '../utils/copy-to-clipboard';

export const PositionWrapper = styled.div`
  position: relative;
`;

export const Pre = styled.pre`
  text-align: left;
  margin: 1em auto;
  padding: 0.5em;
  overflow-x: auto;
  border-radius: 3px;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`;

export const CopyCode = styled.button`
  position: absolute;
  top: 0;
  right: 0.25rem;
  border: 0;
  border-radius: 3px;
  margin: 0.25rem;
  opacity: 0.3;

  &:hover {
    opacity: 1;
  }
`;

export const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`;

type CodeProps = {
  codeString: string;
  language: Language;
  'react-live': boolean;
  metastring?: string;
};

const defaultCodeProps = {
  metastring: '',
};

export const Code = ({ codeString, language, ...props }: CodeProps): React.ReactElement => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} noInline theme={theme}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  }

  const { metastring } = props;
  let numbers: number[] = [];
  numbers = rangeParser(metastring);

  const handleClick = () => {
    copyToClipboard(codeString);
  };

  return (
    <Highlight {...defaultProps} code={codeString} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <PositionWrapper>
          <Pre className={className} style={style}>
            <CopyCode onClick={handleClick}>Copy</CopyCode>

            {tokens.map((line, i) => {
              const [firstToken] = line;

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

              return (
                <div
                  css={[diffClass, highlightClass]}
                  key={line.toString()}
                  {...getLineProps({ line, key: i })}
                >
                  <LineNo>{i + 1}</LineNo>
                  {line.map((token, key) => (
                    <span key="token" {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </Pre>
        </PositionWrapper>
      )}
    </Highlight>
  );
};

Code.defaultProps = defaultCodeProps;

export default Code;
