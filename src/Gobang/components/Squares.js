import styled from 'styled-components'
import { useState } from 'react'

const Square = styled.button`
  background: #FFFFFF;
  border: 1px solid #000000;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 30px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 30px;

  &:focus {
    outline: none;
  }
`

const Chess = styled.div`
  box-sizing: border-box;
  z-index: 1;
  width: 100%;
  height: 100%;
  transform: scale(0.95);
  border-radius: 50%;

  ${(props) => props.color === 'black' && `
    background : black;
    border: 1px solid black;
  `}
  ${(props) => props.color === 'white' && `
    background : white;
    border: 1px solid black;
  `}
`

const Squares = ({ x, y, blackIsNext, handleChessClick, winner }) => {

  const [color, setColor] = useState(null)

  function handleClick() {
    if (color) return
    if (winner) return
    blackIsNext.current ? setColor('white') : setColor('black')
    blackIsNext.current = !blackIsNext.current
    handleChessClick(x, y)
  }

  return (
    <Square onClick={handleClick}>
      <Chess color={color} />
    </Square>
  )
}

export default Squares;
