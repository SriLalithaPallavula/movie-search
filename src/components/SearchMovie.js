import React, { useState, useEffect } from "react";
import { TwoThumbInputRange } from "react-two-thumb-input-range";


const SearchMovie = (props) => {

    const { setMovies } = props;

    const [searchValue, setSearchValue] = useState(['']);
    const [latestSearchResults, setLatestSearchResults] = useState([]);

    const [yearRange, setYearRange] = useState([1950, 2022]);

    const [searchType, setSearchType] = useState('any');


    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=f12d765f`;

        const response = await fetch(url);
        const responseJson = await response.json();

        //console.log({ responseJson });

        if (responseJson.Search) {
            setLatestSearchResults(responseJson.Search);
            //setMovies(responseJson.Search);
        }
    };

    const onYearChange = (values) => {
        setYearRange(values);
    };

    useEffect(() => {
        let filteredResults = [];

        //filter by type
        if (searchType === "any") {
            filteredResults = latestSearchResults;
        } else {
            filteredResults = latestSearchResults.filter((result) => result.Type === searchType);
            //   console.log({ filteredResults });

        }

        //filter by range
        const minYear = yearRange[0];
        const maxYear = yearRange[1];

        filteredResults = filteredResults.filter((result) => result.Year >= minYear && result.Year <= maxYear);
        console.log({filteredResults})
        setMovies(filteredResults);

    }, [searchType, latestSearchResults, yearRange])


    const searchTypes = [
        {
            label: "Any",
            value: "any"
        },
        {
            label: "Movies",
            value: "movie"
        },
        {
            label: "Series",
            value: "series"
        },
        {
            label: "Episodes",
            value: "episode"
        }
    ];

    const types = (searchTypes).map((type) =>

        <div className="radioButtonItem">
            <input id={type.value} type='radio' name='searchType' checked={type.value === searchType}
                onChange={() => { setSearchType(type.value) }} />
            <label for={type.value}>{type.label}</label>
        </div>

    );

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue])

    return (
        <div className="searchContainer">
            <input className="searchBox" value={props.value}
                onChange={(event) => setSearchValue(event.target.value)} placeholder="Search.." />
            <div className="searchYear">
                <TwoThumbInputRange onChange={onYearChange} values={yearRange} min={1950} max={2022} />
            </div>
            <div className="radioButtonContainer">
                {types}
            </div>
        </div>
    );
}
export default SearchMovie;