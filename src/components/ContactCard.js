import React, { useState } from 'react'

export const ContactCard = (props = {}) => {
  const { avatar, name, email, age, children } = props
  const [showAge, setShowAge] = useState(false)

  return (
    <div className='contact-card'>
      <img src={avatar} alt='profile' />
      <div className='user-details'>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <button onClick={() => setShowAge(!showAge)}>
          Toggle Age
        </button>
        {showAge && <p>Age: {age}</p>}
      </div>
      {children}
    </div>
  )
}
