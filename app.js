const url = 'https://pokeapi.co/api/v2/'
const spritesUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

const container = document.getElementById('container');
const indexContainer = document.querySelector('.index-container');
const regionContainer = document.querySelector('.region-container');
const errorContainer = document.getElementById('errorContainer')
const header = document.querySelector('h1')

const input = document.querySelector('#input');
const button = document.querySelector('#submit');
const pokemonDetailsContainer = document.getElementById('pokemonDetailsContainer');

const HPStat = document.querySelector('.HP-stat');
const attackStat = document.querySelector('.attack-stat');
const defenceStat = document.querySelector('.defence-stat');
const specialAttackStat = document.querySelector('.special-attack-stat');
const specialDefenceStat = document.querySelector('.special-defence-stat');
const speedStat = document.querySelector('.speed-stat');

header.addEventListener('click', () => {
    indexContainer.innerHTML = ""
    indexCard(1, 151)
    document.getElementById('kanto').checked = true
    document.querySelector('title').innerText = "Pokédex"
    pokemonDetailsContainer.style.display = 'none'
    errorContainer.style.display = "none"
    regionContainer.style.display = 'block'
})
button.addEventListener('click', (e) => {
    e.preventDefault();
    getPokemonData(input.value.toLowerCase());
})
input.addEventListener("keypress", function onEvent(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        getPokemonData(input.value.toLowerCase());
    }
});

function indexCard(indexStart, indexEnd) {
    for (let i = indexStart; i <= indexEnd; i++) {
        const pokemon = document.createElement('div');
        const label = document.createElement('span');
        label.innerText = `# ${i.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false })}`
        const newImg = document.createElement('img');
        newImg.src = `${spritesUrl}${i}.png`;
        pokemon.appendChild(newImg);
        pokemon.appendChild(label);
        indexContainer.appendChild(pokemon);
        pokemon.addEventListener('click', () => {
            getPokemonData(i)
            morePokemonData(i)
            pokemonDetailsContainer.style.display = "block"
            regionContainer.style.display = "none"
        })
    }
}


indexCard(1, 151)
document.querySelector('.kanto').addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(1, 151) })
document.querySelector('.johto').addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(152, 251) })
document.querySelector('.hoenn').addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(252, 386) })
document.querySelector('.sinnoh').addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(387, 493) })
document.querySelector('.unova').addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(494, 649) })
document.querySelector('.kalos').addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(650, 721) })
document.querySelector('.alola').addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(722, 809) })
document.querySelector('.galar').addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(810, 898) })


const getPokemonData = async (query) => {
    const res = await fetch(`${url}pokemon/${query}`);
    if (res.status == 404 || res.statusText == 'Not Found') {
        errorContainer.style.display = "block"
        pokemonDetailsContainer.style.display = "none"
        regionContainer.style.display = "none"
        input.value = ""
        return
    } else {
        pokemonDetailsContainer.style.display = "block"
        errorContainer.style.display = "none"
        regionContainer.style.display = "none"
    }

    const pokemon = await res.json();

    document.getElementById('img').setAttribute('src', `${spritesUrl}other/official-artwork/${pokemon.id}.png`)
    document.getElementById('nameCaption').innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    document.querySelector('title').innerText = `${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} | Pokédex`
    document.getElementById('type').innerText = `Type: ${pokemon.types.map((type) => type.type.name).join(' / ')}`
    document.getElementById('idCaption').innerText = `# ${pokemon.id.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false })}`
    document.getElementById('HP').innerText = `${pokemon.stats[0].base_stat}/255`
    document.getElementById('attack').innerText = `${pokemon.stats[1].base_stat}/255`
    document.getElementById('defence').innerText = `${pokemon.stats[2].base_stat}/255`
    document.getElementById('specialAttack').innerText = `${pokemon.stats[3].base_stat}/255`
    document.getElementById('specialDefence').innerText = `${pokemon.stats[4].base_stat}/255`
    document.getElementById('speed').innerText = `${pokemon.stats[5].base_stat}/255`
    document.getElementById('')
    HPStat.value = pokemon.stats[0].base_stat
    attackStat.value = pokemon.stats[1].base_stat
    defenceStat.value = pokemon.stats[2].base_stat
    specialAttackStat.value = pokemon.stats[3].base_stat
    specialDefenceStat.value = pokemon.stats[4].base_stat
    speedStat.value = pokemon.stats[5].base_stat
    input.value = ""
    // console.log(pokemon)
}

const morePokemonData = async (query) => {
    const res = await fetch(`${url}pokemon-species/${query}`)
    const evolution = await res.json()
    const nextRes = await fetch(`${evolution.evolution_chain.url}`)
    const data = await nextRes.json()
    console.log(data.chain)

    let evoChain = [];
    let evoData = data.chain;

    do {
        let numberOfEvolutions = evoData['evolves_to'].length;

        evoChain.push({
            "species_name": evoData.species.name[0].toUpperCase() + evoData.species.name.slice(1)
        });

        if (numberOfEvolutions > 1) {
            for (let i = 1; i < numberOfEvolutions; i++) {
                evoChain.push({
                    "species_name": evoData.species.name[0].toUpperCase() + evoData.species.name.slice(1)
                });
            }
        }

        evoData = evoData.evolves_to[0];

    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
    for (let i = 0; i < evoChain.length; i++) {
        if (evoChain.length <= 1) {
            document.getElementById('evolutionInfo').innerText = 'This Pokemon does not evolve'
        } else {
            document.getElementById('evolutionInfo').innerText = evoChain.map((species) => species.species_name).join(' / ')
        }
        console.log(evoChain[i].species_name)
    }
}

// getPokemonData(6)