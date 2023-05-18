import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import './App.css'
import { useMovies } from './hooks/useMovies'
import { ListOfMovies, Movies, noMoviesRsults } from './components/Movies'


function useSearch () {
  const [ search, updateSearch ] = useState('')
  const [ error, setError ] = useState(null)

  const isFirstInput = useRef(true)

    //FORMA controlada = Validar y controlar las validacion usando react, NO CONTROLADA = funcionesHTML / vanillaJS
    useEffect( () =>{
      if( isFirstInput.current){
        isFirstInput.current = search === ''
        return
      }

      if( search === ''){
        setError('No se Aceptan Campos Vacíos')
        return
      }
      setError(null)
    },[search] )


    return {  search , updateSearch , error }
}


function App() {
  const  {search, updateSearch, error}  = useSearch()
  const { movies : mappedMovies , getMovies } = useMovies({ search })


  //Use ref , para guardar referencias del DOM , y valores mutables (que no se reinician)
  const inputRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies()

  }
  const handleInputChange = ( e ) => {
    updateSearch(e.target.value)
  }





  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de Películas</h1>
          <form action="" className='form'  onSubmit={ handleSubmit }>
            <input 
            style={{
              border : '1px solid transparent',
              borderColor : error ? 'red' : 'transparent'
            }}
            ref={ inputRef }
            onChange={ handleInputChange }
            value={ search }
            type="text" name='query' placeholder='Avenger, Star Wars, The Matrix' />
            <button  type="submit">Buscar</button>
          </form>
          { error && <p style={ { color : 'red' } } >{error}</p>}
        </header>

        <main>
          <Movies movies={mappedMovies}/>
        </main>

      </div>
      

    </>
  )
}

export default App
