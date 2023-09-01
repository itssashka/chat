import React from 'react'

const MyBtn = ({type, children, ...props}) => {
  return (
    <button type={type} className='myBtn' {...props}>{children}</button>
  )
}

export default MyBtn