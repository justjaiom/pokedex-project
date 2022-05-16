const pokedex = document.getElementById('pokedex');
//retrieving pokemon
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 898; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));//json sends data from the api to the server to the webpage
        //a promise is an object that will produce a value some time in the future
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({ //.map create an array with all the pokemon inside it
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
            height: result.height,
            weight: result.weight,
            base_experience: result.base_experience,

        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon

                                                      //atributes for the card
        .map(    
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
            <p class="card-subtitle">Height: ${pokeman.height}</p>  
            <p class="card-subtitle">Weight: ${pokeman.weight}</p>
            <p class="card-subtitle">Base expierience: ${pokeman.base_experience}</p>
        </li>
    `
        )
        .join(''); //connects on the elements in the array
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();