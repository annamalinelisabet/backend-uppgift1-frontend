import React from 'react';
import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Card from './components/Card'


function App() {

  const [showAll, setShowAll] = useState(false)

  return (
    <div className="App">
      <div className="nav-div">
        <button className={showAll ? 'btn' : 'btn btn-active'} onClick={() => setShowAll(false)}>Nytt ärende</button>
        <button className={!showAll ? 'btn' : 'btn btn-active'} onClick={() => setShowAll(true)}>Alla ärenden</button>
      </div>
      {showAll  ? <Card />
                : <Form />
      }
    </div>
  );
}

export default App;
