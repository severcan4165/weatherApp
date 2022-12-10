import React from 'react'
import { InputGroup } from 'react-bootstrap'
import  Form  from 'react-bootstrap/Form'

const Home = () => {
  return (
    <div>
        <div className='container'>
        <InputGroup className="mb-3">
            <Form.Control
                placeholder="Search a City by name"
                aria-label="Username"
            />
        </InputGroup>
        </div>
    </div>
  )
}

export default Home