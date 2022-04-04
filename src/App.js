import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import SearchMovie from './components/SearchMovie';

function App() {

  const [movies, setMovies] = useState([]);
  const [numberOfResults, setNumberOfResults] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const showMovieDetail = async (movieID) => {
    const url = `http://www.omdbapi.com/?i=${movieID}&apikey=f12d765f`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (!responseJson.Error) {
      setSelectedMovie(responseJson);
    }    
  };

  useEffect(() => {
    if(movies.length > 0) {
      showMovieDetail(selectedMovie);
    } else {
      setSelectedMovie(null);
    }    
  }, [selectedMovie,movies])

  return (
    <div>
      <div className="navbar">       
        <SearchMovie setMovies={setMovies} setNumberOfResults={setNumberOfResults} />
      </div>
      <div className="container">
        <div className="results">
           {
             numberOfResults && <span className='noOfResults'>{`${numberOfResults} RESULTS`}</span> 
           }            
           <MovieList movies={movies} handleSelectMovie={showMovieDetail}/>
        </div>
        <MovieDetail selectedMovie={selectedMovie} />
      </div>
    </div>
  );
}

export default App;
