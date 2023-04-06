const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const ul = document.querySelector('ul');

form.addEventListener('submit', e => {
  e.preventDefault();
  const value = input.value.trim().toLowerCase();
  if (value) {
    getPokemon(value);
    input.value = '';
  }
});

async function getPokemon(query) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
  if (response.ok) {
    const data = await response.json();
    const pokemon = {
      name: data.name,
      number: data.id,
      type: data.types.map(type => type.type.name),
      image: data.sprites.front_default
    };
    displayPokemon(pokemon);
  } else {
    console.error('Error al obtener el Pokemon.');
  }
}

function displayPokemon(pokemon) {
  const li = document.createElement('li');
  const img = document.createElement('img');
  const h2 = document.createElement('h2');
  const p = document.createElement('p');

  img.src = pokemon.image;
  img.alt = `${pokemon.name} sprite`;
  h2.textContent = `${pokemon.name} (#${pokemon.number})`;
  p.textContent = `Type: ${pokemon.type.join(', ')}`;

  li.appendChild(img);
  li.appendChild(h2);
  li.appendChild(p);
  ul.appendChild(li);
}
