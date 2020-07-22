import React from 'react'
import styled from '@emotion/styled'

import { useSiteMetadata } from '../hooks/useSiteMetadata'
import { Header } from './Header'

const AppStyles = styled.main`
    width: 800px;
    margin: 0 auto;
`

export function Layout({ children }) {
    const { title, description } = useSiteMetadata()

    return (
        <AppStyles>
            <Header siteTitle={title} siteDescription={description} />
            {children}
        </AppStyles>
    )
}