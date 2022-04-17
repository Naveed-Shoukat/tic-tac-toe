import React from 'react';
import Square from './Square';

export default function Board(props) {
  const renderSquare = (i) => {
    let winningSquare = props.winner && props.winner.includes(i) ? true : false;
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        winningSquare={winningSquare}
      />
    );
  };

  const render = () => {
    const myBoard = [];
    for (let i = 0, row = 0; row < 3; row++) {
      const rowData = [];
      for (let col = 0; col < 3; col++, i++) {
        rowData.push(renderSquare(i));
      }
      myBoard.push(<div className="board-row">{rowData}</div>);
    }
    return myBoard;
  };

  return <div>{render()}</div>;
}
