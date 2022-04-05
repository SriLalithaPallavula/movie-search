import React, { useState, useEffect } from "react";
import { TwoThumbInputRange } from "react-two-thumb-input-range";
import { FaSistrix } from "react-icons/fa";

const SearchMovie = (props) => {

    const { setResults, setError, setNumberOfResults } = props;

    const [searchValue, setSearchValue] = useState('');
    const [latestSearchResults, setLatestSearchResults] = useState([]);

    const [yearRange, setYearRange] = useState([1950, 2022]);
    const [searchType, setSearchType] = useState('any');

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

    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=f12d765f`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setError(null);
            setLatestSearchResults(responseJson.Search);
            setNumberOfResults(responseJson.totalResults);
        }else {
            if(responseJson.Error) {
                setError(responseJson.Error);
            }
            setLatestSearchResults([]);
            setNumberOfResults('');
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
        }

        //filter by range
        const minYear = yearRange[0];
        const maxYear = yearRange[1];

        filteredResults = filteredResults.filter((result) => {
            const releaseYear = result.Year.split("–")[0]; //['2021-2022'] or ['2021']
            return (releaseYear >= minYear && releaseYear <= maxYear);
        });

        setResults(filteredResults);

    }, [searchType, latestSearchResults, yearRange]) 

    const types = (searchTypes).map((type) =>
        <div className="radioButtonItem">
            <input id={type.value} type='radio' name='searchType' checked={type.value === searchType}
                onChange={() => { setSearchType(type.value) }} />
            <label for={type.value}>{type.label}</label>
        </div>
    );

    useEffect(() => {        
        //Clear previous results
        setError(null);
        setLatestSearchResults([]);
        setNumberOfResults('');

        //Search only if there are more than 2 characters in input field
        //otherwise api might throw 'too many results' error
        if(searchValue.trim().length > 2) {            
            getMovieRequest(searchValue);
        }        
    }, [searchValue,setError])

    const thumbStyle = {
        background: "#ababab",
        width: "12px",
        height: "12px"
    }

    const thumbFocusStyle = {
        background: "#ababab"
    }

    const inputStyle = {
        height: "5px"
    }

    const iconStyle = {
        color: "#FFFFFF",
        position: "relative",
        right: "-40px",
        top: "2px"
    }

    return (
        <div className="searchContainer">
            <div>
                <FaSistrix style={iconStyle} />
                <input className="searchBox" value={props.value}
                    onChange={(event) => setSearchValue(event.target.value)} placeholder="Search.." />
            </div>
            <div className="filterContainer">
                <div className="searchYearContainer">
                    <span>Year</span>
                    <div className="searchYear">
                        <output>{yearRange[0]}</output>
                        <TwoThumbInputRange onChange={onYearChange} values={yearRange} min={1950} max={2022}
                            thumbStyle={thumbStyle} railColor="#EDF2F7" trackColor="#84888c" thumbFocusStyle={thumbFocusStyle}
                            showLabels={false} inputStyle={inputStyle} />
                        <output>{yearRange[1]}</output>
                    </div>
                </div>
                <div className="searchTypeContainer">
                    <span>Type</span>
                    <div className="searchRadioButton">
                        {types}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SearchMovie;