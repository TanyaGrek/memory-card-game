import React from 'react';

function Settings(props) {
  const {players, timeRange, difficulty, handleChangeSettings, closeSettings, handleStart} = props;
  return (
    <div className="settings">
      <div className="close" onClick={closeSettings}/>
      <div className="settings-modal">
        <h2>Settings</h2>
        <form className="settings-form">
          <label>Number of players:</label>
          <input type="range" min="1" max="4" value={players} name="players"
                 onChange={e => handleChangeSettings(e.target.name, e.target.value)}/>
          <label>Time per user round:</label>
          <input type="range" min="10" max="30" value={timeRange} name="timeRange"
                 onChange={e => handleChangeSettings(e.target.name, e.target.value)}/>
          <label>Difficulty:</label>
          <label><input type="radio" name="difficulty" value={1} checked={difficulty === 1}
                        onChange={e => handleChangeSettings(e.target.name, e.target.value)}/>Easy</label>
          <label><input type="radio" name="difficulty" value={2} checked={difficulty === 2}
                        onChange={e => handleChangeSettings(e.target.name, e.target.value)}/>Hard</label>
          <div className="btn-bar">
            <button className="btn btn-primary" onClick={handleStart}>Confirm and start</button>
            <button className="btn btn-default" onClick={closeSettings}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );

}

export default Settings