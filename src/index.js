import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import './index.css';
import calculateWinner from './utils/calculateWinner'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber:0,
      moveRowCol:['No Move'],
    };
  }

  handleClick(params) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const moveRowCol = this.state.moveRowCol.slice(0, this.state.stepNumber + 1);
    if (calculateWinner(squares) || squares[params]) {return;}  

    moveRowCol[this.state.stepNumber+1] = params < 3 ? `Row 1 & Col ${params+1}` 
      : params < 6 ? `Row 2 & Col ${params-2}` : `Row 3 & Col ${params-5}`

    squares[params]= this.state.xIsNext? 'X' : 'O';
    this.setState({
      history: history.concat([{ squares: squares, }]),
      xIsNext:!this.state.xIsNext,
      stepNumber:history.length,
      moveRowCol:moveRowCol,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const moveRowCol = this.state.moveRowCol.map((step, move) => {
      const desc = step ? `${step}` : 'No Move';
      return (
        <li key={move}>
          {/* <button onClick={() => this.jumpTo(move)}>{desc}</button> */}
          <p>{desc}</p>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i)=> this.handleClick(i)}
            winner={winner && winner.winningSquares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="game-info">
          <div>Move Info</div>
          <ol className='label-info'>{moveRowCol}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

