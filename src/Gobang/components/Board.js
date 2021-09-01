import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Squares from './Squares'

const Title = styled.div`
  margin-top: 40px;
  border-bottom: 2px solid black;
  border-top: 2px solid black;
  padding: 15px;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
`

const BoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`

const PlayerStatus = styled.div`
  width: 100%;
  max-width: 200px;
  margin-top: 80px;
  margin-right: 100px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StatusDesc = styled.div`
  padding: 20px;
`

const Restart = styled.button`
  width: 100%;
  padding: 5px 20px;
  background: none;
  border: 1px solid black;
  cursor: pointer;
  transition: .25s;

  &:hover {
    background: grey;
    color: white;
  }
`

const BoardStatus = styled.div`
  padding: 4px;
  border: 3px solid grey;
`

const BoardRow = styled.div`
  &:after {
    clear: both;
    content: "";
    display: table;

  }
`

const Board = () => {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)))
  const [winner, setWinner] = useState(null)
  const blackIsNext = useRef(false)
  const currentX = useRef()
  const currentY = useRef()

  function handleChessClick(x, y) {
    currentX.current = x
    currentY.current = y
    changeBoard()
  }

  function changeBoard() {
    setBoard(board => {
      return board.map((row, y) => {
        if (y !== currentY.current) return row
        return row.map((col, x) => {
          if (x !== currentX.current) return col
          return x = blackIsNext.current ? 'black' : 'white'
        })
      })
    })
  }

  useEffect(() => {
    if (!currentX.current && !currentY.current) return
    calculateWinner(board, currentX.current, currentY.current)

    function calculateWinner(board, x, y) {
      if (
        countChess(board, x, y, -1, 0) + countChess(board, x, y, 1, 0) >= 4 ||
        countChess(board, x, y, 0, -1) + countChess(board, x, y, 0, 1) >= 4 ||
        countChess(board, x, y, 1, 1) + countChess(board, x, y, -1, -1) >= 4 ||
        countChess(board, x, y, -1, 1) + countChess(board, x, y, 1, -1) >= 4
      ) {
        return setWinner(board[y][x])
      }
    }
  }, [board])

  function countChess(board, x, y, directionX, directionY) {
    let totalChess = 0
    let findX = x + directionX
    let findY = y + directionY

    while (board[findY] && board[findY][findX] === board[y][x]) {
      findX = findX + directionX
      findY = findY + directionY
      totalChess++
    }
    return totalChess
  }

  function handleRestartClick() {
    window.location.reload()
  }

  return (
    <>
      <Title>Gobang</Title>
      <BoardWrapper>
        <PlayerStatus>
          {
            (winner && <StatusDesc>Winner : {winner}</StatusDesc>) ||
            (!winner && <StatusDesc>Next Player : {blackIsNext.current ? 'black' : 'white'}</StatusDesc>)
          }
          <Restart onClick={handleRestartClick}>Restart</Restart>
        </PlayerStatus>
        <BoardStatus>
          {board.map((row, y) => {
            return (
              <BoardRow key={y}>
                {row.map((col, x) => {
                  return <Squares key={x} x={x} y={y} blackIsNext={blackIsNext} handleChessClick={handleChessClick} winner={winner} />
                })}
              </BoardRow>
            )
          })}
        </BoardStatus>
      </BoardWrapper>
    </>
  )
}

export default Board;
