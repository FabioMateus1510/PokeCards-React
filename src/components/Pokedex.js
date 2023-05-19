import React, { useContext, useState } from 'react';
import Pokemoncard from './Pokemoncard';
import Pagination from './Pagination';
import loadingCharizard from '../img/n1582570.gif';
import FavoriteContext from '../contexts/favoriteContext';
import star from '../img/star2.png';

const Pokedex = (props) => {
  const [search, setSearch] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);
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

  const showFavorites = () => {
    if (showOnlyFavorites === false) {
      setShowOnlyFavorites(true);
    } else {
      setShowOnlyFavorites(false);
    }
  };

  return (
    <div className='pokedex'>
      <div className='pokedex-header'>
        <div className='filters'>
          <input
            className='searchbar'
            placeholder='Buscar'
            onChange={onChangeHandler}
          />
          <select class='types-option'>
            <option value='' selected disabled></option>
            <option value='normal'>Normal</option>
            <option value='fire'>Fire</option>
            <option value='water'>Water</option>
            <option value='grass'>Grass</option>
            <option value='electric'>Electric</option>
            <option value='ice'>Ice</option>
            <option value='fighting'>Fighting</option>
            <option value='poison'>Poison</option>
            <option value='ground'>Ground</option>
            <option value='flying'>Flying</option>
            <option value='psychic'>Psychic</option>
            <option value='bug'>Bug</option>
            <option value='rock'>Rock</option>
            <option value='ghost'>Ghost</option>
            <option value='dragon'>Dragon</option>
            <option value='dark'>Dark</option>
            <option value='steel'>Steel</option>
            <option value='fairy'>Fairy</option>
          </select>
        </div>
        <div className='title-container'>
          <h1 className='title'>PokeCards</h1>
        </div>
        <div className='pagination-favorites-container'>
          <Pagination
            page={page + 1}
            totalPages={totalPages}
            onPrevClick={onPrevClickHandler}
            onNextClick={onNextClickHandler}
          />
          <span className='favorites-counter' onClick={() => showFavorites()}>
            {favoritePokemons.length}{' '}
            {favoritePokemons.length === 1 ? 'favorite' : 'favorites'}
          </span>
        </div>
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
        <div className='cards-container'>
          {showOnlyFavorites
            ? favoritePokemons.map((pokemon, index) => (
                <Pokemoncard pokemon={pokemon} key={index} />
              ))
            : filteredPokemons.map((pokemon, index) => (
                <Pokemoncard pokemon={pokemon} key={index} />
              ))}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
