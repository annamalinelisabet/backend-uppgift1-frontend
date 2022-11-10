import React from 'react'

const Comment = ({ comment }) => {

  return (
    <div className='comment'>
        <small className='date-text'>{comment.created.slice(0, 10)} kl {comment.created.slice(11, 16)}</small>
        <p>{comment.comment}</p>
    </div>
  )
}

export default Comment