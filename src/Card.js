import React from "react";
import BullHead from "./BullHead";

const styles = {
  card: (bgc) => ({
    height: '14vh',
    minWidth: '18vw',
    border: '1px solid',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    backgroundColor: bgc,
    borderRadius: '5%',
    padding: '0.5vh 0',
    boxShadow: 'inset 1vh -1vh white, inset -1vh 1vh white',
    fontFamily: "'Machine'",
    fontSize: '0.75rem',
  }),
  content: (color) => ({
    position: 'relative',
    fontFamily: "'Meteora'",  
    fontSize: '9vh',
    flexGrow: 2,
    alignSelf: 'stretch',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: color,
  }),
  header: (topColor) => ({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    color: topColor,
  }),
  footer: (topColor) => ({
    display: 'flex',
    justifyContent: 'space-around',
    transform: 'rotate(180deg)',
    alignItems: 'flex-start',
    color: topColor,
  }),
  minihead: {
    height: '1.25vh',
    width: 'auto',
  },
  heads: (bullhead) => ({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexBasis: bullhead === 7 ? '45%' : '40%',
  }),
  bullhead: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    width: '90%',
    height: '100%',
    padding: '0 5%',
  },
  value: {
    zIndex: 2,
  }
}

const palette = bullhead => {
  let fillMinihead, fillHead, bgc, topColor, color;
  switch (bullhead) {
    case 2:
      fillHead = '#153691';
      fillMinihead = '#153691';
      bgc = '#319EFF';
      topColor = '#153691';
      color = '#FFD60D';
      break;
    case 3:
      fillHead = '#B80700';
      fillMinihead = '#35006E';
      bgc = '#FF690D';
      topColor = '#B80700';
      color = '#319EFF';
      break;
    case 5:
      fillHead = '#153691';
      fillMinihead = '#35006E';
      bgc = '#B80700';
      topColor = '#FF690D';
      color = '#FF690D';
      break;
    case 7:
      fillHead = '#B80700';
      fillMinihead = '#B80700';
      bgc = '#35006E';
      topColor = '#FFD60D';
      color = '#FFD60D';
      break;
    default:
      fillHead = '#35006E';
      fillMinihead = 'black';
      bgc = 'white';
      color = 'black';
      topColor = 'black';
      break;
  }
  return { fillHead, fillMinihead, bgc, topColor, color }
}

const Card = ({ value, bullhead, onClick }) => {
  const { fillHead, fillMinihead, bgc, topColor, color } = palette(bullhead);
  const arrayBull = Array.from(Array(bullhead)).map(b => <BullHead style={styles.minihead} fill={fillMinihead} />);
  const top = (<React.Fragment><div>{ value }</div>
    <div style={styles.heads(bullhead)}>
      { arrayBull }
    </div>
    <div>{ value }</div></React.Fragment>);
  return (
    <div style={styles.card(bgc)} onClick={onClick}>
      <div style={styles.header(topColor)}>
        { top }
      </div>
      <div style={styles.content(color)}>
        <BullHead style={styles.bullhead} fill={fillHead}/>
        <div style={styles.value}>{value}</div>
      </div>
      <div style={styles.footer(topColor)}>
        { top }
      </div>
    </div>
  );
};

export default Card;
