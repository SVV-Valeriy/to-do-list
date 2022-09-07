import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./components/homepage";
import {Provider} from "react-redux";
import {store} from "./store/store";

function App() {

  return (
<Routes>
  <Route path='/' element={ <HomePage/> } />
</Routes>
  )
}

export default App;
