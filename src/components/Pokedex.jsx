import React from 'react'
import Pagination from './Pagination.jsx' //importante, colocarlo encima de Pokemon
import { Pokemon } from './pokemon.jsx'


function Pokedex(props) {
  // console.log(props); 
  const {pokemons, page, setPage, total, loading} = props; //!PROPS 

  const lastPage = () => {
    const nextPage = Math.max(page - 1, 0)
    setPage(nextPage)
  }

  const nextPage = () => {
    const nextPage = Math.min(page + 1, total -1)
    setPage(nextPage)
  }

    return ( 
    <div> 
      <div className='header'> 
        <h1>Pokedex</h1>
        <Pagination 
        page= {page + 1}//empezamos en la pagina 2
        totalPages= {total}
        onLeftClick={lastPage}
        onRightClick={nextPage}
        />
      </div>
      {loading ? (
        <div>Cargando pokemones...</div>
      ) : (
        <div className="pokedex-grid">
          {pokemons.map((pokemon, idx) => {
            return <Pokemon pokemon={pokemon} key={pokemon.name} />;
          })}
         
      </div> 
      )}
    </div> 
  ) 
}

export default Pokedex;


