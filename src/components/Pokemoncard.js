import React, { useContext } from 'react';
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
import psychicBackground from '../img/backgrounds/psychicBackground.jpg';
import bugBackground from '../img/backgrounds/bugBackground.jpg';
import rockBackground from '../img/backgrounds/rockBackground.jpg';
import ghostBackground from '../img/backgrounds/ghostBackground.jpg';
import dragonBackground from '../img/backgrounds/dragonBackground.jpg';
import darkBackground from '../img/backgrounds/darkBackground.jpg';
import fairyBackground from '../img/backgrounds/fairyBackground.jpg';
import FavoriteContext from '../contexts/favoriteContext';
import star from '../img/star2.png';

export default function Pokemoncard(props) {
  const { pokemon } = props;
  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);

  const getBackgroundUrl = (tipo) => {
    const typeToImage = {
      normal: normalBackground,
      fire: fireBackground,
      water: waterBackground,
      grass: grassBackground,
      electric: electricBackground,
      ice: iceBackground,
      fighting: fightingBackground,
      poison: poisonBackground,
      ground: groundBackground,
      flying: flyingBackground,
      psychic: psychicBackground,
      bug: bugBackground,
      rock: rockBackground,
      ghost: ghostBackground,
      dragon: dragonBackground,
      dark: darkBackground,
      fairy: fairyBackground,
    };
    return typeToImage[tipo];
  };

  const getColorType = (tipos) => {
    let opacity = 0.5;

    const tipoCores = {
      normal: `rgba(245, 245, 220, ${opacity})`,
      fire: `rgba(255, 0, 0, ${opacity})`,
      water: `rgba(64, 224, 208, ${opacity})`,
      grass: `rgba(0, 174, 0, ${opacity})`,
      electric: `rgba(255, 255, 0, ${opacity})`,
      ice: `rgba(225, 231, 228, ${opacity})`,
      fighting: `rgba(255, 140, 0, ${opacity})`,
      poison: `rgba(198, 84, 255, ${opacity})`,
      ground: `rgba(149, 95, 62, ${opacity})`,
      flying: `rgba(0, 136, 255, ${opacity})`,
      psychic: `rgba(255, 192, 203, ${opacity})`,
      bug: `rgba(0, 255, 0, ${opacity})`,
      rock: `rgba(139, 139, 139, ${opacity})`,
      ghost: `rgba(238, 130, 238, ${opacity})`,
      dragon: `rgba(243, 78, 78, ${opacity})`,
      dark: `rgba(0, 0, 0, ${opacity})`,
      fairy: `rgba(253, 117, 237, ${opacity})`,
    };
    return tipos.map((tipo) => tipoCores[tipo.type.name]);
  };

  const favoriteHandle = () => {
    updateFavoritePokemons(pokemon.name);
  };

  const favorited = favoritePokemons.some((p) => p === pokemon.name);

  const typeColor = getColorType(pokemon.types);
  const backgroundUrl = getBackgroundUrl(pokemon.types[0].type.name);

  return (
    <div
      className='pokemon-card'
      style={{ backgroundImage: `url(${backgroundUrl})` }}
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
              <span>
                weight:{(pokemon.weight / 10).toFixed(1).replace('.', ',')}KG
              </span>
            ) : (
              <span>weight:{pokemon.weight * 100}G</span>
            )}
            {pokemon.height * 10 >= 100 ? (
              <span>
                height:{(pokemon.height / 10).toFixed(2).replace('.', ',')}M
              </span>
            ) : (
              <span>height:{pokemon.height * 10}CM</span>
            )}
          </div>
          <div className='card-info-types'>
            {pokemon.types.map((element, index) => (
              <span
                className='info-type'
                style={{ background: typeColor[index] }}
                key={index}
              >
                {element.type.name}
              </span>
            ))}
          </div>
          <div className='card-info-abilities'>
            {pokemon.abilities.map((element, index) => (
              <span className='info-ability' key={index}>
                {element.ability.name.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
        <div className='card-image'>
          <img
            className='pokemon-img'
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
