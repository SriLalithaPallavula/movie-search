import React from 'react';
import '../css/MovieList.css';

const MovieList = (props) => {

    const { results } = props;

    const moviesList = results.map((result) =>
        <li key={result.Title} onClick={() => props.handleSelectMovie(result.imdbID)}>
            <div className='movieListItem'>
                <img alt={result.Title} src={result.Poster} />
                <div>
                  <span>{result.Title}</span><br />
                  <span>{result.Year}</span>
                </div>
            </div>
        </li>
    );

    if(results.length < 1) return null;

    return (
        <div className="movieListContainer">
            <ul className="movieList">
                {moviesList}
            </ul>
        </div>
    );

}

export default MovieList;