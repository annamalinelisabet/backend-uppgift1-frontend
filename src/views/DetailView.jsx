import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Comment from '../components/Comment'

const DetailView = () => {

    const { id } = useParams()
    const [issue, setIssue] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [comment, setComment] = useState('')
    const [error, setError] = useState(false)

    const getIssue = useCallback(async () => {
      const res = await axios.get(`https://localhost:7135/api/Issues/${id}`)
      setIssue(res.data)
    }, [id])
  
    useEffect(() => {
      getIssue()
    }, [getIssue, comment])

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

    return (
      <>
          { issue && 
            <div>
              <h1 className='detail-title'>{issue.title}</h1>
              <small className='date-text'>Ärende skapat: {issue.created.slice(0, 10)} kl {issue.created.slice(11, 16)}</small>
              <p className='detail-description'>{issue.description}</p>
              <div className='line'></div>
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
              { !showForm &&
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