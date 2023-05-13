import React, { useContext } from 'react';
import logo from '../img/title4.png';
// import star from '../img/star2.png';
import FavoriteContext from '../contexts/favoriteContext';

const Navbar = () => {
  // const { favoritePokemons } = useContext(FavoriteContext);
  return (
    <nav>
      <div>
        <img alt='pokeapi-lgo' src={logo} className='navbar-img' />
        {/* <span>Favoritos</span>
        <img alt='favorite-star' src={star} />
        <span>{favoritePokemons.length}</span> */}
      </div>
    </nav>
  );
};

export default Navbar;
