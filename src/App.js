import React, { useState, useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Grid, Loader } from 'semantic-ui-react'

import fetch from 'node-fetch'
import {
  ContactCard
} from './components'
import './styles.css'

function randomInt (min, max) {
  return min + Math.floor((max - min) * Math.random())
}

const listContactsInGrid = (contacts) => (
  <Grid columns={3} divided>
    {
      contacts.map((contact, index) => (
        <Grid.Column
          textAlign='center'
          verticalAlign='middle'
          key={`Contact-${index}`}
        >
          <ContactCard
            key={`Contact-${index}`}
            avatar={contact.picture.large}
            name={contact.name.first + ' ' + contact.name.last}
            email={contact.email}
            age={contact.dob.age}
          >
            <span>children</span>
          </ContactCard>
        </Grid.Column>

      ))
    }
  </Grid>
)

export default () => {
  const [contacts, setContacts] = useState([])
  const [countResults, setCountResults] = useState(10)
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
      {/* {
        loading ? <Loader active size='massive' />
          : listContacts(contacts)
      } */}

      {
        loading ? <Loader active size='massive' />
          : listContactsInGrid(contacts)
      }

      <button style={{ marginTop: '20px' }} onClick={() => setCountResults(randomInt(20, 50))}>
          Clique aqui para randomizar uma quantidade de resultados aleatória
      </button>
    </>
  )
}
