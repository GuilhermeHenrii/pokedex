const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const btnNxt = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const input = document.querySelector('.input_search');
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIRespose = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIRespose.status === 200) {
        const data = await APIRespose.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :/';
        pokemonNumber.innerHTML = '';
        input.value = '';
    }
}

form.addEventListener('submit', (e) => {

    e.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

btnPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
})

btnNxt.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);