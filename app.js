const url = 'https://pokeapi.co/api/v2/pokemon/'
const spritesUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

const container = document.getElementById('container');
const indexContainer = document.querySelector('.index-container');
const regionContainer = document.querySelector('.region-container')
const header = document.querySelector('h1')

const input = document.querySelector('#input');
const button = document.querySelector('#submit');
const statContainer = document.getElementById('statContainer');

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
    statContainer.style.display = 'none'
    regionContainer.style.display = 'block'
})

button.addEventListener('click', (e) => {
    e.preventDefault();
    getPokemonData(input.value);
    if (input.value) {
        statContainer.style.display = "block"
        regionContainer.style.display = "none"
    }
})
input.addEventListener("keypress", function onEvent(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        getPokemonData(input.value);
        if (input.value) {
            statContainer.style.display = "block"
            regionContainer.style.display = "none"
        }
    }
});


function indexCard(i) {
    const pokemon = document.createElement('div');
    const label = document.createElement('span');
    label.innerText = `# ${i.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false })}`
    const newImg = document.createElement('img');
    newImg.src = `${spritesUrl}${i}.png`;

    pokemon.appendChild(newImg);
    pokemon.appendChild(label);
    indexContainer.appendChild(pokemon);
}

kanto.addEventListener('click', () => {
    indexContainer.innerHTML = ""
    for (let i = 1; i <= 151; i++) {
        indexCard(i)
    }
})
johto.addEventListener('click', () => {
    indexContainer.innerHTML = ""
    for (let i = 152; i <= 251; i++) {
        indexCard(i)
    }
})
hoenn.addEventListener('click', () => {
    indexContainer.innerHTML = ""
    for (let i = 252; i <= 386; i++) {
        indexCard(i)
    }
})
sinnoh.addEventListener('click', () => {
    indexContainer.innerHTML = ""
    for (let i = 387; i <= 493; i++) {
        indexCard(i)
    }
})
unova.addEventListener('click', () => {
    indexContainer.innerHTML = ""
    for (let i = 494; i <= 649; i++) {
        indexCard(i)
    }
})
kalos.addEventListener('click', () => {
    indexContainer.innerHTML = ""
    for (let i = 650; i <= 721; i++) {
        indexCard(i)
    }
})
alola.addEventListener('click', () => {
    indexContainer.innerHTML = ""
    for (let i = 722; i <= 809; i++) {
        indexCard(i)
    }
})
galar.addEventListener('click', () => {
    indexContainer.innerHTML = ""
    for (let i = 810; i <= 898; i++) {
        indexCard(i)
    }
})


const getPokemonData = async (query) => {
    const res = await fetch(`${url}${query}`);
    const pokemon = await res.json();

    document.getElementById('img').setAttribute('src', `${spritesUrl}other/official-artwork/${pokemon.id}.png`)
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
    console.log(pokemon)
}

// getPokemonData(6)