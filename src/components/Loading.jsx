import React, { useState, useEffect } from 'react';
import loadingCharizard from '../img/loading/charizard.gif';
import loadingPikachu from '../img/loading/pikachu.gif';
import loadingJolteon from '../img/loading/jolteon.gif';
import loadingMagikarp from '../img/loading/magikarp.gif';
import loadingMewtwo from '../img/loading/mewtwo.gif';
import loadingLugia from '../img/loading/pikachuPokeball.gif';
import loadingPikachuPokeball from '../img/loading/pikachuPokeball.gif';
import LoadingCSS from '../css/Loading.css';

export default function Loading() {
  const [gifIndex, setGifIndex] = useState(0);
  const loadingGifs = [
    loadingPikachu,
    loadingJolteon,
    loadingMagikarp,
    loadingMewtwo,
    loadingLugia,
    loadingPikachuPokeball,
    loadingCharizard,
  ];
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * loadingGifs.length);
    console.log(randomIndex);
    setGifIndex(randomIndex);
  }, [loadingGifs.length]);
  return (
    <div className='loading-container'>
      <img
        className='loading'
        src={loadingGifs[gifIndex]}
        alt='charizard gif'
      ></img>
    </div>
  );
}
