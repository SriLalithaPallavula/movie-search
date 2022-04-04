import React from 'react';
import '../css/MovieList.css';

const MovieList = (props) => {

    const {movies} = props;

    const moviesList = movies.map((movie) =>
        <li key={movie.Title} onClick={() => props.handleSelectMovie(movie.imdbID)}>
            <div className='movieListItem'>
                <img alt={movie.Title} src={movie.Poster} />
                <div>
                  <span>{movie.Title}</span><br />
                  <span>{movie.Year}</span>
                </div>
            </div>
        </li>
    );

    if(movies.length < 1) return null;

    return (
        <div className="movieListContainer">
            <ul className="movieList">
                {moviesList}
            </ul>
        </div>
    );

}

export default MovieList;