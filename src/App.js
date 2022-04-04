import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import SearchMovie from './components/SearchMovie';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  const showMovieDetail = async (movieID) => {

    const url = `http://www.omdbapi.com/?i=${movieID}&apikey=f12d765f`;

    const response = await fetch(url);
    const responseJson = await response.json();

    console.log({ responseJson });
    if (responseJson.Error) return;
    setSelectedMovie(responseJson);
  };

  useEffect(() => {
    showMovieDetail(selectedMovie);
  }, [selectedMovie])

  return (
    <div>
      <div className="navbar">
        <SearchMovie setMovies={setMovies} />
      </div>
      <div className="Container">
        <div className="movieList"> <MovieList movies={movies} handleSelectMovie={showMovieDetail}/></div>
        <div className="movieDetail"><MovieDetail selectedMovie={selectedMovie} /></div>
      </div>
    </div>
  );
}

export default App;
