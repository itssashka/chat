import React from 'react'

const MyInput = ({type, value, ...props}) => {
  return (
    <input type={type} value={value} {...props} className='myInput'/>
  )
}

export default MyInput