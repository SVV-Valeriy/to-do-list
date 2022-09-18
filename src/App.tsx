import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./components/homePage/homePage";

export const App = () => {
  return (
<Routes>
  <Route path='/' element={ <HomePage/> } />
</Routes>
  )
}