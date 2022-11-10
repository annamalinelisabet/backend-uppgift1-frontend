import {useState} from 'react'

const ModalForm = ({setCustomerFormOpen}) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  
  const [error, setError] = useState(false)
    
  const handleSubmit = async e => {
    e.preventDefault()

    if(firstName.trim() === '' || lastName.trim() === '' || email.trim() === ''){
      setError(true)
    }
    
    const json = JSON.stringify({firstName, lastName, email, phone})

    const res = await fetch('https://localhost:7135/api/Customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    })
    if(res.status === 200) {
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setError(false)
      setCustomerFormOpen(false)
    }
  }

  return (
    <div className='modal-bg'>
      <div className="modal">
        <p className='close-x' onClick={() => setCustomerFormOpen(false)}>X</p>
        <form className='new-customer' onSubmit={handleSubmit}>
          <h2>Ny kund</h2>
          <div>
            <label htmlFor="firstName" id='firstName'>Förnamn</label>
            <input type="text" name='firstName' placeholder='Ange kundens förnamn...' onChange={e => setFirstName(e.target.value)} value={firstName}/>
          </div>
          <div>
            <label htmlFor="lastName" id='lastName'>Efternamn</label>
            <input type="text" name='lastName' placeholder='Ange kundens efternamn...'  onChange={e => setLastName(e.target.value)} value={lastName}/>
          </div>
          <div>
            <label htmlFor="email" id='email'>Email</label>
            <input type="email" name='email' placeholder='Ange kundens epostadress...'  onChange={e => setEmail(e.target.value)} value={email}/>
          </div>
          <div>
            <label htmlFor="phone" id='phone'>Telefonummer</label>
            <input type="text" name='phone' placeholder='Ange kundens telefonnummer (valfritt)...'  onChange={e => setPhone(e.target.value)} value={phone}/>
          </div>
          <button className='btn btn-new'>Lägg till</button>
          { error && <p className='error'>Du måste fylla i alla obligatoriska fält</p>}
        </form>
      </div>
    </div>
  )
}

export default ModalForm