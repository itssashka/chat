import React from 'react'

const MyTextArea = ({...props}) => {
  return (
    <textarea className='myTextArea' placeholder='Расскажи анекдот...' {...props}/>
  )
}

export default MyTextArea