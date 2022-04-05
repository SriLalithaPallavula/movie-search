import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import SearchMovie from './components/SearchMovie';

function App() {

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [numberOfResults, setNumberOfResults] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  //fetches the movie details based on the selected movie and sets it as prop on the MovieDetail component
  const showMovieDetail = async (movieID) => {
    const url = `http://www.omdbapi.com/?i=${movieID}&apikey=f12d765f`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (!responseJson.Error) {
      setSelectedMovie(responseJson);
    }    
  };

  useEffect(() => {
    if(results.length > 0) {
      showMovieDetail(selectedMovie);
    } else {
      setSelectedMovie(null);
    }    
  }, [selectedMovie,results])

  return (
    <div>
      <div className="navbar">       
        <SearchMovie setResults={setResults} setError={setError} setNumberOfResults={setNumberOfResults} />
      </div>
      <div className="container">
        <div className="results">
           {
             error && <span className='errorMessage'>{error}</span>
           }  
           {
             numberOfResults && <span className='noOfResults'>{`${numberOfResults} RESULTS`}</span> 
           }            
           <MovieList results={results} handleSelectMovie={showMovieDetail}/>
        </div>
        <MovieDetail selectedMovie={selectedMovie} />
      </div>
    </div>
  );
}

export default App;
