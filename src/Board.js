import React from "react"
import Card from "./Card"

const Board = ({ cards, selectLine, needReplace }) => {
    return(
        <div>
        { cards.map((line, i) => {
            const cards = line.map(c => <Card value={c.value} bullhead={c.bullhead}/>);
            return (<div onClick={() =>  needReplace ? selectLine(i) : console.warn('NOT NOW')} style={{ display: 'flex' }}>{cards}</div>)
            })
        }
        </div>
    )
}

export default Board