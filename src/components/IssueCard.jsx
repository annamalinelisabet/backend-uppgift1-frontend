import { Link } from 'react-router-dom'

const IssueCard = ( {issue} ) => {

    return (
        <div className='Card'>
            <h2 className='card-title'>{issue.title}</h2>
            <small className='date-text'>Ärende skapat: {issue.created.slice(0, 10)} kl {issue.created.slice(11, 16)}</small>
            <div className='card-flex'>                
                <p className='status-text'>Ärendestatus: {issue.status.status}</p>                 
                <Link to={`/${issue.id}`}><button className='btn-card'>Se detaljer</button></Link>
            </div>
        </div>
    )
}

export default IssueCard