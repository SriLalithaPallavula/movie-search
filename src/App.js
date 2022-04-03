import React,{useState} from 'react';
import './App.css';
import MovieList from './components/MovieList';
import SearchMovie from './components/SearchMovie';

function App() {

  const [movies, setMovies] = useState([]);

  return (
    <div>
      <div className="navbar">
        <SearchMovie onSearchValue={setMovies} />
      </div>
      <div className="Container">
        <div className="movieList"> <MovieList  movies={movies}/></div>
      </div>
    </div>
  );
}

export default App;
