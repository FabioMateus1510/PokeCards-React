import React from 'react';
import prevButton from '../img/prev2.png';
import nextButton from '../img/next2.png';

export default function Pagination(props) {
  const { page, totalPages, onPrevClick, onNextClick } = props;
  return (
    <div className='pagination-container'>
      <button onClick={onPrevClick}>
        <img className='arrow-button' src={prevButton} alt='Back arrow' />
      </button>
      <span>
        {page} de {totalPages}
      </span>
      <button onClick={onNextClick}>
        <img className='arrow-button' src={nextButton} alt='Next arrow' />
      </button>
    </div>
  );
}
