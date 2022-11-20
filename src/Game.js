import { useState, useEffect } from 'react';
import Dice from './Dice';
import ScoreTable from './ScoreTable';
import './styles/Game.css';

function Game() {
  const NUM_DICE = 5;
  const NUM_ROLLS = 3;

  const scoresList = {
    ones: undefined,
    twos: undefined,
    threes: undefined,
    fours: undefined,
    fives: undefined,
    sixes: undefined,
    threeOfKind: undefined,
    fourOfKind: undefined,
    fullHouse: undefined,
    smallStraight: undefined,
    largeStraight: undefined,
    yahtzee: undefined,
    chance: undefined
  };
  const [dice, updateDice] = useState(Array(NUM_DICE).fill(1));
  const [locked, updateLocked] = useState(Array(NUM_DICE).fill(false));
  const [rollsLeft, updateRollsLeft] = useState(NUM_ROLLS);
  const [scores, updateScore] = useState(scoresList);
  const [rolling, updateRolling] = useState(false);

  function animateRoll(reset) {
    updateRolling(true);
    setTimeout(() => roll(reset), 1000);
  }

  function roll(reset) {
    // roll dice whose indexes are in reroll
    updateRolling(false);
    if (reset) {
      updateRollsLeft(NUM_ROLLS - 1);
      updateDice(dice.map(() => Math.ceil(Math.random() * 6)));
      updateLocked(Array(NUM_DICE).fill(false));
    } else {
      updateDice(
        dice.map((d, i) => (locked[i] ? d : Math.ceil(Math.random() * 6)))
      );
      updateLocked(rollsLeft > 1 ? locked : Array(NUM_DICE).fill(true));
      updateRollsLeft(rollsLeft - 1);
    }
  }

  function toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if (rollsLeft > 0) {
      updateLocked([
        ...locked.slice(0, idx),
        !locked[idx],
        ...locked.slice(idx + 1)
      ]);
    }
  }

  function doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename

    updateScore({ ...scores, [rulename]: ruleFn(dice) });

    animateRoll(true);
  }

  useEffect(() => {}, []);

  return (
    <div className='Game'>
      <header className='Game-header'>
        <h1 className='App-title'>Yahtzee!</h1>

        <section className='Game-dice-section'>
          <Dice
            dice={dice}
            locked={locked}
            toggleLocked={toggleLocked}
            rolling={rolling}
            disabled={rollsLeft === 0}
          />
          <div className='Game-button-wrapper'>
            <button
              className='Game-reroll'
              disabled={locked.every((x) => x)}
              onClick={() => animateRoll()}
            >
              {rollsLeft} Rerolls Left
            </button>
          </div>
        </section>
      </header>
      <ScoreTable doScore={doScore} scores={scores} />
    </div>
  );
}

export default Game;
