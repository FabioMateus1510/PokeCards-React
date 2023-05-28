const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

export const fetchAllPokemonData = async (offset2, limit2) => {
  try {
    const response = await P.getPokemonsList({
      offset: offset2,
      limit: limit2,
    });
    const pokemonList = response.results;

    // Use o método map para buscar os dados detalhados de cada Pokémon
    const detailedDataList = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const detailedResponse = await P.getPokemonByName(pokemon.name);
        return detailedResponse;
      })
    );

    // Agora você tem a lista de dados detalhados de todos os Pokémon
    return detailedDataList;
  } catch (error) {
    console.log(error);
  }
};

// Chame a função para buscar os dados de todos os Pokémon
