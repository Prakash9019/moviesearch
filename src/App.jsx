// src/App.js
import React, { useEffect, useState } from 'react';
import { MdFavoriteBorder } from "react-icons/md";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from './components/Home';
import Login from "./components/Login";
import Register from "./components/Register";
import FavoritesPage from "./components/FavoritesPage";
import SearchBar from './components/Searchbar';
import MovieDescription from './components/MovieDescription';


const API_KEY = '96eec41c27075ee3470dbae9023663f7';
const BASE_URL = 'https://api.themoviedb.org/3';
const App = () => {
//   function handleFavourite(){
//     navigate('/favourites')
// }
  



  return (
    <div>
      <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/favourites" element={<FavoritesPage />} />
      <Route path="/hello" element={<SearchBar />} />
      <Route path="/description/:id" element={<MovieDescription/>} />
    </Routes></Router>
    </div>
  );
};

export default App;