import React from "react"
import _ from "underscore"
import Board from "./Board"
import Hand from "./Hand"

const styles = {
    app: {
        fontFamily: 'sans-serif',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
}

const getBullhead = i => {
    let bullhead = 1;
    if (i.slice(-1) === '5') bullhead++;
    if (i.slice(-1) === '0') bullhead += 2;
    if (i.length === 2 && i[0] === i[1]) bullhead += 4;
    if (i === '55') bullhead++;
    return bullhead;
};

const array = Array.from(Array(104));
const deck = array.map((c, i) => {
    return ({
        value: i+1,
        bullhead: getBullhead((i+1).toString())
    })
})

const deal = (shuffleDeck, nbPlayers) => {
    let hands = []
    for (let i = 0; i < nbPlayers; i++) {
        hands[i] = shuffleDeck.slice(0, 10).sort((a, b) => a.value - b.value);
        shuffleDeck.splice(0, 10);
    }
    const board = shuffleDeck.slice(0, 4).map(line => [line]);
    return { hands, board }
}

const findLine = (c, lastCards) => {
    let line = -1;
    let diff = 105;
    lastCards.forEach((CardLine, i) => {
        const lineDiff = c.value - CardLine.value;
        if (lineDiff > 0 && lineDiff < diff) {
            diff = lineDiff;
            line = i;
        }
    })
    return line;
}

class Game extends React.Component {
    state = { nbPlayer: 2, round: 0, board: [], hands: [], roundCards: [], currentP: 0, endRound: false }

    startGame = (nbPlayer) => {
        const shuffleDeck = _.shuffle(deck);
        const { hands, board } = deal(shuffleDeck, nbPlayer);
        const score = Array.from(Array(nbPlayer)).map(s => 0);
        this.setState({ hands, board, score, round: 1 });
    }

    finishRound = (selectLine) => {
        const { board, score, roundCards, round } = this.state;
        const sortCards = roundCards.sort((a, b) => a.value - b.value);
        const newRoundCards = sortCards.slice();
        for (let i = 0; i < sortCards.length; i++) {
            console.warn(lastCards, sortCards[i], board, selectLine)
            const lastCards = board.map(c => c[c.length-1]);
            let l = findLine(sortCards[i], lastCards);
            if (i === 0 && typeof selectLine === 'number') l = selectLine;
            if (l === -1 || board[l].length === 5 || (i === 0 && typeof selectLine === 'number')) {
                if (l === -1) {
                    this.setState({ roundCards: newRoundCards, replacePlayer: sortCards[i].player, needReplace: true, board, score });
                    return;
                }
                score[sortCards[i].player] += board[l].reduce((acc, c) => acc + sortCards[i].bullhead, 0);
                board[l] = [sortCards[i]];
                newRoundCards.splice(i, 1);
            } else {
                board[l].push(sortCards[i]);
                newRoundCards.splice(i, 1);
            }
        }
        this.setState({ endRound: false, board, needReplace : false, roundCards: [], round: round+1 })
    }

    handleCard = (i) => {
        const { hands, currentP, nbPlayer, roundCards } = this.state;
        let newHands = hands.slice();
        roundCards.push({...hands[currentP][i], player: currentP });
        newHands[currentP].splice(i, 1);
        const nextPlayer = currentP === nbPlayer-1 ? 0 : currentP+1
        this.setState({ hands: newHands, roundCards, currentP: nextPlayer, endRound: nextPlayer === 0 }, () =>
            nextPlayer === 0 && this.finishRound()
        )
    }

    render() {
        const { round, board, hands, currentP, endRound, replacePlayer, needReplace, score } = this.state
        return (
            <div style={styles.app}>
              { round === 0 && <React.Fragment>
                <label>
                Number Players:
                <input type="number" value={this.state.nbPlayer} onChange={(e) =>this.setState({nbPlayer: e.target.value})} />
              </label>
              <input type="submit" value="START" onClick={() => this.startGame(this.state.nbPlayer)}/>
                </React.Fragment> }
                <div><h4 style={{margin: '1vh'}}> ROUND {round} </h4></div>
                { score && 
                    <div><h4 style={{margin: '1vh'}}>SCORE :&emsp;
                    { score.map((s, i) => `P${i+1}: ${s} `)} </h4></div> }

                { board.length && <Board cards={board} selectLine={(i) => this.finishRound(i)} needReplace={needReplace} /> }
                
                { hands.length && !endRound && <div>
                    <h4 style={{margin: '1vh'}}>Tour de P{currentP+1}</h4>
                    <Hand cards={hands[currentP]} onCardChoose={(i) => this.handleCard(i)}/>
                    </div>}

                { needReplace && <h4 style={{margin: '1vh'}}> P{replacePlayer+1} please select line to replace </h4> }
            </div>
          );
    }
  
}

export default Game;