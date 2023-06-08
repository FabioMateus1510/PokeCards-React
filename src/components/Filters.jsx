import React from 'react';
import FiltersCSS from '../css/Filters.css';

const Filters = (props) => {
  const {
    selectedGeneration,
    handleGenerationChange,
    selectedType,
    handleTypeChange,
    selectedHeight,
    handleHeightChange,
    selectedWeight,
    handleWeightChange,
    clearFilters,
  } = props;

  return (
    <div className='filters-tab'>
      <input
        type='checkbox'
        name='acc'
        id='acc1'
        className='filters-checkbox'
      />
      <label htmlFor='acc1' className='filters-label'>
        <span>Filters</span>
      </label>
      <div className='filters'>
        <select
          className='types-option option'
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value='all'>Type</option>
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
        <select
          className='generation-option option'
          value={selectedGeneration}
          onChange={handleGenerationChange}
        >
          <option value='all'>Generation</option>
          <option value='Gen I'>Gen I</option>
          <option value='Gen II'>Gen II</option>
          <option value='Gen III'>Gen III</option>
          <option value='Gen IV'>Gen IV</option>
          <option value='Gen V'>Gen V</option>
          <option value='Gen VI'>Gen VI</option>
          <option value='Gen VII'>Gen VII</option>
          <option value='Gen VIII'>Gen VIII</option>
          <option value='Gen IX'>Gen IX</option>
        </select>
        <select
          className='height-option option'
          value={selectedHeight}
          onChange={handleHeightChange}
        >
          <option value='all'>Height</option>
          <option value='Small'>Small</option>
          <option value='Medium'>Medium</option>
          <option value='Big'>Big</option>
        </select>
        <select
          className='weight-option option'
          value={selectedWeight}
          onChange={handleWeightChange}
        >
          <option value='all'>Weight</option>
          <option value='Light'>Light</option>
          <option value='Medium'>Medium</option>
          <option value='Heavy'>Heavy</option>
        </select>
        <select
          className='orderBy-option option'
          value={selectedWeight}
          onChange={handleWeightChange}
        >
          <option value='all'>orderBy</option>
          <option value='Light'>weight</option>
          <option value='Medium'>height</option>
          <option value='Heavy'>Alphabetical</option>
        </select>
        <button className='clear-filters-btn' onClick={clearFilters}>
          clear
        </button>
      </div>
    </div>
  );
};

export default Filters;
