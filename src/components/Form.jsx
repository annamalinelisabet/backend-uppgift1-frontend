import { useState, useEffect, useCallback } from 'react'
import ModalForm from './ModalForm'
import axios from 'axios'

const Form = ({ setShowAll }) => {

  const [customerFormOpen, setCustomerFormOpen] = useState(false)
  const [error, setError] = useState(false)
  const [customers, setCustomers] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [customerId, setCustomerId] = useState(0)

  const getCustomers = useCallback(async () => {
    const res = await axios.get('https://localhost:7135/api/Customers')
    setCustomers(res.data)
  }, [])

  useEffect(() => {
    getCustomers()
  }, [getCustomers, customers])
    
  const handleSubmit = async e => {
    e.preventDefault()

    if(title.trim() === '' || description.trim() === '' || customerId === 0){
      setError(true)
    }
    
    const json = JSON.stringify({ title, description, customerId})
    const res = await fetch('https://localhost:7135/api/Issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    })
    if(res.status === 200) {
      setTitle('')
      setDescription('')
      setError(false)
      setCustomerId(0)
      setShowAll(true)
    }
  }

  return (
      <>
        { customerFormOpen && <ModalForm setCustomerFormOpen={setCustomerFormOpen}/>}
        <form onSubmit={handleSubmit}>               
            <label htmlFor="customer" id='customer'>Kund</label>
              <select onChange={e => setCustomerId(e.target.value)}>
                <option value={0}>-- Ange kund --</option>
                {
                  customers.map(customer => <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>)
                }
              </select>
            <p className='customer-text'>Finns inte kunden i listan? <span className='span' onClick={() => setCustomerFormOpen(true)}>Lägg till en ny.</span></p>
            <div>
              <label htmlFor="title" id='title'>Rubrik</label>
              <input type="text" name='title' onChange={e => setTitle(e.target.value)} value={title} placeholder='Ange en rubrik för ärendet...'/>
            </div>
            <div>
              <label htmlFor="description" id='description'>Beskrivning</label>
              <textarea name="description" rows="10" onChange={e => setDescription(e.target.value)} value={description} placeholder='Ange en beskrivning av ärendet...'></textarea>
            </div>
            <button className='btn btn-new'>Skapa nytt ärende</button>
            { error && <p className='error'>Du måste fylla i alla fält</p>}
        </form>
      </>
  )
}

export default Form