import React, { useState, useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Loader } from 'semantic-ui-react'
import fetch from 'node-fetch'
import {
  ContactCard
} from './components'
import './styles.css'

function randomInt (min, max) {
  return min + Math.floor((max - min) * Math.random())
}

const listContacts = (contacts) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      {
        contacts.map((contact, index) => (
          <ContactCard
            key={`Contact-${index}`}
            avatar={contact.picture.large}
            name={contact.name.first + ' ' + contact.name.last}
            email={contact.email}
            age={contact.dob.age}
          />
        ))
      }
    </div>
  )
}

export default () => {
  const [contacts, setContacts] = useState([])
  const [countResults, setCountResults] = useState(3)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`https://randomuser.me/api/?results=${countResults}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setContacts(data.results)
      })
      .finally(_ => {
        setLoading(false)
      })
  }, [countResults])

  return (
    <>
      {
        loading ? <Loader active size='massive' />
          : listContacts(contacts)
      }

      <button onClick={() => setCountResults(randomInt(10, 30))}>
          Clique aqui para randomizar uma quantidade de resultados aleatória
      </button>
    </>
  )
}
