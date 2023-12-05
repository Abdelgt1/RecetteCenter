import React from 'react';

import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./componant/Home/Home";
import Recette from "./componant/Recette/Recette";
import Register from './componant/Regester/Register';
import Profile from './componant/Profile/Profile';
import Auth from './componant/Auth/Auth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recette/:id" element={<Recette />} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/auth" element={<Auth />} />
       <Route path="/registre" element={<Register />} />

      </Routes>
    </div>
  );
}

export default App;
