import React from 'react'
import {searchPokemon} from '../api.jsx' //importamos funcion
const {useState} = React;

const Searchbar = (props) => {
  const {OnSearch} = props;
  const [search, setSearch] = useState('');
  

  const onChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.lenght === 0){ //cuando el resultado no coincida
      OnSearch(null)
    }
  }

  const onClick = async (e) => {
    OnSearch(search)
  }

  return (
    <div className='searchbar-container'>
      <div className='searchbar'>
        <input placeholder='Buscar pokemon...' onChange={onChange} />
      </div>
      
      <div className='searchbar-btn'>
        <button onClick={onClick}>Buscar</button>
      </div>

     
    </div>
  );
};

export default Searchbar;
