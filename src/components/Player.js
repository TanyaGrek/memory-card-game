import React from 'react';

function Player(props) {
  //console.log(props);
  const {player, playerNum, currentPlayer} = props;
  return (
    <div className={currentPlayer + 1 === playerNum ? "player current" : "player"}>
      <div>Player #{playerNum}</div>
      <div>Score: {player}</div>
    </div>
  );
}

export default Player