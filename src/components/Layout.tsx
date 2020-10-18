import React from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

import { useSiteMetadata } from '../hooks/useSiteMetadata';
import { Header } from './Header';

const Reset = css`
  body {
    padding: 1rem 3rem;
  }
`;

const AppStyles = styled.main`
  max-width: 800px;
  margin: 0 auto;
`;

type ExportProps = {
  children: React.ReactChild | React.ReactChildren | React.ReactElement[];
};

export function Layout({ children }: ExportProps): React.ReactElement {
  const { title, description } = useSiteMetadata();

  return (
    <React.Fragment>
      <Header siteTitle={title} siteDescription={description} />
      <AppStyles>
        <Global styles={Reset} />
        {children}
      </AppStyles>
    </React.Fragment>
  );
}

export default Layout;
