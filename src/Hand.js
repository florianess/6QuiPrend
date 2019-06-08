import React from "react"
import Card from "./Card"

const Hand = ({ cards, onCardChoose }) => {
    return(
        <div style={{ display: 'flex', overflowX: 'auto' }}>
        { cards.map((c, i) => <Card
            key={i}
            value={c.value}
            bullhead={c.bullhead}
            onClick={() => onCardChoose(i)}/>) }
        </div>
    )
}

export default Hand