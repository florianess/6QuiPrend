import React from "react"
import axios from "axios"
import jwt from "jsonwebtoken"
import Card from "./Card";

const instance = axios.create({
    baseURL: 'https://6nimmt.localtunnel.me/api/parties',
  });

class Home extends React.Component {
    
    state = { player: {}, token: '' }

    componentDidMount = () => {
        const { FBInstant } = this.props;
        const randomInt = Math.floor(Math.random() * 1000)
        const id = FBInstant.player.getID() || randomInt;
        const name = FBInstant.player.getName() || randomInt.toString();
        const photo = FBInstant.player.getPhoto() || "https://i.pinimg.com/originals/5b/b4/8b/5bb48b07fa6e3840bb3afa2bc821b882.jpg";
        const player = { id, name, photo };
        const token = jwt.sign(player, 'moneymoney');
        instance.defaults.headers.common['PlayerToken'] = token;
        this.setState({ player: { name, id, photo }, token })
    }

    selectContext = async () => {
        const { FBInstant, goToRoom } = this.props;
        await FBInstant.context.chooseAsync();
        const contextID = FBInstant.context.getID();
        const party = await instance.get(`/${contextID}`)
        goToRoom(party.data);
    }

    fakeGoToRoom = async () => {
        const { goToRoom } = this.props;
        const { player } = this.state;
        const party = await instance.get('/create')
        goToRoom(party.data, player)
    }

    fakeJoinToRoom = async () => {
        const { goToRoom } = this.props;
        const { player } = this.state;
        const party = await instance.get('/join')
        goToRoom(party.data, player)
    }

    render() {
        const { player } = this.state
        const { goToRoom } = this.props;
        return (
            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <div>Welcome {player.name}</div>
                <div>
                    <button onClick={() => this.selectContext()}>Play with friend</button>
                    <button onClick={() => goToRoom()}>Create Room</button>
                    <button onClick={() => this.fakeGoToRoom()}>Create Room no FB</button>
                    <button onClick={() => this.fakeJoinToRoom()}>Join Room no FB</button>
                </div>
            </div>
        );
    }
}

export default Home