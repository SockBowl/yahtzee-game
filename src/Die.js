import './styles/Die.css';

function Die(props) {
  const { locked, val, disabled, rolling, toggleLocked, idx } = props;
  const words = ['one', 'two', 'three', 'four', 'five', 'six'];
  const lockedStyles = locked ? 'Die-locked' : '';
  const rollingStyles = rolling ? 'Die-rolling' : '';
  return (
    <i
      className={`Die fas fa-dice-${
        words[val - 1]
      } fa-5x ${lockedStyles} ${rollingStyles}`}
      onClick={() => toggleLocked(idx)}
      disabled={disabled}
    ></i>
  );
}

export default Die;
