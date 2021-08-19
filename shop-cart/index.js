import { html, render } from "lit-html";
import {v4 as uuid} from "uuid";
let $ = document.querySelector.bind(document);
let counter = 0;

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
    button {
      background-color: #353131;
      border: none;
      color: #fff;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
    }
    input {
      width: 50%;
      height: 30px;
      font-size: 1.2em;
      padding: 10px;
      border: none;
      text-align: center;
      border-radius: 10px;
      background-color: #353131;
      color: #fff;
      margin-bottom: 0.2rem;
    }
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      
    }
    li {
      border-bottom: 1px solid #353131;
      padding: 10px;
      margin-bottom: 0.2rem;
    }
    #cart {
      width: 500px;
      margin: 0 auto;
      border: 1px solid #353131;
      position:absolute;
      z-index: 4;
      background-color: #f5f5f5;
      left: 40vw;

    }
    .send-btn {
      width: 100%;
      background-color: #353131;
      color: #fff;
      border-radius: 10px;
      font-size: 1.2em;
      margin-bottom: 0.2rem;

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
  counter++;
  render(
    html` <nav><span class="shop-icon" @click=${showCart}>🛒
    <button>${counter}</button>
  </span></nav>`,
    $("#shop")
  );
};

const showCart = () => {
  let listCart = Object.keys(shopCart).map((key) => {
    return html`<li>${key}
    <span style="color:red">
      ${shopCart[key]}
    </span>

    <button style="float:right">X</button>
    </li>

    `;
  });
  render(
    html`
        <ul>
          ${listCart}
        </ul>
        <button class="send-btn" @click=${
          ()=>{
            alert(JSON.stringify({
              table: uuid(),
              data: shopCart
            }));
            console.log({shopCart});
            shopCart = {};
            window.location.reload();
          }
        } >ENVIAR</button>
    `,

    $("#cart")
  );
};

const fetchFilters = async () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      render(
        html`
          <br />
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

const filterFilters = (e) => {
  let text = e.target.value;
  let filter = $("#filters").querySelectorAll("button");
  console.log(filter);
  filter.forEach((button) => {
    if (!button.id.includes(text)) {
      button.style.display = "none";
    } else {
      button.style.display = "";
    }
  });
};

const app = () => {
  return html`
    ${styles}
    <div id="shop">
      <nav>🛒</nav>
    </div>
    <div id="cart"></div>
    <input @keyup=${filterFilters} type="text" />
    <div id="filters"></div>
    <hr />
    <div id="cocktails"></div>
  `;
};

render(app(), document.body);

fetchFilters();
