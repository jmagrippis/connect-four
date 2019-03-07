import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`

type Props = {
  winner: string
}

export const WinScreen = ({ winner }: Props) => (
  <Container data-winner={winner}>
    🎉 <strong>{winner.toUpperCase()}</strong> wins 🎉
  </Container>
)
