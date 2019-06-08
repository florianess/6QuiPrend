import React, { Component } from 'react'
import Board from './Board'
import Hand from './Hand'

export default class Party extends Component {
 
  render() {
    const { party, handleCard } = this.props;
    const { board, cards } = party
    return (
      <div>
        <Board cards={board} selectLine={() => {}} needReplace={false} />
        <Hand cards={cards} onCardChoose={(i) => handleCard(i)}/>
      </div>
    )
  }
}
