let btn = document.querySelector("button");
let input = document.querySelector("input");
let pokemon_container=document.querySelector(".container")
let pokeColor = {};
let arrayOfPokemone=[]
async function fetchData() {
  for (let i = 1; i < 150; i++) {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let extractData = await data.json();
    appendData(extractData, i);
    typeOfPoke(extractData);
  }
}

fetchData();

function appendData(pokemon, i) {
  let div1 = document.createElement("div");
  div1.classList.add("sub-container");
  //   console.log(pokemon);
  let name = pokemon.name;
  let img = pokemon.sprites.front_default;

  let pokeType = "";
  pokemon.types.forEach((ele) => {
    pokeType = pokeType + " " + ele.type.name;
  });

  let Abilities = "";
  pokemon.abilities.forEach((element) => {
    Abilities = Abilities + "\n" + element.ability.name;
  });

  div1.innerHTML = `
            <div class="card-container">
            <div class="front">
                <span>${i}</span>
                <img src=${img} alt="img">
                <h4>${name}</h4>
                <p>${pokeType}</p>
            </div>
            <div class="back">
                <img src=${img} alt="img">
                <h4>${name}</h4>
                <p>Abilities: <br> ${Abilities}</p>
            </div>
            </div>
          `;
  document.querySelector(".container").appendChild(div1);
  arrayOfPokemone.push(div1)
}
let arrOfType = [];
let selectedType = document.querySelector("#type");
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
let filteredPokemon=[];
filterBtn.addEventListener("click", (e) => {
  e.preventDefault();

  appendfilteredPoke(selectedType.value);

 
// console.log(filteredPokemon);
});


function appendfilteredPoke(pokeSearch){
    arrayOfPokemone.forEach((ele) => {
        let typeInContainer=ele.children[0].children[0].children[3].innerText
        if(typeInContainer.includes(pokeSearch)){
            console.log(ele);
            filteredPokemon.push(ele);
        }
    });
    pokemon_container.replaceChildren(...filteredPokemon)
    filteredPokemon=[];
}

input.addEventListener("input",()=>{
    console.log(input.value);
    arrayOfPokemone.forEach((ele) => {
        let typeInContainer=ele.children[0].children[0].children[2].innerText
        if(typeInContainer.startsWith(input.value)){
            console.log(ele);
            filteredPokemon.push(ele);
        }
    });
    pokemon_container.replaceChildren(...filteredPokemon)
    filteredPokemon=[];
})