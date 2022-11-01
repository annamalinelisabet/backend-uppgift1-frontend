import { useState } from 'react'

const Form = () => {

  const [newErrand, setNewErrand] = useState({
    title: '',
    description: '',
    email: ''
  })

  const onChange = e => {
    setNewErrand(() => ({
      [e.target.name]: e.target.value
    }))
    console.log(newErrand.title)

  }

  const handleSubmit = e => {
    e.preventDefault()
  }


  return (
        <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" id='title'>Rubrik:</label>
              <input type="text" name='title' onChange={onChange} value={newErrand.title}/>
            </div>
            <div>
              <label htmlFor="description" id='description'>Beskrivning:</label>
              <textarea name="description" rows="10" onChange={onChange} value={newErrand.description}></textarea>
            </div>
            <div>
              <label htmlFor="email" id='email'>Email:</label>
              <input type="email" name='email' onChange={onChange} value={newErrand.email}/>
            </div>
            <button className='btn btn-new'>Skapa nytt ärende</button>
      </form>
  )
}

export default Form