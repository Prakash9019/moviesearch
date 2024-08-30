// src/App.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = '96eec41c27075ee3470dbae9023663f7';
const BASE_URL = 'https://api.themoviedb.org/3';
const App = () => {

  const { id } = useParams();
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=96eec41c27075ee3470dbae9023663f7`);
      const data = await response.json();
      console.log(data.results);
      setMovies(data.results);
    }; 

    fetchMovieDetails();
  }, [id]);

  if (!movies) return <div>Loading...</div>;

  return (
    <div>
       <div className="text-center p-4">
        
         <input
      type="text"
      placeholder="Search for a movie..."
      value={query}
      onChange={handleInputChange}
    />
      </div>
    <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
    {movies.length > 0 ? (
      movies.map((movie) => (
        // <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'> 
        <div key={movie.id} className='m-2 p-3 group'>
           <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title}
            className=" m-1 h-full w-full object-cover object-center group-hover:opacity-75"
          />
          <h3 className="mt-4 text-sm text-gray-700">{movie.title || movie.name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900" >{ 
          new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(movie.release_date || movie.first_air_date)) 
          
          }</p>
         
        </div>
        // </div>
      ))
    ) : (
      <p>No movies found</p>
    )}
  </div>
  </div>
  );
};

export default App;