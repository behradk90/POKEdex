const container = document.getElementById('container');
const input = document.querySelector('#input');
const button = document.querySelector('#submit');

button.addEventListener('click', (e) => {
    e.preventDefault();
    getPokemonData(input.value);
})
input.addEventListener("keypress", function onEvent(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        getPokemonData(input.value)
    }
});

const getPokemonData = async (query) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
    const res = await fetch(url);

    const pokemon = await res.json()
    console.log(pokemon)
    document.getElementById('img').setAttribute('src', pokemon.sprites.other.dream_world.front_default)
    document.getElementById('caption').innerText = pokemon.name
}

