import React from 'react';
import FiltersCSS from '../css/Filters.css';

const Filters = (props) => {
  const { search, handleSearchChange, selectedType, handleTypeChange } = props;

  return (
    <div className='filters'>
      <input
        className='searchbar'
        value={search}
        placeholder='Buscar'
        onChange={handleSearchChange}
      />
      <select
        className='types-option'
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option value='all'>All</option>
        <option value='normal'>Normal</option>
        <option value='fire'>Fire</option>
        <option value='water'>Water</option>
        <option value='grass'>Grass</option>
        <option value='electric'>Electric</option>
        <option value='ice'>Ice</option>
        <option value='fighting'>Fighting</option>
        <option value='poison'>Poison</option>
        <option value='ground'>Ground</option>
        <option value='flying'>Flying</option>
        <option value='psychic'>Psychic</option>
        <option value='bug'>Bug</option>
        <option value='rock'>Rock</option>
        <option value='ghost'>Ghost</option>
        <option value='dragon'>Dragon</option>
        <option value='dark'>Dark</option>
        <option value='steel'>Steel</option>
        <option value='fairy'>Fairy</option>
      </select>
    </div>
  );
};

export default Filters;
