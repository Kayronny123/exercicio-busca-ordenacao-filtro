import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import pokemons from "./pokemon/pokemon.json";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { getColors } from "./utils/ReturnCardColor";
import Header from "./components/Header/Header.js";
const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  
  }
`;
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  justify-items: center;
`;
function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [type, setType] = useState("");
  const [ordenar, setOrdenar] = useState("");

  return (
    <>
      <GlobalStyle />
      <Header
        idFilter={idFilter}
        setIdFilter={setIdFilter}
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        type={type}
        setType={setType}
        ordenar={ordenar}
        setOrdenar={setOrdenar}
      />
      <CardsContainer>
        {pokemons
          .filter((pokemon) => {
            return idFilter ? pokemon.id.includes(idFilter) : pokemon;
          })
          .filter((pokemon) => {
            return pokemon.name.english
              .toLowerCase()
              .includes(pesquisa.toLowerCase());
          })
          .filter((pokemon) => {
            return type === "" ? pokemon : pokemon.type.includes(type);
          })
          .sort((pokemon1, pokemon2) => {
            if (ordenar === "crescente") {
              return pokemon1.name.english > pokemon2.name.english ? 1 : -1;
            } else if (ordenar === "decrescente") {
              return pokemon2.name.english > pokemon1.name.english ? 1 : -1;
            }
          })
          // return pokemon.type[0] === type;
          //   if (type === pokemon)  {
          //      return pokemon
          //   } else {
          //     return pokemon.type.includes(type);
          //   }
          // })
          .map((pokemon) => {
            return (
              <PokemonCard
                cardColor={getColors(pokemon.type[0])}
                key={pokemon.id}
                pokemon={pokemon}
              />
            );
          })}
      </CardsContainer>
    </>
  );
}

export default App;
