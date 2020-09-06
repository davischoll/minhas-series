import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({})
  const [success, setSuccess] = useState(false)
  const [mode, setMode] = useState('INFO')
  const [genres, setGenres] = useState([])

  const [data, setData] = useState({})

  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setGenres(res.data.data)
      })
  }, [data])

  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const onChange = field => evt => {
    setForm({
      ...form, 
      [field]: evt.target.value
    })
  }

  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    })
  }

  const save = () => {
    axios
    .put('/api/series/' + match.params.id, form)
    .then(res => {
      setSuccess(true)
    })
  }
  if (success){
    return <Redirect to='/series' />
  }
  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img alt='{data.name}' className='img-fluid img-thumbnail' src={data.poster} />
              </div>
              <div>
                <div>
                  <h2 className='font-weight-light text-white'>{data.name}</h2>
                  <div className='lead text-white'>
                    <p>Gênero: {data.genre}</p>
                    { data.status === 'ASSISTIDO' && <Badge color='success'>Assistido     </Badge> }
                    { data.status === 'ASSISTIR'  && <Badge color='warning'>Para assistir </Badge> }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {mode === 'INFO' &&
      <div className='container'>
        <button className='btn btn-warning mt-3' onClick={() => setMode('EDIT')}>Editar informações</button>
      </div>
      }
      {
        mode === 'EDIT' &&
        <div className='container'>
          <h2 className='mt-3'>Editar Série</h2>
          <div className='mt-2 d-flex justify-content-end'>
            <button className='btn btn-info' onClick={() => setMode('INFO')}>Cancelar edição</button>
          </div>
          <form>
            <div className='form-group'>
              <label htmlFor='name'>Nome</label>
              <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome da série/filme' />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Comentários</label>
              <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='comments' placeholder='Comentários' />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Gênero</label>              
              <select className='form-control' onChange={onChange('genre_id')} >
                <option>Selecione o gênero</option>
                { genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>) }
              </select>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='radio' name='status' id='assistido' checked={form.status === 'ASSISTIDO'} value='ASSISTIDO' onChange={seleciona('ASSISTIDO')} />
              <label className='form-check-label' htmlFor='assistido'>
                Assistido
              </label>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='radio' name='status' id='assistir' checked={form.status === 'ASSISTIR'} value='ASSISTIR' onChange={seleciona('ASSISTIR')} />
              <label className='form-check-label' htmlFor='assistir'>
                Para assistir
              </label>
            </div>
            <button type='button' onClick={save} className='btn btn-primary mt-3 mb-3'>Salvar</button>
          </form>
        </div>
      }
    </div>
  )
}

export default InfoSerie