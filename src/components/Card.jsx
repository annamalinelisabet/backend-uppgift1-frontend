import React from 'react'
import { useState } from 'react'
import Modal from './Modal'

const Card = () => {

  const [started, setStarted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [finished, setFinished] = useState(false)

  return (
    <div className='Card'>
      { showModal && <Modal setShowModal={setShowModal} setFinished={setFinished}/>}
      <h2 className='card-title'>Rubriken</h2>
      <small className='date-text'>Ärende skapat: 2022-10-14 kl 15:30 av malin@mail.se</small>
      <small className='desc-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, maxime dignissimos suscipit aut voluptatem tenetur corrupti ut aliquid ipsam ullam?</small>
      <div className='flex'>
        <div className='status-div'>
          <p className='status-text'>Ärendestatus: </p>
          {
            !started 
            ? <p className='status-not-active'>Ej påbörjad</p>
            : <p className='status-active'>Påbörjad</p>
          }
        </div>
        {
          finished &&
          <p>Ärendet avslutat</p>
          
        }
        {
          !started
          ? <button className='btn-card btn-start' onClick={() => setStarted(true)}>Påbörja ärende</button>
          : <button className='btn-card btn-end' onClick={() => setShowModal(true)}>Avsluta ärende</button>
        }
      </div>
    </div>
  )
}

export default Card