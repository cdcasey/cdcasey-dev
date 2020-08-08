/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import styled from '@emotion/styled';
import theme from 'prism-react-renderer/themes/nightOwl';

import { copyToClipboard } from '../utils/copy-to-clipboard';

export const Pre = styled.pre`
  position: relative;
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
};

export const Code = ({ codeString, language }: CodeProps): React.ReactElement => {
  const handleClick = () => {
    copyToClipboard(codeString);
  };

  return (
    <Highlight {...defaultProps} code={codeString} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          <CopyCode onClick={handleClick}>Copy</CopyCode>
          {tokens.map((line, i) => (
            <div key={line.toString()} {...getLineProps({ line, key: i })}>
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

export default Code;
