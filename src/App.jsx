import { useState } from 'react'
import './App.css'
import Pokemon from './Pokemon';
import axios from "axios";
import spinner_img from "./assets/spinner_img.png"


function App() {
  const [pokemonType, setPokemonType] = useState(null)
  const [allPokemon, setAllPokemon] = useState([])
  const [spinner, setSpinner] = useState(false)

  const getPokemon = async () => {
    try {
      setSpinner(true)
      setAllPokemon([])
      const randomIndex = Math.floor(Math.random() * 150) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomIndex}`)
      const type = response.data.types[Math.floor(Math.random() * response.data.types.length)].type.name
      setPokemonType(type);
      setAllPokemon((prevAllPokemon => ([
        ...prevAllPokemon,
        {
          name: response.data.name,
          img_src: response.data.sprites.front_default,
        }
      ])))
      getFiveMore(type);
      setSpinner(false)
    } catch (err) {
      console.log(err.message)
    }

  }
  const getFiveMore = async (type) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}/`)
      const pokemon_list = response.data.pokemon;
      for (let i = 0; i < 5; i++) {
        const rIdx = Math.floor(Math.random() * pokemon_list.length);
        const new_poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon_list[rIdx].pokemon.name}`)
        setAllPokemon((prevAllPokemon) => ([
          ...prevAllPokemon,
          {
            name: new_poke.data.name,
            img_src: new_poke.data.sprites.front_default
          }
        ]))
      }
    }
    catch (err) {
      console.log(err.message)
    }

  }

  return (
    <div className="container">
      {pokemonType && <h1>Team {pokemonType[0].toUpperCase() + pokemonType.slice(1)}</h1>}
      {spinner && <img src={spinner_img}></img>}
      <div className='pokemon-team'>
        {allPokemon.map((pokemon, idx) => {
          return (<Pokemon key={idx} img_src={pokemon.img_src} name={pokemon.name} />)
        })}
      </div>
      <button onClick={() => getPokemon()}>Get Pokemon</button>

    </div>
  )
}

export default App
