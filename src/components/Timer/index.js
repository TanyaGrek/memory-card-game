import React from 'react';
import './index.scss'

function Timer(props) {
  const {time} = props;
  return (
    <div className="timer">
      <div>Round time</div>
      <div>{time} sec</div>
    </div>
  );
}

export default Timer