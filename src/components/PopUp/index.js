import React from 'react';
import './index.scss'

function PopUp(props) {
  const {closePopUp, children} = props;
  return (
    <div className="pop-up">
      <div className="close" onClick={closePopUp}/>
      {children}
    </div>
  );

}

export default PopUp