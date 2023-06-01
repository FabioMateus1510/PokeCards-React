import React, { useEffect, useCallback, useState } from 'react';
import { tipoCores, typeToImage } from '../utils/typesColorsBackgrounds';
import CardHeader from './CardHeader';
import CardFrontFaceCSS from '../css/CardFrontFace.css';

export default function CardFrontFace(props) {
  const { pokemon, cardFlipHandle } = props;
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [pokemonImgIndex, setPokemonImgIndex] = useState(0);

  const pokemonGifs = [
    pokemon['sprites']['versions']['generation-v']['black-white']['animated'][
      'front_default'
    ],
    pokemon['sprites']['versions']['generation-v']['black-white']['animated'][
      'front_shiny'
    ],
    pokemon['sprites']['versions']['generation-v']['black-white']['animated'][
      'back_default'
    ],
    pokemon['sprites']['versions']['generation-v']['black-white']['animated'][
      'back_shiny'
    ],
  ];
  const pokemonStatic = [
    pokemon['sprites']['front_default'],
    pokemon['sprites']['front_shiny'],
    pokemon['sprites']['back_default'],
    pokemon['sprites']['back_shiny'],
  ];

  const getBackgroundUrl = (tipos) => {
    return tipos.map((tipo) => typeToImage[tipo.type.name]);
  };

  const getColorType = (tipos) => {
    const colors = tipos.map((tipo) => tipoCores[tipo.type.name]);
    return colors.length === 1
      ? colors[0]
      : `linear-gradient(110deg, ${colors[0]} 50%, ${colors[1]} 51%)`;
  };

  const backgroundColor = getColorType(pokemon.types);
  const backgroundUrl = getBackgroundUrl(pokemon.types);

  const changeBackground = useCallback(() => {
    setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundUrl.length);
  }, [backgroundUrl.length]);

  const changePokemonImg = useCallback(() => {
    setPokemonImgIndex((prevIndex) => (prevIndex + 1) % pokemonGifs.length);
  }, [pokemonGifs.length]);

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
      className='face front'
      style={{
        backgroundImage:
          pokemon.types.length === 1
            ? `url(${backgroundUrl[0]})`
            : `url(${backgroundUrl[backgroundIndex]})`,
      }}
    >
      <CardHeader pokemon={pokemon} cardFlipHandle={cardFlipHandle} />
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
            onClick={changePokemonImg}
            className={
              pokemon.id <= 649
                ? 'pokemon-img'
                : 'pokemon-img pokemon-img-static'
            }
            src={
              pokemon.id <= 649
                ? pokemonGifs[pokemonImgIndex]
                : pokemonStatic[pokemonImgIndex]
            }
            alt={pokemon.name}
          />
        </div>
      </div>
    </div>
  );
}
