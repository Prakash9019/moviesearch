import React, { useState,useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router'
const SearchBar = () => {
  const navigate = useNavigate()
  function handle(){
    
    navigate('/')
  }
  const [movies,setMovies]=useState(null);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=96eec41c27075ee3470dbae9023663f7`);
      const res = await response.json();
      console.log(res.results);
      setMovies(res.results);
    }; 
  
    fetchMovieDetails();
  }, []);

    let val = ''
    const [search,setValue] = useState('')
    let filteredData = []
    if(search){
        filteredData = movies.filter((item) =>
        item.original_title.toLowerCase().includes(search.toLowerCase())
            );
            if(!filteredData.length){
              val = 'No results found ....'
            }
    
    
    }
    else{
    val = 'Search Something...'
    }
    
  return (
    <div className='p-4 flex flex-col items-center justify-center gap-7 bg-[#83B4FF]'>
      <FaArrowLeft className='top-0 left-4 absolute mt-4 w-[20px] h-[20px] ' onClick={handle} />
    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[50%]
     focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600
     dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
     placeholder='Search here....'
     onChange={(event)=>setValue(event.target.value)} type='text' />
     <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
    {movies && movies.length > 0 ? (
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
  )
}

export default SearchBar