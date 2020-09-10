import React, { useState, useEffect } from 'react'
import fetch from 'node-fetch'
import {
  ContactCard
} from './components'
import './styles.css'

function randomInt (min, max) {
  return min + Math.floor((max - min) * Math.random())
}

function App () {
  const [contacts, setContacts] = useState([])
  const [countResults, setCountResults] = useState(3)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`https://randomuser.me/api/?results=${countResults}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setLoading(false)
        setContacts(data.results)
      })
  }, [countResults])

  return (
    <>
      {
        loading ? <> <span style={{ padding: '10px' }}> loading </span> <br /> </>
          : contacts.map((contact, index) => (
            <ContactCard
              key={`Contact-${index}`}
              avatar={contact.picture.large}
              name={contact.name.first + ' ' + contact.name.last}
              email={contact.email}
              age={contact.dob.age}
            />
          ))
      }

      <button onClick={() => setCountResults(randomInt(1, 5))}>
          Clique aqui para randomizar uma quantidade de resultados aleatória
      </button>
    </>
  )
}

export default App
