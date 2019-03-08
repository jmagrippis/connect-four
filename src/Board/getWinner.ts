import { Grid } from './Board'

export const getVerticalWinner = (grid: Grid): string | null => {
  let counter = 1
  return grid.reduce(
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

export const getWinner = (grid: Grid): string | null => getVerticalWinner(grid)
