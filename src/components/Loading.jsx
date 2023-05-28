import React from 'react';
import loadingCharizard from '../img/n1582570.gif';
import LoadingCSS from '../css/Loading.css';

export default function Loading() {
  return (
    <div className='loading-container'>
      <img className='loading' src={loadingCharizard} alt='charizard gif'></img>
    </div>
  );
}
