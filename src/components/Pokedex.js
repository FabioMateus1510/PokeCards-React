import React, { useEffect, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Pokemoncard from './Pokemoncard';
import Pagination from './Pagination';
import Loading from './Loading';
import FavoriteContext from '../contexts/favoriteContext';
import Filters from './Filters';
import Favorites from './Favorites';

const Pokedex = (props) => {
  const [search, setSearch] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const { favoritePokemons } = useContext(FavoriteContext);
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

  const handleSearchChange = useCallback(
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

  const applyTypeFilter = useCallback(() => {
    if (selectedType === 'all') {
      setFilteredByType(pokemons);
    } else {
      const filteredByType = pokemons.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType)
      );
      setFilteredByType(filteredByType);
    }
  }, [selectedType, pokemons]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSearch('');
  };

  const showFavorites = useCallback(() => {
    setShowOnlyFavorites((prevShowOnlyFavorites) => !prevShowOnlyFavorites);
  }, []);

  const pokemonList = showOnlyFavorites
    ? favoritePokemons
    : search
    ? filteredByName
    : filteredByType;

  const pokemonKeyPrefix = showOnlyFavorites
    ? 'fav'
    : search
    ? 'byName'
    : 'byType';

  useEffect(() => {
    applyTypeFilter();
  }, [selectedType, pokemons, applyTypeFilter]);

  return (
    <div className='pokedex'>
      <div className='pokedex-header'>
        <Filters
          selectedType={selectedType}
          handleTypeChange={handleTypeChange}
          search={search}
          handleSearchChange={handleSearchChange}
        />
        <h1 className='title'>PokeCards</h1>
        <div className='pagination-favorites-container'>
          <Pagination
            page={page + 1}
            totalPages={totalPages}
            onPrevClick={onPrevClickHandler}
            onNextClick={onNextClickHandler}
          />
          <Favorites
            showFavorites={showFavorites}
            favoritePokemons={favoritePokemons}
          />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className='cards-container'>
          {pokemonList.map((pokemon, index) => (
            <Pokemoncard
              pokemon={pokemon}
              key={`${pokemon.id}-${pokemonKeyPrefix}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Pokedex.propTypes = {
  pokemons: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pokedex;
