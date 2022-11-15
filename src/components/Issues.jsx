import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import IssueCard from './IssueCard'

const Issues = () => {

  const [issues, setIssues] = useState([])

  const getIssues = useCallback(async () => {
    const res = await axios.get('https://localhost:7135/api/Issues')
    setIssues(res.data)
  }, [])

  useEffect(() => {
    getIssues()    
  }, [getIssues])

  return (
    <div>
      { issues && [...issues].reverse().map(issue => <IssueCard key={issue.id} issue={issue} />) }
    </div>
  )
}

export default Issues