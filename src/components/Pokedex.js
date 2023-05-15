import React, { useState } from 'react';
import Pokemoncard from './Pokemoncard';
import Pagination from './Pagination';
import loadingCharizard from '../img/n1582570.gif';

const Pokedex = (props) => {
  const [search, setSearch] = useState('');
  const { pokemons, loading, page, setPage, totalPages } = props;

  const onPrevClickHandler = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const onNextClickHandler = () => {
    if (page + 1 !== totalPages) {
      setPage(page + 1);
    }
  };

  const onSearch = (search) => {
    if (!search) {
      return pokemons;
    }

    // Filtra os pokémons com base na string de pesquisa.
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    return filteredPokemons;
  };

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    if (e.target.value === '') {
      onSearch(undefined);
    } else {
      onSearch(e.target.value);
    }
  };

  const filteredPokemons = search
    ? pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
    : pokemons;

  return (
    <div className='pokedex'>
      <div className='pokedex-header'>
        <input
          className='searchbar'
          placeholder='Buscar'
          onChange={onChangeHandler}
        />

        <h1 className='title'>PokeCards</h1>

        <Pagination
          page={page + 1}
          totalPages={totalPages}
          onPrevClick={onPrevClickHandler}
          onNextClick={onNextClickHandler}
        />
      </div>

      {loading ? (
        <div className='loading-container'>
          <img
            className='loading'
            src={loadingCharizard}
            alt='charizard gif'
          ></img>
        </div>
      ) : (
        <div className='pokedex-grid'>
          {filteredPokemons.map((pokemon, index) => (
            <Pokemoncard pokemon={pokemon} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
