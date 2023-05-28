import React from 'react';
import bluePokeball from '../img/bluePokeball.png';
import CardHeader from './CardHeader';
import CardBackFaceCSS from '../css/CardBackFace.css';

export default function CardBackFace(props) {
  const { pokemon, cardFlipHandle } = props;

  const statNames = ['HP', 'ATT', 'DEF', 'SP-ATT', 'SP-DEF', 'SPEED'];
  const statColors = [
    'rgb(19 181 0)',
    'rgb(205 2 2)',
    'rgb(2 138 203)',
    'rgb(255 59 0)',
    'rgb(0 208 255)',
    'rgb(205 180 3)',
  ];
  const stats = pokemon.stats.map((stat, index) => {
    return {
      statName: statNames[index],
      statValue: stat.base_stat,
      statBarValue: (stat.base_stat / 255) * 100,
      statColor: statColors[index],
    };
  });

  return (
    <div className='back face'>
      <CardHeader pokemon={pokemon} />
      <div className='back-card-body' onClick={cardFlipHandle}>
        <img
          className='bluePokeball'
          src={bluePokeball}
          alt='bluePokeball'
        ></img>
        <div className='info-stats'>
          {stats.map((stat) => (
            <div className='stat'>
              <span>{`${stat.statName} ${stat.statValue}`}</span>
              <span
                className='stat-bar'
                style={{
                  background: `linear-gradient(90deg, ${stat.statColor} ${stat.statBarValue}%, rgba(255, 255, 255, 0) ${stat.statBarValue}%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
