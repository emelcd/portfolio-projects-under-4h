import { html, render } from "lit-html";

let $ = document.querySelector.bind(document);
let counter = 0

let shopCart = {};

const styles = html`
  <style>
    #cocktails {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }
    .cocktail-container {
      width: 200px;
      height: auto;
      margin: 10px;
      border: 1px solid black;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 10px;
      border-radius: 10px;
    }
    .cocktail-container:hover {
      background-color: #f5f5f5;
      transform: scale(1.1);
      box-shadow: 0px 0px 10px #000000;
    }
    .cocktail-img {
      width: 100%;
      height: 100px;
      object-fit: contain;
    }
    .cocktail-title {
      text-align: center;
      font-size: 1.2em;
      word-wrap: break-word;
    }
    nav {
      display: flex;
      justify-content: space-around;
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 10px;
      box-shadow: 0px 0px 10px #000000;
      margin-bottom: 10px;
    }
  </style>
`;

const getCocktails = async (value) => {
  value = value.target.id;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      render(
        html`
          ${data.drinks.map(
            (drink) => html`
              <div
                id="${drink.idDrink}"
                @click=${() => {
                  addToCart(drink.strDrink);
                }}
                class="cocktail-container"
              >
                <img
                  width="100px"
                  class="cocktail-img"
                  src=${drink.strDrinkThumb}
                />
                <h1 class="cocktail-title">${drink.strDrink}</h1>
              </div>
            `
          )}
        `,
        $("#cocktails")
      );
    });
};

const addToCart = (id) => {
  if (!shopCart[id]) {
    shopCart[id] = 1;
  } else {
    shopCart[id]++;
  }
  counter++
  console.log(shopCart);
  render(html` <nav>🛒${counter}</nav>`, $("#shop"));
};

const fetchFilters = async () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      render(
        html`
          ${data.drinks.map(
            (drink) => html`
              <button id=${drink.strIngredient1} @click=${getCocktails}>
                ${drink.strIngredient1}
              </button>
            `
          )}
        `,
        $("#filters")
      );
    });
};

const app = () => {
  return html`
    ${styles}
    <div id="shop">
      <nav>🛒</nav>
    </div>
    <div id="filters"></div>
    <div id="cocktails"></div>
  `;
};

render(app(), document.body);

fetchFilters();
