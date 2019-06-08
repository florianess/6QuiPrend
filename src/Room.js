import React from "react"
import io from 'socket.io-client'

class Room extends React.Component {

    state = { timeLeft: 10 };

    componentDidMount() {
        this.startTimer()
    }

    startTimer = () => {
        const { party } = this.props;
        const startDate = new Date(party.start);
        startDate.setSeconds(startDate.getSeconds() + 30); 
        const timeLeft = Math.round(((startDate - Date.now())/1000) * 10)/10;
        if (timeLeft < 0.1) {
            this.props.goToParty();
        } else {
            this.setState({ timeLeft });
            setTimeout(this.startTimer, 100);
        }
    }

    render() {
        const { party } = this.props
        const { timeLeft } = this.state;
        const displayPlayers = party.players.map(p => (
            <div>
                <img src={p.photo} width="50" heigth="50" />
                {p.name}
            </div>
        ))
        return (
            <div>
                <h2> 6 Nimmt {party._id}</h2>
                <p> Countdown : {timeLeft} </p>
                <p> {party.players.length}/4 players </p>
                <div> { displayPlayers } </div>
            </div>
        )
    }
}

export default Room