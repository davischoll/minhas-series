import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovoGenero = () => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)
  const onChange = evt => {
    setName(evt.target.value)
  }
  const save = () => {
    axios
    .post('/api/genres', {
      name
    })
    .then(res => {
      setSuccess(true)
    })
  }
  if (success){
    return <Redirect to='/generos' />
  }
  return (
    <div className='container'>
      <h2 className='mt-3'>Novo Gênero</h2>
        <form>
          <div className='form-group'>
            <label for='name'>Nome</label>
            <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Nome do gênero' />
          </div>
          <button type='button' onClick={save} className="btn btn-primary">Adicionar</button>
        </form>
    </div>
  )
}

export default NovoGenero