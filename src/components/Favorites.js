import React from 'react';

export default function Favorites(props) {
  const { showFavorites, favoritePokemons } = props;
  return (
    <div className='favorites-counter' onClick={showFavorites}>
      {favoritePokemons.length}{' '}
      {favoritePokemons.length === 1 ? 'favorite' : 'favorites'}
    </div>
  );
}
