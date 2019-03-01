import * as React from 'react'
import styled from 'styled-components'

const PLAYER_ONE_PIECE_COLOR = 'red'
const PLAYER_TWO_PIECE_COLOR = 'yellow'

const Container = styled.main`
  display: flex;
`

const Column = styled.div`
  cursor: pointer;
`

const Cell = styled.div`
  background-color: ${({ piece }) => piece || '#ffffff'};
  padding: 10px;
`

const initialGrid = [...Array(7).keys()].map(() =>
  [...Array(6).keys()].map(() => '')
)
const initialPieceColor = PLAYER_ONE_PIECE_COLOR

const hasPiece = (cell: string) => !!cell

export const Board = () => {
  const [grid, setGrid] = React.useState(initialGrid)
  const [nextPieceColor, setNextPieceColor] = React.useState(initialPieceColor)

  return (
    <Container>
      {grid.map((column, i) => (
        <Column
          data-column={i}
          key={i}
          onClick={() => {
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
          }}
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
