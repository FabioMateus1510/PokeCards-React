export const getPokemon = async (pokemon) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('error: ', error);
  }
};

export const getAllPokemons = async (limit = 27, offset = 0) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const endPoints = await response.json();

    const allPokemons = await Promise.all(
      endPoints.results.map((pokemon) => {
        return getPokemon(pokemon.name);
      })
    );
    return allPokemons;
  } catch (error) {
    console.log('error: ', error);
  }
};
