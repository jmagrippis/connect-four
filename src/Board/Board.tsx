import * as React from 'react'
import styled from 'styled-components'

import { WinScreen } from './WinScreen'
import { getWinner } from './getWinner'

export const PLAYER_ONE_PIECE_COLOR = 'red'
export const PLAYER_TWO_PIECE_COLOR = 'yellow'
const BACKGROUND_COLOR = '#ffffff'

const Container = styled.main`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  text-align: center;
`

const Column = styled.div`
  cursor: pointer;
  flex: 1;
`

const Cell = styled.div`
  background-color: ${({ piece }) => piece || BACKGROUND_COLOR};
  padding: 10px;
  border: 1px solid blue;
`

export type Grid = string[][]

const initialGrid: Grid = [...Array(7).keys()].map(() =>
  [...Array(6).keys()].map(() => '')
)
const initialPieceColor = PLAYER_ONE_PIECE_COLOR

const hasPiece = (cell: string) => !!cell

export const Board = () => {
  const [grid, setGrid] = React.useState(initialGrid)
  const [nextPieceColor, setNextPieceColor] = React.useState(initialPieceColor)

  const winner = getWinner(grid)

  return (
    <Container>
      {winner ? <WinScreen winner={winner} /> : null}
      {grid.map((column, i) => (
        <Column
          data-column={i}
          key={i}
          onClick={
            !winner
              ? () => {
                  setGrid(
                    grid.map((g, gi) => {
                      if (i !== gi) return g

                      const firstCellWithPiece = g.findIndex(hasPiece)
                      const cellIndexToColor =
                        firstCellWithPiece !== -1 ? firstCellWithPiece - 1 : 5

                      return g.map((c, ci) =>
                        ci === cellIndexToColor ? nextPieceColor : c
                      )
                    })
                  )
                  setNextPieceColor(
                    nextPieceColor === PLAYER_ONE_PIECE_COLOR
                      ? PLAYER_TWO_PIECE_COLOR
                      : PLAYER_ONE_PIECE_COLOR
                  )
                }
              : undefined
          }
        >
          {column.map((piece, j) => (
            <Cell data-cell={`${i}-${j}`} key={j} piece={piece}>
              {i}-{j}
            </Cell>
          ))}
        </Column>
      ))}
    </Container>
  )
}
