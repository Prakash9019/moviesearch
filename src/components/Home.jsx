// src/App.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate} from 'react-router'
import { MdFavoriteBorder } from "react-icons/md";
const API_KEY = '96eec41c27075ee3470dbae9023663f7';
const BASE_URL = 'https://api.themoviedb.org/3';
const Home = () => {
  const navigate=useNavigate();
   
  const { id } = useParams();
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  let filteredData = []
  if(query){
      filteredData = movies.filter((item) =>
      item.title || item.name .toLowerCase().includes(query.toLowerCase())
          );
          // if(!filteredData.length){
          //   val = 'No results found ....'
          // }
  
    console.log("searchhhhhhhhh");
    console.log(filteredData);
  }
  // else{
  // val = 'Search Something...'
  // }
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    // onSearch(e.target.value);
    console.log(e.target.value);
  };

//   function handleFavourite(){
//     navigate('/favourites')
// }
  
useEffect(() => {
  const fetchMovieDetails = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=96eec41c27075ee3470dbae9023663f7`);
    const data = await response.json();
    console.log(data.results);
    setMovies(list);
  }; 

  fetchMovieDetails();
}, [id]);
//  const handleclick = async () => {
//    navigate("/description/:id")
//  }
  if (!movies) return(
    <div>heelo</div>
  );

  return (
    <div >

<div className="absolute top-0 right-0 m-4 flex items-center gap-2">
            <MdFavoriteBorder size={28} className="cursor-pointer" />
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                >
                    {/* Replace with your profile icon */}
                    <img src="/path/to/profile-icon.png" alt="Profile" />
                </button>
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                        <ul className="py-2">
                            <li>
                                <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    Login
                                </a>
                            </li>
                            <li>
                                <a href="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                    Signup
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
{/* <button className='p-2 bg-slate-100 rounded-md shadow-black shadow-md' >Favourites</button> */}
     
       <div className="border-solid border-2 border-indigo-600 mt-2 max-w-md mx-auto rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
       <input
        className=" m-2 p-2 h-full  outline-none text-sm text-gray-700 pr-2 center"
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={handleInputChange} /> 
        
    </div>
    <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
   

{ filteredData && filteredData.length > 0 ? (
  
      filteredData.map((movie) => (
        // <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'> 
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
         
        </div></button>
        // </div>
      ))
    ) : (
      movies.map((movie) => (
        // <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'> 
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
        // </div>
      ))
    )}
  </div>
  </div>
  );
};

export default Home;























































































































































































