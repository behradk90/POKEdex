const url = 'https://pokeapi.co/api/v2/pokemon/'
const container = document.getElementById('container');
const input = document.querySelector('#input');
const button = document.querySelector('#submit');
const statContainer = document.getElementById('statContainer');
const HPStat = document.querySelector('.HP-stat');
const attackStat = document.querySelector('.attack-stat');
const defenceStat = document.querySelector('.defence-stat');
const specialAttackStat = document.querySelector('.special-attack-stat');
const specialDefenceStat = document.querySelector('.special-defence-stat');
const speedStat = document.querySelector('.speed-stat');


button.addEventListener('click', (e) => {
    e.preventDefault();
    getPokemonData(input.value);
    if (input.value) {
        statContainer.style.display = "block"
    }
})
input.addEventListener("keypress", function onEvent(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        getPokemonData(input.value);
        if (input.value) {
            statContainer.style.display = "block"
        }
    }
});

const getPokemonData = async (query) => {
    const res = await fetch(`${url}${query}`);

    const pokemon = await res.json()
    console.log(pokemon)

    document.getElementById('img').setAttribute('src', pokemon.sprites.other.dream_world.front_default)
    document.getElementById('caption').innerText = pokemon.name;
    document.getElementById('type').innerText = `Type: ${pokemon.types.map((type) => type.type.name).join(' / ')}`
    document.getElementById('id').innerText = `# ${pokemon.id.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false })}`
    document.getElementById('HP').innerText = `${pokemon.stats[0].base_stat}/255`
    document.getElementById('attack').innerText = `${pokemon.stats[1].base_stat}/255`
    document.getElementById('defence').innerText = `${pokemon.stats[2].base_stat}/255`
    document.getElementById('special-attack').innerText = `${pokemon.stats[3].base_stat}/255`
    document.getElementById('special-defence').innerText = `${pokemon.stats[4].base_stat}/255`
    document.getElementById('speed').innerText = `${pokemon.stats[5].base_stat}/255`

    HPStat.value = pokemon.stats[0].base_stat
    attackStat.value = pokemon.stats[1].base_stat
    defenceStat.value = pokemon.stats[2].base_stat
    specialAttackStat.value = pokemon.stats[3].base_stat
    specialDefenceStat.value = pokemon.stats[4].base_stat
    speedStat.value = pokemon.stats[5].base_stat
    input.value = ""
}

// getPokemonData(6)