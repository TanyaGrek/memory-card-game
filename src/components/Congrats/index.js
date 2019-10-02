import React from 'react';
import './index.scss'

function Congrats(props) {
  const {winner, maxScore} = props;
  return (
    <div className="congrats">
      <div>Congratulations!</div>
      <div>Player #{winner} won!</div>
      <h1>Score: {maxScore}</h1>
    </div>
  );
}

export default Congrats