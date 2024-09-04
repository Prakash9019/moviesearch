// src/components/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
      const data = await response.json();
      setMovie(data);
    };

    fetchMovieDetails();
  }, [id]);
  if(movie){
    console.log("hello.....");
    console.log(movie);
  } 

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.release_date}</p>
      <p>{movie.overview}</p>
      {/* Add more movie details here */}
    </div>
  );
};

export default MovieDetails;
