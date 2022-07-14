const url = 'https://pokeapi.co/api/v2/'
const spritesUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

const container = document.getElementById('container');
const indexContainer = document.querySelector('.index-container');
const regionContainer = document.querySelector('.region-container');
const errorContainer = document.getElementById('errorContainer');
const header = document.querySelector('h1');
const evoContainer = document.getElementById('evolutionChain');
const idCaption = document.getElementById('idCaption');

const input = document.querySelector('#input');
const button = document.querySelector('#submit');
const random = document.getElementById('random')
const pokemonDetailsContainer = document.getElementById('pokemonDetailsContainer');
const nextPokemon = document.getElementById('nextPokemon');
const prevPokemon = document.getElementById('previousPokemon');

const HPStat = document.querySelector('.HP-stat');
const attackStat = document.querySelector('.attack-stat');
const defenceStat = document.querySelector('.defence-stat');
const specialAttackStat = document.querySelector('.special-attack-stat');
const specialDefenceStat = document.querySelector('.special-defence-stat');
const speedStat = document.querySelector('.speed-stat');

const kanto = document.querySelector('.kanto')
const johto = document.querySelector('.johto')
const hoenn = document.querySelector('.hoenn')
const sinnoh = document.querySelector('.sinnoh')
const unova = document.querySelector('.unova')
const kalos = document.querySelector('.kalos')
const alola = document.querySelector('.alola')
const galar = document.querySelector('.galar')

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
    morePokemonData(input.value.toLowerCase())
})
input.addEventListener("keypress", function onEvent(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        getPokemonData(input.value.toLowerCase());
        morePokemonData(input.value.toLowerCase())
    }
});
nextPokemon.addEventListener('click', () => {
    getPokemonData(Number(idCaption.innerText.split(' ')[1]) + 1)
    morePokemonData(Number(idCaption.innerText.split(' ')[1]) + 1)
})
prevPokemon.addEventListener('click', () => {
    getPokemonData(Number(idCaption.innerText.split(' ')[1]) - 1)
    morePokemonData(Number(idCaption.innerText.split(' ')[1]) - 1)
})
random.addEventListener('click', (e) => {
    e.preventDefault();
    const randomGenerator = Math.floor((Math.random() * 898) + 1)
    getPokemonData(randomGenerator)
    morePokemonData(randomGenerator)
})




const getPokemonData = async (query) => {
    const res = await fetch(`${url}pokemon/${query}`);
    if (res.status === 404 || res.statusText === 'Not Found') {
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

    const name = pokemon.name
    const stats = pokemon.stats

    document.getElementById('img').setAttribute('src', `${spritesUrl}other/official-artwork/${pokemon.id}.png`)
    document.getElementById('nameCaption').innerText = name[0].toUpperCase() + name.slice(1);
    document.querySelector('title').innerText = `${name[0].toUpperCase() + name.slice(1)} | Pokédex`
    document.getElementById('type').innerText = `Type: ${pokemon.types.map((type) => type.type.name).join(' / ')}`
    idCaption.innerText = `# ${pokemon.id.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false })}`
    document.getElementById('HP').innerText = `${stats[0].base_stat}/255`
    document.getElementById('attack').innerText = `${stats[1].base_stat}/255`
    document.getElementById('defence').innerText = `${stats[2].base_stat}/255`
    document.getElementById('specialAttack').innerText = `${stats[3].base_stat}/255`
    document.getElementById('specialDefence').innerText = `${stats[4].base_stat}/255`
    document.getElementById('speed').innerText = `${stats[5].base_stat}/255`

    HPStat.value = pokemon.stats[0].base_stat
    attackStat.value = pokemon.stats[1].base_stat
    defenceStat.value = pokemon.stats[2].base_stat
    specialAttackStat.value = pokemon.stats[3].base_stat
    specialDefenceStat.value = pokemon.stats[4].base_stat
    speedStat.value = pokemon.stats[5].base_stat
    input.value = ""
    // console.log(pokemon)
}

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
kanto.addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(1, 151) })
johto.addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(152, 251) })
hoenn.addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(252, 386) })
sinnoh.addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(387, 493) })
unova.addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(494, 649) })
kalos.addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(650, 721) })
alola.addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(722, 809) })
galar.addEventListener('click', () => { indexContainer.innerHTML = "", indexCard(810, 898) })




const morePokemonData = async (query) => {
    const res = await fetch(`${url}pokemon-species/${query}`)
    const pokemonDetails = await res.json()
    const nextRes = await fetch(`${pokemonDetails.evolution_chain.url}`)
    const data = await nextRes.json()
    // console.log(data.chain)

    let evoChain = [];
    let evoData = data.chain;

    do {
        let numberOfEvolutions = evoData['evolves_to'].length;

        evoChain.push({
            "species_name": evoData.species.name[0].toUpperCase() + evoData.species.name.slice(1),
            "pokemon_id": evoData.species.url[0] + evoData.species.url.slice(1)
        });

        if (numberOfEvolutions > 1) {
            for (let i = 1; i < numberOfEvolutions; i++) {
                evoChain.push({
                    "species_name": evoData.evolves_to[i].species.name[0].toUpperCase() + evoData.evolves_to[i].species.name.slice(1),
                    "pokemon_id": evoData.evolves_to[i].species.url[0] + evoData.evolves_to[i].species.url.slice(1)
                });
            }
        }

        evoData = evoData.evolves_to[0];
        evoContainer.innerHTML = ""
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

    for (let i = 0; i < evoChain.length; i++) {
        if (evoChain.length <= 1) {
            document.getElementById('evolutionChain').innerText = 'This Pokemon does not evolve'
        } else {
            const pokemon = document.createElement('div');
            const label = document.createElement('span');
            label.innerText = evoChain.map((species) => species.species_name)[i]
            const newImg = document.createElement('img');
            newImg.src = `${spritesUrl}${evoChain[i].pokemon_id.split("/")[6]}.png`;
            pokemon.appendChild(newImg);
            pokemon.appendChild(label);
            evoContainer.appendChild(pokemon);
            pokemon.addEventListener('click', () => {
                getPokemonData(evoChain[i].pokemon_id.split("/")[6])
                morePokemonData(evoChain[i].pokemon_id.split("/")[6])
                pokemonDetailsContainer.style.display = "block"
                regionContainer.style.display = "none"
            })
        }
    }
}

// getPokemonData(6)