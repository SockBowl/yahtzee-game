import Die from './Die';
import './styles/Dice.css';

function Dice(props) {
  return (
    <div className='Dice'>
      {props.dice.map((d, idx) => (
        <Die
          toggleLocked={props.toggleLocked}
          val={d}
          locked={props.locked[idx]}
          disabled={props.disabled}
          rolling={props.rolling}
          idx={idx}
          key={idx}
        />
      ))}
    </div>
  );
}

export default Dice;
