import { Grid } from './Board'

const getVerticalWinner = (grid: Grid): string | null => {
  let counter = 1
  return grid.slice(0, 3).reduce(
    (winningColor: string | null, column) =>
      winningColor
        ? winningColor
        : column.reduce((color, cell, i) => {
            if (color) return color
            const nextCell = column[i + 1]
            if (cell && cell === nextCell) {
              counter++

              if (counter === 4) {
                return cell
              }
            } else {
              counter = 1
              return color
            }
          }, winningColor),
    null
  )
}

export const getHorizontalWinner = (grid: Grid): string | null =>
  grid
    .slice(0, 4)
    .reduce(
      (winningColor: string | null, column, j) =>
        winningColor
          ? winningColor
          : column.reduce(
              (color, cell, i) =>
                color ||
                [...Array(3).keys()].every(
                  (streak) => cell === grid[j + streak + 1][i]
                )
                  ? cell
                  : color,
              winningColor
            ),
      null
    )

export const getWinner = (grid: Grid): string | null =>
  getVerticalWinner(grid) || getHorizontalWinner(grid)
