import { html, nothing, render } from "lit-html";
import {styleMap} from 'lit-html/directives/style-map.js';
let stateOfBoard = {
  row1: [0, 0, 0],
  row2: [0, 0, 0],
  row3: [0, 0, 0],
};
let counterPlays = 0;
let isPlayerOne = true;

let resetState = () => {
  stateOfBoard = {
    row1: [0, 0, 0],
    row2: [0, 0, 0],
    row3: [0, 0, 0],
  };
  counterPlays = 0;
  render(table(stateOfBoard), document.body);
};

// check if win
const checkWin = (stateOfBoard) => {
let win = false;
  let col0 = [stateOfBoard.row1[0], stateOfBoard.row2[0], stateOfBoard.row3[0]];
  let col1 = [stateOfBoard.row1[1], stateOfBoard.row2[1], stateOfBoard.row3[1]];
  let col2 = [stateOfBoard.row1[2], stateOfBoard.row2[2], stateOfBoard.row3[2]];
  let col = [col0, col1, col2];
  let diag1 = [
    stateOfBoard.row1[0],
    stateOfBoard.row2[1],
    stateOfBoard.row3[2],
  ];
  let diag2 = [
    stateOfBoard.row1[2],
    stateOfBoard.row2[1],
    stateOfBoard.row3[0],
  ];
  let diag = [diag1, diag2];

//   CHECK THE ROWS
  Object.values(stateOfBoard).forEach((row) => {
    let checker = row.every((val, i, arr) => {
      if (val === 0) return false;
      return val === arr[0];
    });
    if (checker) {
      win = true;
    }
  });
//   CHECK THE COLS
  Object.values(col).forEach((col) => {
    let checker = col.every((val, i, arr) => {
      if (val === 0) return false;
      return val === arr[0];
    });
    if (checker) {
      win = true;
    }
  });
//   CHECK THE DIAGS
  Object.values(diag).forEach((diag) => {
    let checker = diag.every((val, i, arr) => {
      if (val === 0) return false;
      return val === arr[0];
    });
    if (checker) {
      win = true;
    }
  });

  return win;
};

const handlePlay = (e) => {
    if (counterPlays >= 9) {resetState(); return}
    e.preventDefault();
  let col = e.target.id;
  let row = e.target.parentElement.id;
  let content = e.target.textContent.trim();
  if (content != "") return;
  if (isPlayerOne) {
    stateOfBoard[row][col] = 1;
    isPlayerOne = !isPlayerOne;
  } else {
    stateOfBoard[row][col] = 2;
    isPlayerOne = !isPlayerOne;
  }
  counterPlays += 1;
  console.log(counterPlays)
  if (checkWin(stateOfBoard)) {
    alert(`Player ${isPlayerOne ? "EL DOS" : "EL UNO"} wins!`);
    resetState();
  }
  render(table(stateOfBoard), document.body);
};
const turns = () => {
  return html`${isPlayerOne
    ? html`TURNO DEL JUGADOR <span class="P">UNO</span>`
    : html`TURNO DEL JUGADOR <span class="S">DOS</span>`}`;
};

const styles = html`<style>
  div {
    border: 1px solid #000;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    min-width:fit-content;
    min-height:fit-content
  }

  .row {
    margin: auto;
    width: 50vw;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
  }
  button {
    margin: 1rem auto;
    width: 50vw;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  h1 {
    text-align: center;
  }
  .P {
      color: #00f;

  }
  .S {
      color: #f00;
  }
</style>`;


const table = (stateOfBoard) => html`
  ${styles}
  <h1><span class="P">TIC</span>-TAC-<span class="S">TOE</span></h1>
  <main @click=${handlePlay}>
    <div id="row1" class="row">
      ${stateOfBoard.row1.map(
        (x, i) =>
          html`<div class="${x === 1 ? "P" : x === 2 ? "S" : 'nothing'}" id=${i}>
            ${x === 1 ? html`X` : x === 2 ? html`0` : nothing}
          </div>`
      )}
    </div>
    <div id="row2" class="row">
      ${stateOfBoard.row2.map(
        (x, i) =>
          html`<div class="${x === 1 ? "P" : x === 2 ? "S" : 'nothing'}" id=${i}>
            ${x === 1 ? html`X` : x === 2 ? html`0` : nothing}
          </div>`
      )}


    </div>
    <div id="row3" class="row">
      ${stateOfBoard.row3.map(
        (x, i) =>
          html`<div class="${x === 1 ? "P" : x === 2 ? "S" : 'nothing'}" id=${i}>
            ${x === 1 ? html`X` : x === 2 ? html`0` : nothing}
          </div>`
      )}

    </div>
  </main>
  <button @click=${resetState}>Reset</button>
  <h1>${turns(isPlayerOne)}</h1>
`;

render(table(stateOfBoard), document.body);
