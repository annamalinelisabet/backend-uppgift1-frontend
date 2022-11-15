import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Comment from '../components/Comment'
import Modal from '../components/ModalDelete'

const DetailView = () => {

    const { id } = useParams()

    const [issue, setIssue] = useState('')
    const [comment, setComment] = useState('')
    const [status, setStatus] = useState('')

    const [showForm, setShowForm] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState(false)

    const getIssue = useCallback(async () => {
      const res = await axios.get(`https://localhost:7135/api/Issues/${id}`)
      setIssue(res.data)
      setStatus(res.data.status.id)
    }, [id])
  
    useEffect(() => {
      getIssue()
    }, [getIssue, comment, status])

    const handleSubmit = async e => {
        e.preventDefault()

        if(comment.trim() === ''){
          setError(true)
        }
        else
        {
          const issueId = id
          const customerId = issue.customer.id
          const json = JSON.stringify({comment, issueId, customerId})
  
          const res = await fetch('https://localhost:7135/api/Comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: json
          })

          if(res.status === 200) {
            setComment('')
            setError(false)
            setShowForm(false)
          }

        }    
    }

    const updateIssue = async statusId => {
    
      const json = JSON.stringify({ id, statusId })
      const res = await fetch(`https://localhost:7135/api/Issues/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json
      })
      if(res.status === 200) {
        setStatus(statusId)
      }
    }


    return (
      <>
          { showModal && <Modal setShowModal={setShowModal} updateIssue={updateIssue}/> }
          { issue && 
            <div className='Detail'>
              <div className='detail-top-div'>
                <h1 className='detail-title'>{issue.title}</h1>
              </div>
              { status === 1 && <small className='date-text'>Ärende skapat: {issue.created.slice(0, 10)} kl {issue.created.slice(11, 16)}</small>}
              { status === 2 && <small className='date-text'>Ärende påbörjat: {issue.updated.slice(0, 10)} kl {issue.updated.slice(11, 16)}</small>}
              { status === 3 && <small className='error'>Ärende avslutat: {issue.updated.slice(0, 10)} kl {issue.updated.slice(11, 16)}</small>}
              <p className='detail-description'>{issue.description}</p>
              { status === 1 && <button className='btn' onClick={() => updateIssue(2)}>Påbörja ärende</button> }
              { status === 2 && <button className='btn btn-delete' onClick={() => setShowModal(true)} >Avsluta ärende</button> }
              { status === 3 && <div className="line"></div>  }                                 
              <h3 className='detail-header'>Kundinfo</h3>
              <div className='customer-info'>
                <div className='customer'>
                  <p className='customer-p'>Namn:</p>
                  <p className='customer-p'>Email:</p>
                  <p className='customer-p'>Telefonnummer:</p>
                </div>
                <div>
                  <p className='customer-name'>{issue.customer.firstName} {issue.customer.lastName}</p>
                  <p>{issue.customer.email}</p>
                  <p>{issue.customer.phone}</p>
                </div>
              </div>
              <h3 className='detail-header'>Kommentarer</h3>
              <div className="comments">
              {
                issue.comments.map(comment => ( <Comment key={comment.id} comment={comment}/> ))
              }
              { !showForm && status !== 3 &&
                <button className='btn btn-new' onClick={() => setShowForm(true)}>Lägg till en kommentar</button>
              }
              </div>
              { showForm && 
                <form onSubmit={handleSubmit}>
                  <textarea rows="10" className='comment-input' value={comment} onChange={(e => setComment(e.target.value))}></textarea>
                  <button className='btn btn-new'>SPARA</button>
                  { error && <p className='error'>Du måste ange en kommentar</p>}
                </form>
              }
            </div>
          }
      </>
    )
}

export default DetailView