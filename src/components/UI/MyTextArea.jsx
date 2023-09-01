import React from 'react'

const MyTextArea = ({...props}) => {
  return (
    <textarea className='myTextArea' placeholder='Расскижи анекдот...' {...props}/>
  )
}

export default MyTextArea