import React, { useState, useContext, useEffect, useCallback } from 'react';
import normalBackground from '../img/backgrounds/normalBackground.jpg';
import fireBackground from '../img/backgrounds/fireBackground.jpg';
import waterBackground from '../img/backgrounds/waterBackground.jpg';
import grassBackground from '../img/backgrounds/grassBackground.jpg';
import electricBackground from '../img/backgrounds/electricBackground.jpg';
import iceBackground from '../img/backgrounds/iceBackground.jpg';
import fightingBackground from '../img/backgrounds/fightingBackground.jpg';
import poisonBackground from '../img/backgrounds/poisonBackground.jpg';
import groundBackground from '../img/backgrounds/groundBackground.jpg';
import flyingBackground from '../img/backgrounds/flyingBackground.jpg';
import psychicBackground from '../img/backgrounds/psychicBackground.gif';
import bugBackground from '../img/backgrounds/bugBackground.jpg';
import rockBackground from '../img/backgrounds/rockBackground.jpg';
import ghostBackground from '../img/backgrounds/ghostBackground.jpg';
import dragonBackground from '../img/backgrounds/dragonBackground.gif';
import darkBackground from '../img/backgrounds/darkBackground.jpg';
import fairyBackground from '../img/backgrounds/fairyBackground.jpg';
import steelBackground from '../img/backgrounds/steelBackground.gif';
import FavoriteContext from '../contexts/favoriteContext';
import star from '../img/star2.png';

export default function Pokemoncard(props) {
  const { pokemon } = props;
  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const getBackgroundUrl = (tipos) => {
    const typeToImage = {
      bug: bugBackground,
      dark: darkBackground,
      dragon: dragonBackground,
      electric: electricBackground,
      fairy: fairyBackground,
      fighting: fightingBackground,
      fire: fireBackground,
      flying: flyingBackground,
      ghost: ghostBackground,
      grass: grassBackground,
      ground: groundBackground,
      ice: iceBackground,
      normal: normalBackground,
      poison: poisonBackground,
      psychic: psychicBackground,
      rock: rockBackground,
      steel: steelBackground,
      water: waterBackground,
    };
    return tipos.map((tipo) => typeToImage[tipo.type.name]);
  };

  const getColorType = (tipos) => {
    const opacity = 0.7;

    const tipoCores = {
      bug: `rgba(0, 255, 0, ${opacity})`,
      dark: `rgba(0, 0, 0, ${opacity})`,
      dragon: `rgba(243, 78, 78, ${opacity})`,
      electric: `rgba(255, 255, 0, ${opacity})`,
      fairy: `rgba(253, 117, 237, ${opacity})`,
      fighting: `rgba(255, 140, 0, ${opacity})`,
      fire: `rgba(255, 0, 0, ${opacity})`,
      flying: `rgba(0, 136, 255, ${opacity})`,
      ghost: `rgba(238, 130, 238, ${opacity})`,
      grass: `rgba(0, 174, 0, ${opacity})`,
      ground: `rgba(149, 95, 62, ${opacity})`,
      ice: `rgba(225, 231, 228, ${opacity})`,
      normal: `rgba(245, 245, 220, ${opacity})`,
      poison: `rgba(198, 84, 255, ${opacity})`,
      psychic: `rgba(255, 192, 203, ${opacity})`,
      rock: `rgba(139, 139, 139, ${opacity})`,
      steel: `rgba(96, 96, 96, ${opacity})`,
      water: `rgba(64, 224, 208, ${opacity})`,
    };
    const colors = tipos.map((tipo) => tipoCores[tipo.type.name]);
    return colors.length === 1
      ? colors[0]
      : `linear-gradient(115deg, ${colors[0]} 50%, ${colors[1]} 50%)`;
  };

  const favoriteHandle = () => {
    updateFavoritePokemons(pokemon);
  };

  const favorited = favoritePokemons.some((p) => p.name === pokemon.name);

  const backgroundColor = getColorType(pokemon.types);
  const backgroundUrl = getBackgroundUrl(pokemon.types);

  const changeBackground = useCallback(() => {
    setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundUrl.length);
    console.log('pistolinha');
  }, [backgroundUrl.length]);

  useEffect(() => {
    if (pokemon.types.length === 2) {
      const timer = setInterval(changeBackground, 5000); // Alterna a cada 5 segundos

      return () => {
        clearInterval(timer); // Limpa o temporizador quando o componente for desmontado
      };
    }
  }, [changeBackground, pokemon.types.length]);

  return (
    <div
      className='pokemon-card-container'
      style={{
        backgroundImage:
          pokemon.types.length === 1
            ? `url(${backgroundUrl[0]})`
            : `url(${backgroundUrl[backgroundIndex]})`,
      }}
      onClick={favoriteHandle}
    >
      <div className='card-header'>
        <div>
          <span className={favorited ? 'fav-name-color' : ''}>
            {pokemon.name}
          </span>
          {favorited ? (
            <img src={star} alt='favorite-icon' className='favorite-icon'></img>
          ) : null}
        </div>
        <span className={favorited ? 'fav-name-color' : ''}>#{pokemon.id}</span>
      </div>
      <div className='card-body'>
        <div className='card-info'>
          <div className='card-info-weigth-heigth '>
            {pokemon.weight / 10 > 1 ? (
              <span className='weigth-info'>
                {(pokemon.weight / 10).toFixed(1).replace('.', ',')}KG
              </span>
            ) : (
              <span className='weigth-info'>{pokemon.weight * 100}G</span>
            )}
            <span className='barra'>/</span>
            {pokemon.height * 10 >= 100 ? (
              <span>{(pokemon.height / 10).toFixed(2).replace('.', ',')}M</span>
            ) : (
              <span>{pokemon.height * 10}CM</span>
            )}
          </div>
          <div
            className='card-info-types'
            style={{ background: backgroundColor }}
          >
            {pokemon.types.map((element, index) => (
              <span className='info-type' key={`${index}${element.type.name}`}>
                {element.type.name}
              </span>
            ))}
          </div>
          <div className='card-info-abilities'>
            {pokemon.abilities.map((element, index) => (
              <span
                className='info-ability'
                key={`${index}${element.ability.name}`}
              >
                {element.ability.name.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
        <div className='card-image'>
          <img
            className={
              pokemon.id <= 649
                ? 'pokemon-img'
                : 'pokemon-img pokemon-img-static'
            }
            src={
              pokemon.id <= 649
                ? pokemon['sprites']['versions']['generation-v']['black-white'][
                    'animated'
                  ]['front_default']
                : pokemon['sprites']['front_default']
            }
            alt={pokemon.name}
          />
        </div>
      </div>
    </div>
  );
}
