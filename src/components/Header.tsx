import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const StyledH1 = styled.h1`
  color: rebeccapurple;
`;

StyledH1.defaultProps = { className: 'site-header' };

type HeaderProps = {
  siteTitle: string;
  siteDescription?: string;
};

// interface HeaderProps {
//   siteTitle: string,
//   siteDescription: string,
// }

const defaultProps = {
  siteDescription: 'hi',
};

export function Header({ siteTitle, siteDescription }: HeaderProps): React.ReactElement {
  return (
    <Link to="/">
      <StyledH1>{siteTitle}</StyledH1>
      <p>{siteDescription}</p>
    </Link>
  );
}

Header.defaultProps = defaultProps;

export default Header;
// export function Header({ siteTitle, siteDescription }: HeaderProps): React.ReactElement<HeaderProps> {
//   return (
//     <Link to="/">
//       <StyledH1>{siteTitle}</StyledH1>
//       <p>{siteDescription}</p>
//     </Link>
//   );
// }

// export const Header: React.FC<HeaderProps> = ({ siteTitle, siteDescription }: HeaderProps) => {
//   return (
//     <Link to="/">
//       <StyledH1>{siteTitle}</StyledH1>
//       <p>{siteDescription}</p>
//     </Link>
//   );
// }
