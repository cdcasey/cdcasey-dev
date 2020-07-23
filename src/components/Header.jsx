import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const StyledH1 = styled.h1`
  color: rebeccapurple;
`;

export function Header({ siteTitle, siteDescription }) {
  return (
    <Link to="/">
      <StyledH1>{siteTitle}</StyledH1>
      <p>{siteDescription}</p>
    </Link>
  );
}
