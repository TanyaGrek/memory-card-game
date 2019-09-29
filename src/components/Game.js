import React, {Component} from 'react';


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [],
      rules: [],
      openedCardsIndex: [],
      currentRoundOpenedCardsIndex: [],
      currentRoundOpenedCards: [],
      comparison: []
    };
  }

  componentDidMount() {

    //TODO get query parameters

    const basicNumbersCount = this.props.difficulty * 4;
    let basicNumbers = [];
    let numbers = [];
    let rules = [];

    while (basicNumbers.length !== basicNumbersCount) {
      let newNum = Math.floor(Math.random() * (10 - 2)) + 2;
      if (basicNumbers.indexOf(newNum) === -1) {
        basicNumbers.push(newNum)
      }
    }

    basicNumbers.forEach(num => {
      numbers.push(num, num * num, num * num * num);
      rules.push([num, num * num, num * num * num])
    });

    let j, temp;
    for (let i = numbers.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = numbers[j];
      numbers[j] = numbers[i];
      numbers[i] = temp;
    }
    this.setState({numbers, rules})

    this.startTimer();
  }

  componentWillUnmount() {
    this.setState({numbers: []})
  }


  startTimer = () => {
    const {timeRange} = this.props;
    let timer = timeRange;

    setInterval(() => {
      if (timer === 0) {
        timer = timeRange;
        this.props.followTime(timer);
        this.props.nextRound();
        this.setState({
          currentRoundOpenedCardsIndex: [],
          currentRoundOpenedCards: [],
          comparison: [],
        })
      } else {
        timer--;
        this.props.followTime(timer)
      }
    }, 1000);
  };

  handleOpenCard = (index) => {
    let {numbers, rules, currentRoundOpenedCards, currentRoundOpenedCardsIndex, comparison} = this.state;
    const currentNum = numbers[index];
    let matched = [];

    if (currentRoundOpenedCardsIndex.indexOf(index) === -1) {
      currentRoundOpenedCardsIndex.push(index);
    }

    this.setState({currentRoundOpenedCardsIndex});

    if (comparison.length === 0) {
      rules.map((rule, i) => {
        if (rule.indexOf(currentNum) !== -1 && currentRoundOpenedCards.indexOf(currentNum) === -1) {
          comparison.push(i);
          currentRoundOpenedCards.push(currentNum)
        }
      })
    } else {
      comparison.map(line => {
        matched.push(rules[line].indexOf(currentNum) !== -1)
      });

      if (matched.indexOf(true) !== -1 && currentRoundOpenedCards.indexOf(currentNum) === -1) {
        let trueLine = comparison[matched.indexOf(true)];
        comparison = [trueLine];
        currentRoundOpenedCards.push(currentNum)
      } else {
        currentRoundOpenedCardsIndex = [];
        currentRoundOpenedCards = [];
        comparison = [];
      }
    }

    if (currentRoundOpenedCards.length > 1) {
      this.props.setPoints()
    } else if (currentRoundOpenedCards.length < 2 && comparison.length === 0) {
      setTimeout(() => {
        this.props.nextRound()
      }, 1000)
    }

    if (currentRoundOpenedCardsIndex.length === 3) {
      this.setOpenedCards();
      currentRoundOpenedCards = [];
      comparison = []
    }

    setTimeout(() => {
      this.setState({
        currentRoundOpenedCardsIndex,
        currentRoundOpenedCards,
        comparison
      })
    }, 1000)
  };

  setOpenedCards = () => {
    let {openedCardsIndex, currentRoundOpenedCardsIndex} = this.state;
    openedCardsIndex = openedCardsIndex.concat(currentRoundOpenedCardsIndex);
    this.setState({
      currentRoundOpenedCardsIndex: [],
      openedCardsIndex,
    });
    this.props.nextRound();

  }

  render() {
    const {numbers, openedCardsIndex, currentRoundOpenedCardsIndex} = this.state;
    return (
      <div className="game-wrapper">
        {numbers.map((card, i) =>
          <div className="card-wrapper" key={i}>
            <div
              className={(openedCardsIndex.indexOf(i) >= 0 || currentRoundOpenedCardsIndex.indexOf(i) >= 0) ? "card opened" : "card"}
              id="target" onClick={() => this.handleOpenCard(i)}>
              <div className="back"/>
              <div className="front">{card}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Game