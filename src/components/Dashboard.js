import React, {Component} from 'react';
import Game from "./Game";
import Settings from "./Settings";
import Player from "./Player";
import Timer from "./Timer";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: new Array(2).fill(0),
      timeRange: 15,
      difficulty: 1,
      isShowSettings: false,
      isGameStarted: false,
      timer: 0,
      currentPlayer: 0,
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleChangeSettings = (name, val) => {
    if (name === 'players') {
      let p = new Array(+val).fill({score: 0});
      console.log(p);
      this.setState({players: p})
    } else {
      this.setState({
        [name]: +val
      })
    }
  };

  openSettings = () => {
    this.setState({isShowSettings: true})

  };

  closeSettings = () => {
    this.setState({isShowSettings: false})

  };

  handleStart = (e) => {
    e.preventDefault();

    const {players, timeRange, difficulty} = this.state;
    let searchQuery = `?players=${players.length}&timeRange=${timeRange}&difficulty=${difficulty}`;

    if (window.history.pushState) {
      let newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + searchQuery;
      window.history.pushState({path: newUrl}, '', newUrl);
    }

    this.setState({
      timer: timeRange,
      isGameStarted: true,
      isShowSettings: false
    })

  };

  followTime = (timer) => {
    this.setState({timer})
  };

  nextRound = () => {
    const players = this.state.players.length;
    let {currentPlayer, timeRange} = this.state;

    if (players === currentPlayer + 1) {
      currentPlayer = 0
    } else {
      currentPlayer += 1
    }

    this.setState({
      timer: timeRange,
      currentPlayer: currentPlayer
    })
  };

  setPoints = () => {
    let {players} = this.state;
    const {currentPlayer} = this.state;

    players[currentPlayer] = players[currentPlayer] + 2;

    this.setState({
      players
    })
  };

  render() {
    const {isGameStarted, isShowSettings, players, timeRange, timer, difficulty, currentPlayer} = this.state;
    return (
      <div className="dashboard">
        {isGameStarted
        && <div className="players">
          <Timer time={timer}/>
          {players.map((player, i) =>
            <Player player={player} playerNum={i + 1} key={i} currentPlayer={currentPlayer}/>
          )}
        </div>
        }
        <div className="game-box">
          <div>
            <h1>Math Memory Game.</h1>
            {isGameStarted
            && <Game
              players={players}
              currentPlayer={currentPlayer}
              timeRange={timeRange}
              difficulty={difficulty}
              nextRound={this.nextRound}
              followTime={this.followTime}
              setPoints={this.setPoints}
            />
            }
          </div>
        </div>
        {isShowSettings && <Settings
          players={players.length}
          timeRange={timeRange}
          difficulty={difficulty}
          handleChangeSettings={this.handleChangeSettings}
          closeSettings={this.closeSettings}
          handleStart={this.handleStart}
        />}
        {!isGameStarted && !isShowSettings &&
        <button className="start-game-btn btn-primary" onClick={this.openSettings}>Start</button>}
      </div>
    );
  }
}

export default Dashboard