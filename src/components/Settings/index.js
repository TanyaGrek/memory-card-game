import React from 'react';
import './index.scss'

function Settings(props) {
  const {players, timeRange, difficulty, handleChangeSettings, closeSettings, handleStart} = props;
  return (
    <div className="settings-modal">
      <h2>Settings</h2>
      <form className="settings-form">
        <div className="item-row">
          <label>Number of players:</label>
          <span className="row-value">{players}</span>
          <input type="range" min="1" max="4" value={players} name="players"
                 onChange={e => handleChangeSettings(e.target.name, e.target.value)}/>
        </div>
        <div className="item-row">
          <label>Time per user round:</label>
          <span className="row-value">{timeRange}</span>
          <input type="range" min="10" max="30" value={timeRange} name="timeRange"
                 onChange={e => handleChangeSettings(e.target.name, e.target.value)}/>
        </div>
        <div className="item-row">
          <label>Difficulty:</label>
          <label className="radio">
            <input type="radio" name="difficulty" value={1} checked={difficulty === 1}
                   onChange={e => handleChangeSettings(e.target.name, e.target.value)}/>
            <span>Easy</span>
          </label>
          <label className="radio">
            <input type="radio" name="difficulty" value={2} checked={difficulty === 2}
                   onChange={e => handleChangeSettings(e.target.name, e.target.value)}/>
            <span>Hard</span>
          </label>
        </div>
        <div className="btn-bar">
          <button className="btn btn-primary" onClick={handleStart}>Confirm and start</button>
          <button className="btn btn-default" onClick={closeSettings}>Cancel</button>
        </div>
      </form>
    </div>
  );

}

export default Settings