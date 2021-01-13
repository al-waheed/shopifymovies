
import React from "react";
import {ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';


const Movies = ({ movies, nominateMovies, loading, movieIds, isNotify }) => {
  const movieLists = movies.map((movie, i) => {
    const isNominated = movieIds.includes(movie.imdbID);
    return (
      <div key={i} className="movie-card">
        <div className='movie'>
          <img src={movie.Poster} alt="pics" className="movie-pics"/>
          <div className="movie-title">{movie.Title} ({movie.Year})</div>
          <button
           onClick={() =>{ nominateMovies(movie) 
            isNotify()      
          }} 
           className={`${isNominated ? 'btn-gray' :' movie-btn'}`}
           disabled = {isNominated}>
            <span>Nominate</span>
            </button>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
        </div>
      </div>
    );
  })
	
  return (
    <div className="movie-container">
      {loading ? (<div className='loading'><span className='loader'></span></div>) : <div className="movie-box">{movieLists}</div>}
    </div>
  );
};

export default Movies;
