export const searchPokemon = async (pokemon) => { //funcion
  try{
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;

    }catch(error) {

  }
}

export const getPokemons = async (limit=25, offset=20) => { //offset es la pagina actual
  try{
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;

    }catch(error) {

  } 
};

export const getPokemonData = async (url) => { //obtenemos info del pokemon
  
  try{
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }catch (error){

  }
}