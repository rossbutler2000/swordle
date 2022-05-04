import { NO_FINISH } from "./types";

const defaultColor = "black";

const expireDate = new Date();
expireDate.setFullYear(expireDate.getFullYear() + 1);

const letters = 6;
const rows = 7;

const score = {};
for (let i = 0; i < rows; i++) {
  score[i + 1] = 0;
}
// Test score
//const score = { 1: 0, 2: 3, 3: 45, 4: 67, 5: 46, 6: 12, 7: 0 }
score[NO_FINISH] = 0;

const initialState = {
  colors: ["green", "yellow", "grey"],
  defaultColor,
  expireDate,
  guesses: Array(rows).fill(Array(letters).fill({ letter: ' ', color: defaultColor })),
  keyboard: "QWERTYUIOPASDFGHJKLZXCVBNM".split('').map(letter => {
    return { letter, color: null };
  }),
  letterNum: 0,
  row: 0,
  rowShake: Array(rows).fill(false),
  score,
  startDate: new Date('Apr 12, 2022 23:59:30'),
  today: new Date(),
  totalLetters: letters,
  totalRows: rows
};

export default initialState;