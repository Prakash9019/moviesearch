import React from 'react'
import { useLocation, useNavigate, useParams} from 'react-router'
import { FaRegStar } from "react-icons/fa";
import {movies} from "./Data.jsx";
import { FaCircleArrowLeft } from "react-icons/fa6";
const MovieDescription = () => {
  const {id}=useParams();
  console.log(movies);
  const movie = movies.find(m => m.id == id);
  const navigate=useNavigate();
  
  let favourites = []
  if(localStorage){
    favourites = JSON.parse(localStorage.getItem('favourites')) || []
  }
  function handleAdd(){
    if (localStorage) {
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        favourites.push(movie);
        const fav = [...new Set(favourites)]
        localStorage.setItem('favourites', JSON.stringify(fav));
        navigate('/favourites')
    }
  }
  function handleRemove(){
    if (localStorage) {
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        const newFavourites = favourites.filter(mv=>(
          mv.id !== movie.id
        ))
        localStorage.setItem('favourites', JSON.stringify(newFavourites));
        navigate('/favourites')
    }
  }


  return (
    <div className='p-2  min-h-screen'>
      
      <div className='flex flex-col items-center justify-center gap-4 m-6 shadow-black shadow-lg  p-2'>
      <img className='w-[90%] h-[10%] md:w-[50%] md:h-[440px] rounded-md' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="Movie Backdrop" />
    <div className='mb-2 w-[90%] md:basis-1/2 flex flex-col items-center justify-around'>
      <p className='text-3xl font-bold mb-4'>
      {movie.title || movie.name}
      </p>
      <p className='flex flex-row items-center justify-center gap-1 mb-3 mt-3'>
      <FaRegStar className='text-yellow-500' />
       {movie.vote_average}
      </p>
      <p className='flex flex-row items-center justify-center gap-1'><p className='text-xl font-bold'>Release-Date:</p>
      <p className='text-lg font-bold '>{ 
          new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(movie.release_date || movie.first_air_date)) 
          
          }</p></p>
      <p className='w-[95%] md:w-[80%] text-lg'>
      {movie.overview}
      </p>
      <div>
      {favourites.some(mv=>mv.id === movie.id) ? 
        <button className='p-2 bg-blue-400 rounded-md mt-4 shadow-black shadow-md' onClick={handleRemove}>Remove from Favourites </button>
      :
      <button className='p-2 bg-blue-300 rounded-md mt-4 shadow-black shadow-md' onClick={handleAdd}>Add to Favourites </button>
      }
      </div>
    </div>
    </div>
    </div>
  )
}

export default MovieDescription