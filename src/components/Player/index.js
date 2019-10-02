import React from 'react';
import './index.scss'

function Player(props) {
  const {player, playerNum, currentPlayer} = props;
  return (
    <div className={currentPlayer + 1 === playerNum ? "player current" : "player"}>
      <div>Player #{playerNum}</div>
      <div>Score: {player}</div>
    </div>
  );
}

export default Player