import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function FavoritesPage() {
    const navigate = useNavigate()
  let favourites = []
  if(localStorage){
    favourites = JSON.parse(localStorage.getItem('favourites',favourites)) || []
  }
  return (
    
    <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
        {favourites && favourites.length ? favourites.map(movie=>(
            <button onClick={ ()=> navigate(`/description/${movie.id}`)}>
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
            </button>
        )):<p> No favorites listed</p>}
      </div>
   
  )
}

export default FavoritesPage