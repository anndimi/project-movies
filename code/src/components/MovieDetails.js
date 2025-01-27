import React, { useEffect, useState } from "react";
import { DETAILS_URL } from "../utils/urls";
import "./MovieDetails.css"
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const MovieDetails = () => {
    const [movie, setMovie] = useState({})
    const { id } = useParams()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(DETAILS_URL(id))
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error('something went wrong!')
                }
            })
            .then((data) => setTimeout(() => setMovie(data), 1000))
            .finally(() => setTimeout(() => setLoading(false), 1000))
            .catch((error) => {
                console.dir(error)
                setError(error.message)
            })
    }, [id])

    const posterSrc = movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : ''

    const backdropSrc = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : ''

    return (
        <article className="details-page">
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage error={error} />}
            <Link to='/' className="go-back-link">
                <p> <span className="back-arrow">&#8666;</span> Go Back</p>
            </Link>
            {!error && movie && (
                <div className="details-background" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,1) 100%), url(${backdropSrc})` }}>
                    <div className="summary">
                        <img className="movie-poster-details" src={posterSrc} alt={movie.title} />
                        <div className="details">
                            <h1 className="movie-title">{movie.title} <span className="rating">{movie.vote_average}/10</span></h1>
                            <p className="movie-overview">{movie.overview}</p>
                        </div>
                    </div>
                </div>
            )}

        </article>
    )

}

export default MovieDetails