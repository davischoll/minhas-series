import React from 'react'
import Header from './Header'
import Generos from './Generos'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'
import Series from './Series'
import NovaSerie from './NovaSerie'
import InfoSerie from './InfoSerie'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

const Home = () => {
  return (
    <div className='container mt-5 text-center'>
      <h1>
        Bem vindo ao App MINHAS SÉRIES,
        <br></br>
        o gerenciador das suas séries e filmes favoritos!
      </h1>
      <br></br>
      <br></br>
      <h2>Para começar, selecione um item no menu.</h2>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/generos' exact component={Generos} />
          <Route path='/generos/novo' exact component={NovoGenero} />
          <Route path='/generos/:id' exact component={EditarGenero} />
          <Route path='/series' exact component={Series} />
          <Route path='/series/novo' exact component={NovaSerie} />
          <Route path='/series/:id' exact component={InfoSerie} />
        </Switch>
      </div>
    </Router>
  )
}

export default App