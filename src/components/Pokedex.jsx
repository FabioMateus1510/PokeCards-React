import React, { useEffect, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import PokemonCard from './PokemonCard';
import Pagination from './Pagination';
import Loading from './Loading';
import FavoriteContext from '../contexts/favoriteContext';
import Filters from './Filters';
import Favorites from './Favorites';
import SimpleBar from 'simplebar-react';
import PokedexCSS from '../css/Pokedex.css';

const Pokedex = (props) => {
  const [search, setSearch] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedGeneration, setSelectedGeneration] = useState('all');
  const { favoritePokemons } = useContext(FavoriteContext);
  const { pokemons, loading, page, setPage, totalPages, setLoading } = props;
  const [filteredByType, setFilteredByType] = useState(pokemons);
  const [filteredByName, setFilteredByName] = useState(pokemons);

  const generations = [
    { generation: 'Gen I', minID: 1, maxID: 151 },
    { generation: 'Gen II', minID: 152, maxID: 251 },
    { generation: 'Gen III', minID: 252, maxID: 386 },
    { generation: 'Gen IV', minID: 387, maxID: 493 },
    { generation: 'Gen V', minID: 494, maxID: 649 },
    { generation: 'Gen VI', minID: 650, maxID: 721 },
    { generation: 'Gen VII', minID: 722, maxID: 809 },
    { generation: 'Gen VIII', minID: 810, maxID: 898 },
  ];

  // const applyGenerationFilter = useCallback(() => {
  //   if (selectedGeneration === 'all' || selectedGeneration === 'Generation') {
  //     setFilteredByGeneration(pokemons);
  //   } else {
  //     const generation = generations.find(
  //       (gen) => gen.generation === selectedGeneration
  //     );
  //     console.log(generation);
  //     const filteredByGeneration = pokemons.filter(
  //       (pokemon) =>
  //         pokemon.id >= generation.minID && pokemon.id <= generation.maxID
  //     );
  //     setFilteredByGeneration(filteredByGeneration);
  //   }
  // }, [pokemons, selectedGeneration]);

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
      if (selectedType === 'all' || selectedType === 'Type') {
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
    // setLoading(true);
    console.log('estou aqui');
    let filteredByType = pokemons;
    if (selectedType === 'all' && selectedGeneration === 'all') {
      setFilteredByType(pokemons);
    } else {
      if (selectedGeneration !== 'all') {
        const generation = generations.find(
          (gen) => gen.generation === selectedGeneration
        );
        filteredByType = filteredByType.filter(
          (pokemon) =>
            pokemon.id >= generation.minID && pokemon.id <= generation.maxID
        );
      }
      if (selectedType !== 'all') {
        filteredByType = filteredByType.filter((pokemon) =>
          pokemon.types.some((type) => type.type.name === selectedType)
        );
      }
      setFilteredByType(filteredByType);
      // setLoading(false);
    }
  }, [selectedType, pokemons, selectedGeneration, generations]);

  const handleGenerationChange = (event) => {
    setSelectedGeneration(event.target.value);
    setSearch('');
  };

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
  }, [selectedType, pokemons, applyTypeFilter, selectedGeneration]);

  return (
    <div className='pokedex'>
      <div className='pokedex-header'>
        <Filters
          selectedType={selectedType}
          selectedGeneration={selectedGeneration}
          handleTypeChange={handleTypeChange}
          handleGenerationChange={handleGenerationChange}
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
        <SimpleBar forceVisible='y' autoHide={false} style={{ maxHeight: 763 }}>
          <div className='cards-container'>
            {pokemonList.map((pokemon, index) => (
              <PokemonCard
                pokemon={pokemon}
                key={`${pokemon.id}-${pokemonKeyPrefix}`}
              />
            ))}
          </div>
        </SimpleBar>
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
