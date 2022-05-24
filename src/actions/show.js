import { FAIL, HELP, SHOW_SCORE } from "../data/types";


export const showFail = (show) => {
  return { type: FAIL, payload: show };
}

export const showHelp = () => (dispatch, getState) => {
  const { helpModal } = getState();

  dispatch({ type: HELP, payload: !helpModal });
}

export const showScore = () => (dispatch, getState) => {
  const { scoreModal } = getState();

  dispatch({ type: SHOW_SCORE, payload: !scoreModal });
}