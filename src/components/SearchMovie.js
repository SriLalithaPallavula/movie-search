import React, { useState, useEffect } from "react";

const SearchMovie = (props) => {
    const {onSearchValue} = props;
    const [searchValue, setSearchValue] = useState(['']);

    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=f12d765f`;

        const response = await fetch(url);
        const responseJson = await response.json();
    
        if (responseJson.Search) {
            onSearchValue(responseJson.Search);
        }
    };

    useEffect(() =>{
        getMovieRequest(searchValue);
    },[searchValue])

    return (
        <div className="search-container">
          <input className="search-box" placeholder="Search.." value={props.value}
          onChange={(event) => setSearchValue(event.target.value)}/>
        </div>
    );
}
export default SearchMovie;