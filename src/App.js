import React from "react";
import './App.css';
import Navbar from './components/Navbar.jsx';
import Searchbar from "./components/Searchbar.jsx";
import Pokedex from "./components/Pokedex.jsx";
import { getPokemonData, getPokemons, searchPokemon } from "./api.jsx";
import { FavoriteProvider } from "./context/FavoriteContext.jsx";

const {useState, useEffect} = React;

const localStorageKey = "favorite_pokemon" //!NO LO ENTIENDO

function App() {
  const [pokemons, setPokemons] = useState([]); //corchetes por ser un array
  const [page, setPage] = useState(1) //Paginacion //con el useState(1) pasamos a la pagina 2
  const [total, setTotal] = useState(0) //Total paginas
  const [loading, setLoading] = useState (true) //pagina actual
  const [favorites, setFavorites] = useState(["raichu"]) //corazones
  const [notFound, setNotFound] = useState(false) //no hay resultados
  const [searching, setSearching] = useState (false)
  
  const fetchPokemons = async () => { //!FETCH
    try {
      setLoading(true) //TODO: mensaje de loading al cargar la pagina
      const data = await getPokemons(25, 25 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false); //TODO:cuando cargue la pagina muestra los pokemon
      setTotal(Math.ceil(data.count / 25)) //TODO: divimos /25 porque es el num de pokemon por pagina
      setNotFound(false)
    }catch (error){}
  }

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons) 
  }

  useEffect(() => {
    loadFavoritePokemons(); //* al recargar los likes se guardan
  }, [])
  
  useEffect(() => {
    if(!searching){
      fetchPokemons();
    }
  }, [page]); //TODO: ejecuta cada vez que se actualice la pagina

  
  const updateFavoritePokemons = (name) => {
    const updated = [...favorites]
    const isFavorite = updated.indexOf(name)
    if(isFavorite >= 0){
      updated.splice(isFavorite, 1)
    } else {
      updated.push(name)
    } 
    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated)) //* al recargar los likes se guardan
  }

  
  const OnSearch = async (pokemon) => { //*Funcion buscar
    if(!pokemon) {
      return fetchPokemons()
    }
    setLoading(true) //mensaje de loading
    setNotFound(false)
    setSearching(true)
    const result = await searchPokemon(pokemon);
    if(!result){ //si NO hay resultados...
      setNotFound(true)
      setLoading(false)
      return;

    }else { //si hay resultados...
      setPokemons([result]) //mostramos los resultados
      setPage(0)
      setTotal(1) //me sale 1 resultado tras buscar
    }
      setLoading(false) //cuando aparece el resultado de busqueda
      setSearching(false)
  }

  return (
    <FavoriteProvider 
    value={{ //TODO: la info que me devuelve useContext
      favoritePokemons: favorites,
      updateFavoritePokemons: updateFavoritePokemons
    }}
    >
      <div>
        <Navbar />
        <div className="App">
          <Searchbar OnSearch={OnSearch} />
          {notFound ? (
            <div className="not-found-text">Parece que tu Pokemon no existe 🤯</div>
          ) : (
            <Pokedex pokemons={pokemons}
              loading={loading}
              page={page}
              setPage={setPage}
              total={total}
              />
              )}          
        </div>
    </div>
    </FavoriteProvider>
  );
}

export default App;

