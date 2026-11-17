const API_URL = "https://pokeapi.co/api/v2/pokemon/garchomp";

const image = document.querySelector("#pokemon-image");
const imageFallback = document.querySelector("#image-fallback");
const number = document.querySelector("#pokemon-number");
const name = document.querySelector("#pokemon-name");
const types = document.querySelector("#pokemon-types");
const height = document.querySelector("#pokemon-height");
const status = document.querySelector("#status");
const loadButton = document.querySelector("#load-button");

async function loadPokemon() {
  loadButton.disabled = true;
  status.textContent = "Fetching live data…";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`PokéAPI returned ${response.status}`);
    }

    const pokemon = await response.json();
    const artwork =
      pokemon.sprites.other?.["official-artwork"]?.front_default ??
      pokemon.sprites.front_default;

    number.textContent = `#${String(pokemon.id).padStart(3, "0")}`;
    name.textContent = pokemon.name;
    height.textContent = `Height: ${(pokemon.height / 10).toFixed(1)} m`;

    types.replaceChildren();
    pokemon.types.forEach(({ type }) => {
      const badge = document.createElement("span");
      badge.className = "type";
      badge.textContent = type.name;
      types.append(badge);
    });

    if (artwork) {
      image.src = artwork;
      image.alt = pokemon.name;
      image.hidden = false;
      imageFallback.hidden = true;
    } else {
      image.hidden = true;
      imageFallback.hidden = false;
    }

    status.textContent = "Live Pokémon data loaded!";
  } catch (error) {
    status.textContent = "Couldn’t load Pokémon data. Check your connection and try again.";
    console.error("Could not load Garchomp from PokéAPI:", error);
  } finally {
    loadButton.disabled = false;
  }
}

loadButton.addEventListener("click", loadPokemon);
loadPokemon();