const container = document.getElementById('container');
const input = document.querySelector('#input');
const button = document.querySelector('#submit');


const search = input.value

const getPokemonData = async (query) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
    const res = await fetch(url);

    const pokemon = await res.json()
    console.log(pokemon)
    document.getElementById('img').setAttribute('src', pokemon.sprites.other.dream_world.front_default)
    document.getElementById('caption').innerText = pokemon.name
}

getPokemonData(6)





// for (let i = 1; i <= 151; i++) {
//     const card = document.createElement('div');
//     const label = document.createElement('span');
//     label.innerText = `Pokemon: ${pokemon.name[i]}`
//     const newImg = document.createElement('img')
//     newImg.src = `${pokemon.sprites.other.dream_world.front_default}`
//     getPokemonData(i)

//     card.appendChild(newImg)
//     card.appendChild(label)
//     container.appendChild(card)
// }