import React, { useContext } from 'react';
import star from '../img/star2.png';
import starGray from '../img/starGray.png';
import flip from '../img/flip.png';

import FavoriteContext from '../contexts/favoriteContext';
import CardHeaderCSS from '../css/CardHeader.css';

export default function CardHeader(props) {
  const { pokemon, cardFlipHandle } = props;
  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);

  const favoriteHandle = () => {
    updateFavoritePokemons(pokemon);
  };

  const favorited = favoritePokemons.some((p) => p.name === pokemon.name);
  return (
    <div className='card-header'>
      <div>
        <span className={favorited ? 'fav-name-color' : ''}>
          {pokemon.name}
        </span>
        {favorited ? (
          <img
            src={star}
            alt='favorite-icon'
            className='favorite-icon'
            onClick={favoriteHandle}
          ></img>
        ) : (
          <img
            src={starGray}
            alt='favorite-icon'
            className='favorite-icon'
            onClick={favoriteHandle}
          ></img>
        )}
      </div>
      <div className='flip-id-container'>
        <img
          src={flip}
          alt='flip-icon'
          className='flip-icon'
          onClick={cardFlipHandle}
        ></img>
        <span className={favorited ? 'fav-name-color' : ''}>#{pokemon.id}</span>
      </div>
    </div>
  );
}
