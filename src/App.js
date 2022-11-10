import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeView from './views/HomeView';
import DetailView from './views/DetailView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <HomeView />}/>
          <Route path='/:id' element={ <DetailView />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
