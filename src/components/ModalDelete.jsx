import React from 'react'

const Modal = ({setShowModal, updateIssue}) => {

    const handleClick = () => {
        setShowModal(false)
        updateIssue(3)
    }

  return (
    <div className='modal-bg'>
        <div className='modal'>
            <p className='close-x' onClick={() => setShowModal(false)}>X</p>
            <div className='delete-popup'>
                <h2>Är du säker att du vill avsluta ärendet?</h2>
                <small className='modal-text'>Du kommer inte att kunna lägga till fler kommentarer efter det.</small>
                <div className="button-div">
                    <button className='btn-card btn-end' onClick={handleClick}>Ja, avsluta ärendet</button>
                    <button className='btn-card' onClick={() => setShowModal(false)}>Nej</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal