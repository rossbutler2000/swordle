import { ERROR_MESSAGE, ROW_SHAKE } from "../data/types";


export const shakeRow = (errorMessage = '') => (dispatch, getState) => {
  const { row, rowShake } = getState();

  const newShake = [...rowShake];
  newShake[row] = !newShake[row];

  dispatch({ type: ERROR_MESSAGE, payload: errorMessage });
  dispatch({ type: ROW_SHAKE, payload: newShake });

  setTimeout(() => {
    dispatch({ type: ERROR_MESSAGE, payload: '' })
  }, 1500);
}