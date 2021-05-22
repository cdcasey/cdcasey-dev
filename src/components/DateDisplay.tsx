import React from 'react'
import styled from '@emotion/styled'
import moment from 'moment'

type DateProps = {
  date: string
}

export function DateDisplay({ date }: DateProps) {
  const publishedDate = moment(date).format('YYYY MMMM Do')

  return (
    <StyledDate>
      <time dateTime={date}>{publishedDate}</time>
    </StyledDate>
  )
}

const StyledDate = styled.p`
  font-size: 0.9375rem;
  color: #6c6c6c;
`
