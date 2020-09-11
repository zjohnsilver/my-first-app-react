import React, { useState, useEffect, useRef } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Grid, Loader } from 'semantic-ui-react'

import fetch from 'node-fetch'
import {
  ContactCard
} from './components'
import './styles.css'

// function randomInt (min, max) {
//   return min + Math.floor((max - min) * Math.random())
// }

const listContactsInGrid = (contacts, numberColumns) => (
  <Grid columns={numberColumns} divided>
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
          />
        </Grid.Column>

      ))
    }
  </Grid>
)

export default () => {
  const [contacts, setContacts] = useState([])
  const [countResults, setCountResults] = useState(10)
  const [loading, setLoading] = useState(false)
  const [numberColumns, setNumberColumns] = useState(4)
  const numberColumnsRef = useRef(4)

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
          : listContactsInGrid(contacts, numberColumns)
      }

      <button class='ui button' style={{ margin: '20px' }} onClick={() => setCountResults(previousState => ++previousState)}>
          Add one more card
      </button>

      <br />

      <div class='ui input focus' style={{ margin: '20px' }}>
        <input type='text' placeholder={numberColumns} onChange={event => { numberColumnsRef.current = event.target.value }} />
      </div>

      <button class='ui button' style={{ margin: '20px' }} onClick={() => setNumberColumns(numberColumnsRef.current)}>
          Update number of columns
      </button>
    </>
  )
}
