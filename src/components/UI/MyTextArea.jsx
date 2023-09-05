import React from 'react'

const MyTextArea = ({...props}) => {
  return (
    <textarea className='myTextArea' placeholder='Как стать сигмой?' {...props}/>
  )
}

export default MyTextArea