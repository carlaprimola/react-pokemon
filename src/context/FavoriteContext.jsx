import React, { createContext } from "react";

const FavoriteContext = createContext({
  favoritePokemons: [],
  updateFavoritePokemons: (id) => null
});

export const FavoriteProvider = FavoriteContext.Provider;

export default FavoriteContext;