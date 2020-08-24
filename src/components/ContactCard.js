import React, { useState } from 'react'

export const ContactCard = () => {
  const [showAge, setShowAge] = useState(false)

  return (
    <div className='contact-card'>
      <img src='https://via.placeholder.com/150' alt='profile' />
      <div className='user-details'>
        <p>Name: John Silver</p>
        <p>Email: johnsilver@notreal.com</p>
        <button onClick={() => setShowAge(!showAge)}>
          Toggle Click
        </button>
        {showAge && <p>Age: 23</p>}
      </div>
    </div>
  )
}
