import React, { Fragment, useEffect, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import '../css/MovieDetail.css';

export const MovieDetail = (props) => {

    const { selectedMovie } = props;

    const [addedToWatchList, setAddedToWatchList] = useState(false);

    useEffect(() => {
        if (selectedMovie && localStorage.getItem("watchList")) {
            const watchList = JSON.parse(localStorage.getItem("watchList"));
            if (watchList.indexOf(selectedMovie.imdbID) >= 0) {
                setAddedToWatchList(true);
            } else {
                setAddedToWatchList(false);
            }
        }
    }, [selectedMovie])

    const addToWatchList = (movie) => {

        const isAddingToWatchList = !addedToWatchList;

        if (isAddingToWatchList) {
            if (localStorage.getItem("watchList")) {
                const watchList = JSON.parse(localStorage.getItem("watchList"));
                watchList.push(movie.imdbID);
                localStorage.setItem("watchList", JSON.stringify(watchList));
            } else {
                localStorage.setItem("watchList", JSON.stringify([movie.imdbID]));
            }
            setAddedToWatchList(true);
        }
        else {
            const watchList = JSON.parse(localStorage.getItem("watchList"));
            const index = watchList.indexOf(movie.imdbID);
            if (index > -1) {
                watchList.splice(index, 1);
            }
            localStorage.setItem("watchList", JSON.stringify(watchList));
            setAddedToWatchList(false);
        }
    }

    if (!selectedMovie) return null;

    return (
        <div className="movieDetailContainer">
             
             <div className="watchListContainer">
                <button className="btnWatchList" onClick={() => addToWatchList(selectedMovie)}>
                        {addedToWatchList ? <FaBookmark /> : <FaRegBookmark />}
                        Watchlist
                </button>
            </div>
            
            <div className="movieTitle">
                <div className="moviePoster">
                    <img className="moviePosterImg" src={selectedMovie.Poster} alt={selectedMovie.Title} />
                </div>
                <div className="movieCast">
                    <h1>{selectedMovie.Title}</h1> <br />
                    <span className="rated">{selectedMovie.Rated}</span>
                    <span className="details">{selectedMovie.Year}</span>
                    <span className="details">{selectedMovie.Genre}</span>
                    <span className="details">{selectedMovie.Runtime}</span> <br />
                    <span className="details">{selectedMovie.Actors}</span>
                </div>
               
            </div>

            <div className="moviePlot">
                <hr />
                <p>{selectedMovie.Plot}</p>
                <hr />
            </div>

            <div className="movieRating">
                {selectedMovie.Ratings.map((rating) => {
                    return (
                        <Fragment key={rating.Source}>
                            <div className="movieRatingSource">
                                <span>{rating.Value}</span>
                                <span>{rating.Source}</span>                            
                            </div>
                            <span className="verticalLine"/>
                        </Fragment>
                    );
                })
                }

            </div>
        </div>
    );
}

export default MovieDetail;