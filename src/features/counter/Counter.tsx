import { useAppSelector, useAppDispatch } from 'state/hooks';
import { decrement, increment, incrementByAmount, incrementAsync, incrementIfOdd } from 'state/counter/counterSlice';
import { countSelector } from 'state/counter/counterSelector';
import styles from './Counter.module.css';

// hooks
import { useSafeState } from 'hooks';

export function Counter() {
  const count = useAppSelector(countSelector);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useSafeState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <button className={styles.button} aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button className={styles.button} aria-label="Increment value" onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button className={styles.button} onClick={() => dispatch(incrementByAmount(incrementValue))}>
          Add Amount
        </button>
        <button className={styles.asyncButton} onClick={() => dispatch(incrementAsync(incrementValue))}>
          Add Async
        </button>
        <button className={styles.button} onClick={() => dispatch(incrementIfOdd(incrementValue))}>
          Add If Odd d sd
        </button>
      </div>
    </div>
  );
}
