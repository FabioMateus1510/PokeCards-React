import React, { useEffect, useContext, useState, useCallback } from 'react';

import Pokemoncard from './Pokemoncard';
import Pagination from './Pagination';
import loadingCharizard from '../img/n1582570.gif';
import FavoriteContext from '../contexts/favoriteContext';

const Pokedex = (props) => {
  const [search, setSearch] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);
  const { pokemons, loading, page, setPage, totalPages } = props;
  const [filteredByType, setFilteredByType] = useState(pokemons);
  const [filteredByName, setFilteredByName] = useState(pokemons);

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

  const onChangeHandler = useCallback(
    (e) => {
      const searchValue = e.target.value;
      setSearch(searchValue);
      let filteredByName;
      if (selectedType === 'all') {
        filteredByName = pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      } else {
        filteredByName = filteredByType.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      setFilteredByName(filteredByName);
    },
    [pokemons, selectedType, filteredByType]
  );

  const filterByType = () => {
    if (selectedType === 'all') {
      setFilteredByType(pokemons);
    } else {
      const filteredByType = pokemons.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType)
      );
      setFilteredByType(filteredByType);
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSearch('');
  };

  const showFavorites = useCallback(() => {
    setShowOnlyFavorites((prevShowOnlyFavorites) => !prevShowOnlyFavorites);
  }, []);

  useEffect(() => {
    filterByType();
  }, [selectedType, pokemons]);

  return (
    <div className='pokedex'>
      <div className='pokedex-header'>
        <div className='filters'>
          <input
            className='searchbar'
            value={search}
            placeholder='Buscar'
            onChange={onChangeHandler}
          />
          <select
            className='types-option'
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option value='all'>All</option>
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
          <span className='favorites-counter' onClick={showFavorites}>
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
                <Pokemoncard pokemon={pokemon} key={pokemon.id} />
              ))
            : search
            ? filteredByName.map((pokemon, index) => (
                <Pokemoncard pokemon={pokemon} key={pokemon.id} />
              ))
            : filteredByType.map((pokemon, index) => (
                <Pokemoncard pokemon={pokemon} key={pokemon.id} />
              ))}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
