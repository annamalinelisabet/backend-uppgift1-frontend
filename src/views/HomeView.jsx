import React from 'react'
import { useState } from 'react';
import Issues from '../components/Issues';
import Form from '../components/Form';

const HomeView = () => {

    const [showAll, setShowAll] = useState(true)

    return (
        <div>
            <div className="nav-div">
                <button className={!showAll ? 'btn' : 'btn btn-active'} onClick={() => setShowAll(true)}>Alla ärenden</button>
                <button className={showAll ? 'btn' : 'btn btn-active'} onClick={() => setShowAll(false)}>Nytt ärende</button>
            </div>
            {showAll    ? <Issues />
                        : <Form setShowAll={setShowAll}/>
            }
        </div>
    )
}

export default HomeView