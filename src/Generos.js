import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Generos = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('/api/genres').then(res => {
      setData(res.data.data)
    })
  }, [])

  const deleteGenero = id => {
    axios
    .delete('/api/genres/' + id)
    .then(res => {
      const filtrado = data.filter(item => item.id !== id)
      setData(filtrado)
    })
  }

  const renderizaLinha = record => {
    return (
      <tr key={record.id}>
        <th scope='row'>{record.id}</th>
        <td>{record.name}</td>
        <td className='d-flex justify-content-around'>
          <Link to={'/generos/' + record.id} className='btn btn-warning'>Editar</Link>
          <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}>Remover</button>
        </td>
      </tr>
    )
  }

  if (data.length === 0){
    return (
      <div className='container'>
        <h1>Gêneros</h1>
        <div class='alert alert-warning' role='alert'>
          Você não possui gêneros cadastrados.
        </div>
        <div className='mt-2 d-flex justify-content-end'>
          <Link to='/generos/novo' className='btn btn-primary'>Criar novo gênero</Link>
      </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <h2 className='mt-3'>Gêneros</h2>
      <div className='mb-2 d-flex justify-content-end'>
        <Link to='/generos/novo' className='btn btn-primary'>Criar novo gênero</Link>
      </div>
      <table className='table table-striped table-dark'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nome</th>
            <th scope='col' className='d-flex justify-content-center'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderizaLinha)}
        </tbody>
      </table>
    </div>
  )
}

export default Generos
