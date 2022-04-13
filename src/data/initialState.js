import { NO_FINISH } from "./types";

const defaultColor = "black";

const expireDate = new Date();
expireDate.setFullYear(expireDate.getFullYear() + 1);

const rows = 7;

const score = {};
for (let i = 0; i < rows; i++) {
  score[i + 1] = 0;
}
score[NO_FINISH] = 0;

const initialState = {
  colors: ["green", "yellow", "grey"],
  defaultColor,
  expireDate,
  guesses: Array(rows).fill(Array(6).fill({ letter: ' ', color: defaultColor })),
  keyboard: "QWERTYUIOPASDFGHJKLZXCVBNM".split('').map(letter => {
    return { letter, color: null };
  }),
  letterNum: 0,
  row: 0,
  rowShake: Array(rows).fill(false),
  score,
  startDate: new Date('Apr 12, 2022 23:59:30'),
  today: Date.now(),
  totalRows: rows
};

export default initialState;