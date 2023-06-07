import CardFrontFace from './CardFrontFace';
import CardBackFace from './CardBackFace';
import React, { useState } from 'react';
import PokemonCardCSS from '../css/PokemonCard.css';

export default function Pokemoncard(props) {
  const { pokemon } = props;
  const [fliped, setFliped] = useState(false);

  const cardFlipHandle = () => {
    console.log('estoy aqui');
    setFliped((prevState) => !prevState);
  };

  return (
    <div className='card-wrapper'>
      <div className={fliped ? 'pokemon-card rotated-card' : 'pokemon-card'}>
        <CardFrontFace pokemon={pokemon} cardFlipHandle={cardFlipHandle} />
        <CardBackFace pokemon={pokemon} cardFlipHandle={cardFlipHandle} />
      </div>
    </div>
  );
}
