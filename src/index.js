import React from "react";
import ReactDOM from "react-dom";
import io from 'socket.io-client'
import Party from "./Party";
import Home from "./Home"
import Room from "./Room"

class App extends React.Component {
  state = { currentStep: 0, party: { test: "test" }, needChoose: true }

  componentDidMount = () => {
    const socket = io('6nimmt.localtunnel.me');
    socket.on('newPlayer', player => this.updatePlayer(player));
    socket.on('endRound', board => this.updateBoard(board));
    this.setState({ socket })
  }

  updatePlayer = player => {
    const { party } = this.state;
    console.log("UPDATE PLAYER")
    party.players.push(player);
    this.setState({ party })
  }

  updateBoard = updatedBoard => {
    const { party } = this.state;
    console.log('updatedBoard', updatedBoard)
    console.log({...party, board: updatedBoard })
    this.setState({ party: {...party, board: updatedBoard }, needChoose: true })
  }

  goToRoom = (party, player) => {
    const { socket } = this.state;
    socket.emit('joinRoom', party._id);
    this.setState({ currentStep: 1, party, player })
  }

  handleCard = index => {
    const { socket, needChoose, party, player } = this.state;
    const id = window.FBInstant.player.getID() || player.id;
    if (needChoose) {
      const card = party.cards.splice(index, 1)[0];
      socket.emit('playCard', { id, partyID: party._id, card });
      this.setState({ needChoose: false });
    }
  }

  steps = [
    () => <Home FBInstant={window.FBInstant} goToRoom={this.goToRoom}/>,
    () => <Room party={this.state.party} goToParty={() => this.setState({ currentStep: 2 })}/>,
    () => <Party party={this.state.party} handleCard={this.handleCard} />
  ]
  render() {
    const { currentStep } = this.state
    const current = this.steps[currentStep]
    return (current())
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
