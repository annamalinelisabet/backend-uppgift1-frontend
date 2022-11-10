import React from 'react'

const Modal = ({setShowModal, setFinished}) => {

    const handleClick = () => {
        setShowModal(false)
        setFinished(true)
    }

  return (
    <div className='modal-bg'>
        <div className='modal'>
            <div>
                <h3>Vill du avsluta ärende nr *ID*?</h3>
                <div className="button-div">
                    <button className='btn-card btn-end' onClick={handleClick}>Ja, avsluta ärendet</button>
                    <button className='btn-card btn-start' onClick={() => setShowModal(false)}>Nej</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal