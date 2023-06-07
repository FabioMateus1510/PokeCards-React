import { useCallback, useEffect, useState } from 'react';
import 'simplebar-react/dist/simplebar.min.css';
import './App.css';
import Pokedex from './components/Pokedex';
import { FavoriteProvider } from './contexts/favoriteContext';
// import { getAllPokemons } from './api';
import { fetchAllPokemonData } from './pokeapi';

function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const itensPerPage = 160;
  // const fetchPokemons = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const result = await getAllPokemons(itensPerPage, itensPerPage * page);
  //     setPokemons(result);
  //     setLoading(false);
  // setTotalPages(Math.ceil(1008 / itensPerPage));
  //   } catch (error) {
  //     console.log('fetchPokemons error: ', error);
  //   }
  // }, [page]);

  // useEffect(() => {
  //   fetchPokemons();
  // }, [fetchPokemons]);
  const fetchPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchAllPokemonData(
        itensPerPage * page,
        itensPerPage
      );
      setPokemons(result);
      setLoading(false);
      setTotalPages(Math.ceil(1008 / itensPerPage));
    } catch (error) {
      console.log('fetchPokemons error: ', error);
    }
  }, [page]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites];
    const favoriteIndex = favorites.indexOf(name);
    if (favoriteIndex >= 0) {
      updatedFavorites.splice(favoriteIndex, 1);
    } else {
      updatedFavorites.push(name);
    }
    setFavorites(updatedFavorites);
  };

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <div>
        {/* <Navbar /> */}
        <Pokedex
          pokemons={pokemons}
          loading={loading}
          setLoading={setLoading}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </FavoriteProvider>
  );
}

export default App;
