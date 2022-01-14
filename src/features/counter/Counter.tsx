// material core
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import { useAppSelector, useAppDispatch } from 'state/hooks';
import { decrement, increment, incrementByAmount, incrementAsync, incrementIfOdd } from 'state/counter/counterSlice';
import { enqueueSnackbar } from 'state/app/appSlice';
import { countSelector } from 'state/counter/counterSelector';
import styles from './Counter.module.css';

// hooks
import { useSafeState } from 'hooks';

export function Counter() {
  const count = useAppSelector(countSelector);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useSafeState('2');

  const incrementValue = Number(incrementAmount) || 0;

  let abc = 12;

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={8}>
          <h2>Employers Overview</h2>
        </Grid>
        <Grid container item sm={4} justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            size="small"
            // className={classes.button}
            startIcon={<AddIcon />}
          >
            Add Employer
          </Button>
        </Grid>
      </Grid>
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
      <br />
      <button
        className={styles.button}
        aria-label="Decrement value"
        onClick={() =>
          dispatch(
            enqueueSnackbar({
              message: 'Check snackbar Successful!',
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            }),
          )
        }
      >
        test snackbar
      </button>
      acasd
    </>
  );
}
