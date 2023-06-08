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
  const [selectedHeight, setSelectedHeight] = useState('all');
  const [selectedWeight, setSelectedWeight] = useState('all');

  const { favoritePokemons } = useContext(FavoriteContext);
  const { pokemons, loading, page, setPage, totalPages, setLoading } = props;
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
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
    { generation: 'Gen IX', minID: 899, maxID: 1008 },
  ];

  const weightCategories = [
    { category: 'Light', min: 0, max: 200 },
    { category: 'Medium', min: 201, max: 700 },
    { category: 'Heavy', min: 701, max: Infinity },
  ];

  const heightCategories = [
    { category: 'Small', min: 0, max: 8 },
    { category: 'Medium', min: 9, max: 18 },
    { category: 'Big', min: 19, max: Infinity },
  ];

  const clearFilters = () => {
    setSelectedType('all');
    setSelectedGeneration('all');
    setSelectedHeight('all');
    setSelectedWeight('all');
  };

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
        filteredByName = filteredPokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      setFilteredByName(filteredByName);
    },
    [pokemons, selectedType, filteredPokemons]
  );

  const weightFilter = useCallback(
    (pokemonList) => {
      const categoryfiltered = weightCategories.find(
        (category) => category.category === selectedWeight
      );
      return pokemonList.filter(
        (pokemon) =>
          pokemon.weight >= categoryfiltered.min &&
          pokemon.weight <= categoryfiltered.max
      );
    },
    [selectedWeight]
  );

  const heightFilter = useCallback(
    (pokemonList) => {
      const categoryfiltered = heightCategories.find(
        (category) => category.category === selectedHeight
      );
      return pokemonList.filter(
        (pokemon) =>
          pokemon.height >= categoryfiltered.min &&
          pokemon.height <= categoryfiltered.max
      );
    },
    [selectedHeight]
  );

  const generationFilter = useCallback(
    (pokemonList) => {
      const generationfiltered = generations.find(
        (gen) => gen.generation === selectedGeneration
      );
      return pokemonList.filter(
        (pokemon) =>
          pokemon.id >= generationfiltered.minID &&
          pokemon.id <= generationfiltered.maxID
      );
    },
    [selectedGeneration]
  );

  const typeFilter = useCallback(
    (pokemonList) => {
      return pokemonList.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType)
      );
    },
    [selectedType]
  );

  const applyFilters = useCallback(() => {
    // console.log('estou aqui');
    let filteredPokemons2 = pokemons;
    if (
      selectedType === 'all' &&
      selectedGeneration === 'all' &&
      selectedHeight === 'all' &&
      selectedWeight === 'all'
    ) {
      setFilteredPokemons(pokemons);
    } else {
      if (selectedGeneration !== 'all') {
        filteredPokemons2 = generationFilter(filteredPokemons2);
      }
      if (selectedType !== 'all') {
        filteredPokemons2 = typeFilter(filteredPokemons2);
      }
      if (selectedHeight !== 'all') {
        filteredPokemons2 = heightFilter(filteredPokemons2);
      }
      if (selectedWeight !== 'all') {
        filteredPokemons2 = weightFilter(filteredPokemons2);
      }
      setFilteredPokemons(filteredPokemons2);
    }
  }, [
    pokemons,
    selectedType,
    selectedGeneration,
    selectedHeight,
    selectedWeight,
    generationFilter,
    typeFilter,
    heightFilter,
    weightFilter,
  ]);

  const handleGenerationChange = (event) => {
    setSelectedGeneration(event.target.value);
    setSearch('');
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSearch('');
  };

  const handleHeightChange = (event) => {
    setSelectedHeight(event.target.value);
    setSearch('');
  };

  const handleWeightChange = (event) => {
    setSelectedWeight(event.target.value);
    setSearch('');
  };

  const showFavorites = useCallback(() => {
    setShowOnlyFavorites((prevShowOnlyFavorites) => !prevShowOnlyFavorites);
  }, []);

  const pokemonList = showOnlyFavorites
    ? favoritePokemons
    : search
    ? filteredByName
    : filteredPokemons;

  const pokemonKeyPrefix = showOnlyFavorites
    ? 'fav'
    : search
    ? 'byName'
    : 'byType';

  useEffect(() => {
    applyFilters();
  }, [selectedType, pokemons, applyFilters, selectedGeneration]);

  return (
    <div className='pokedex'>
      <div className='pokedex-header'>
        <input
          className='searchbar'
          value={search}
          placeholder='Buscar'
          onChange={handleSearchChange}
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
      <Filters
        selectedType={selectedType}
        selectedGeneration={selectedGeneration}
        selectedHeight={selectedHeight}
        selectedWeight={selectedWeight}
        handleTypeChange={handleTypeChange}
        handleGenerationChange={handleGenerationChange}
        handleHeightChange={handleHeightChange}
        handleWeightChange={handleWeightChange}
        search={search}
        handleSearchChange={handleSearchChange}
        clearFilters={clearFilters}
      />

      {loading ? (
        <Loading />
      ) : (
        <SimpleBar forceVisible='y' autoHide={false} style={{ maxHeight: 750 }}>
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
