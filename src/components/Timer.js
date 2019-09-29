import React from 'react';

function Timer(props) {
 // console.log(props);
  const {time} = props;
  return (
    <div className="timer">
      <div>Round time</div>
      <div>0.{time}</div>
    </div>
  );
}

export default Timer