import { FAIL, SHOW_SCORE } from "../data/types";


export const showFail = (show) => {
  return { type: FAIL, payload: show };
}

export const showScore = () => (dispatch, getState) => {
  const { scoreModal } = getState();

  dispatch({ type: SHOW_SCORE, payload: !scoreModal });
}