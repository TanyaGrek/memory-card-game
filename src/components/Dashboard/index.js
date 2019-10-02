import React, {Component} from 'react';
import Game from "../Game/index";
import Settings from "../Settings/index";
import Player from "../Player/index";
import Timer from "../Timer/index";
import PopUp from "../PopUp/index";
import Congrats from "../Congrats/index";
import './index.scss'


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: new Array(2).fill(0),
      timeRange: 15,
      difficulty: 1,
      isShowSettings: false,
      isGameStarted: false,
      isGameFinished: false,
      timer: 0,
      currentPlayer: 0,
      winner: null,
      maxScore: null
    };
  }

  componentDidMount() {

    const search = window.location.search
    let hashes = search.slice(search.indexOf('?') + 1).split('&');

    hashes.forEach((hash) => {
      let [name, val] = hash.split('=');
      this.handleChangeSettings(name, val);
    });
  }

  handleChangeSettings = (name, val) => {
    if (name === 'players') {
      let p = new Array(+val).fill(0);
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

  closePopUp = () => {
    this.setState({
      isShowSettings: false,
      isGameFinished: false
    })

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

  endGame = () => {
    const {players} = this.state;
    const maxScore = Math.max(...players);
    const winner = players.indexOf(maxScore) + 1;

    this.setState({
      winner,
      maxScore,
      isGameFinished: true,
      isGameStarted: false,
    })
  }

  render() {
    const {isGameStarted, isGameFinished, isShowSettings, players, timeRange, timer, difficulty, currentPlayer, winner, maxScore} = this.state;
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
            {!isGameStarted && !isShowSettings &&
            <button className="start-game-btn btn-primary" onClick={this.openSettings}>Start</button>}

            {isGameStarted
            && <Game
              players={players}
              currentPlayer={currentPlayer}
              timeRange={timeRange}
              difficulty={difficulty}
              nextRound={this.nextRound}
              followTime={this.followTime}
              setPoints={this.setPoints}
              endGame={this.endGame}
            />
            }
          </div>
        </div>
        {(isShowSettings || isGameFinished)
        && <PopUp
            closePopUp={this.closePopUp}
          >
          {isShowSettings && <Settings
            players={players.length}
            timeRange={timeRange}
            difficulty={difficulty}
            handleChangeSettings={this.handleChangeSettings}
            handleStart={this.handleStart}
          />}
          {isGameFinished && <Congrats winner={winner} maxScore={maxScore}/>}
        </PopUp>
        }


      </div>
    );
  }
}

export default Dashboard