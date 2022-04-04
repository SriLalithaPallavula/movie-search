import React from "react";

import '../css/MovieDetail.css';

export const MovieDetail = (props) => {

    const { selectedMovie } = props;
    
    if(!selectedMovie) return null;

    //console.log(selectedMovie);

    return (
        <div className="movieDetailContainer">
            <div className="movieTitle">
                <div className="movie_poster">
                    <img className="movieDetail_img" src={selectedMovie.Poster} alt={selectedMovie.Title} />
                </div>
                <div className="movie_description">
                    <h1>{selectedMovie.Title}</h1> <br />
                    <span>{selectedMovie.Rated}</span>&nbsp;
                    <span>{selectedMovie.Year}</span>&nbsp;
                    <span>{selectedMovie.Genre}</span>&nbsp;
                    <span>{selectedMovie.Runtime}</span> <br />
                    <span>{selectedMovie.Actors}</span>
                </div>
                <hr />
            </div>
          
            <div className="moviePlot">
                <p>{selectedMovie.Plot}</p>
            </div>
            <hr />
            <div className="movieRating">
                {selectedMovie.Ratings.map((rating) => {
                    return (
                        <div className="movieRatingSource"><span>{rating.Value}</span><br />
                            <span>{rating.Source}</span>
                            <span className="vl"></span></div>
                            
                    );
                })
                }
                
            </div>
        </div>
    );
}

export default MovieDetail;