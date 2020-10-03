import React, { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = 'https://image.tmdb.org/t/p/original/';

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    // A snippet of code which runs based on a specific condition
    useEffect(() => {
        // if [], run once when the row loads, and don't run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
        // whenever you use anything inside of a useEffect if there is any variable that is being pulled in from outside but it's used inside of the useEffect you have to include it inside of here []. The reason being is because it's dependent on that variable so it's now a dependency.
    }, [fetchUrl]);

    console.table(movies);
    // key - if anything changes in that row react doesn't simply re-render the entire row it just re-renders what it needs to re-render

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || '')
                .then((url) => {
                    // e.g. https://www.youtube.com/watch?v=3Ct6zuHYDtY --> v=3Ct6zuHYDtY
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="row">
            {/* title */}
            <h2>{title}</h2>
            {/* container -> posters */}
            <div className="row__posters">
                {/* several row_poster(s) */}
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>

            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
            {/* <Youtube videoId="XtMThy8QKqU" opts={opts} /> */}
        </div>
    );
};

export default Row;
