let btn = document.querySelector("button");
let input = document.querySelector("input");
let pokemon_container = document.querySelector(".container");
let pokeColor = {
  grass: "#A0CF59",
  bug: "#79A449",
  water: "#4E98C7",
  fire: "#FD842F",
  normal: "#A9B0B3",
  poison: "#BD86CC",
  electric: "#EFD73F",
  ground: "#F7E049",
  fairy: "#FDBDEA",
  fighting: "#D76F2E",
  psychic: "#F46EBD",
  rock: "#A8922C",
  ghost: "#826AA8",
  ice: "#5AC7E8",
  dragon: "#DCAA2B",
};
let loder = document.querySelector(".loder");
let arrayOfPokemone = [];
async function fetchData() {
  for (let i = 1; i < 150; i++) {
    loder.style.display = "flex";
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let extractData = await data.json();
    appendData(extractData, i);
    typeOfPoke(extractData);
  }
}

fetchData();

function appendData(pokemon, i) {
  loder.style.display = "none";
  let div1 = document.createElement("div");
  div1.classList.add("sub-container");
  let name = pokemon.name;
  let img = pokemon.sprites.front_default;

  let pokeType = "";
  let pokeType2 = pokemon.types[0].type.name;
  pokemon.types.forEach((ele) => {
    pokeType = pokeType + " " + ele.type.name;
  });

  let Abilities = "";
  pokemon.abilities.forEach((element,idx) => {
    Abilities = Abilities + "\n" + element.ability.name;
    if(idx+1<pokemon.abilities.length){
      Abilities+=","
    }
  });

  div1.innerHTML = `
            <div class="card-container">
            <div class="front">
                <span>#${i}</span>
                <img src=${img} alt="img">
                <h4>${name.toUpperCase()}</h4>
                <p>${pokeType.toUpperCase()}</p>
            </div>
            <div class="back">
                <img src=${img} alt="img">
                <h4>${name}</h4>
                <p>Abilities: <br> ${Abilities}</p>
            </div>
            </div>
          `;
  div1.children[0].style.backgroundColor = `${pokeColor[pokeType2]}`;
  document.querySelector(".container").appendChild(div1);
  arrayOfPokemone.push(div1);
}
let arrOfType = [];
let selectedType = document.querySelector("#type");

// Type Options for Filtration

function typeOfPoke(pokemon) {
  let type = pokemon.types[0].type.name;
  if (!arrOfType.includes(type.toUpperCase())) {
    arrOfType.push(type.toUpperCase());
    let opt = document.createElement("option");
    opt.setAttribute("value", `${type}`);
    opt.innerText = type.toUpperCase();
    selectedType.appendChild(opt);
  }
}

let filterBtn = document.querySelector(".filter");
let filteredPokemon = [];
filterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  appendfilteredPoke(selectedType.value);
});

function appendfilteredPoke(pokeSearch) {
  arrayOfPokemone.forEach((ele) => {
    let typeInContainer = ele.children[0].children[0].children[3].innerText;
    if (typeInContainer.includes(pokeSearch.toUpperCase())) {
      filteredPokemon.push(ele);
    }
  });
  pokemon_container.replaceChildren(...filteredPokemon);
  filteredPokemon = [];
}

input.addEventListener("input", () => {
  console.log(input.value);
  arrayOfPokemone.forEach((ele) => {
    let typeInContainer = ele.children[0].children[0].children[2].innerText;
    if (typeInContainer.startsWith(input.value.toUpperCase())) {
      filteredPokemon.push(ele);
    }
  });
  pokemon_container.replaceChildren(...filteredPokemon);
  filteredPokemon = [];
});
