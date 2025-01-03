import './PokemonList.css';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {
    const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon"

    // const [pokemonList, setPokemonList] = useState([]);
    // const [pokedexUrl, setPokedexUrl] = useState(DEFAULT_URL);
    // const [nextUrl, setNextUrl] = useState(DEFAULT_URL);
    // const [prevUrl, setPrevUrl] = useState(DEFAULT_URL);

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        pokedexUrl: DEFAULT_URL,
        nextUrl: DEFAULT_URL,
        prevUrl: DEFAULT_URL,
    });

    const [pokemonData, setpokemonData] = useState([])
    const [search, setSearch] = useState("")
    
 

    const downloadPokemons= async ()=>{
        const response = await axios.get(pokemonListState.pokedexUrl ? pokemonListState.pokedexUrl : DEFAULT_URL);
        const pokemonResults = response.data.results;
    

        // setNextUrl(response.data.next);
        // setPrevUrl(response.data.previous);
        // setPokemonListState((state)=>({...state, nextUrl: response.data.next, prevUrl: response.data.previous}))

        const pokemonPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url));
        const pokemonListData = await axios.all(pokemonPromise);
        const pokemonFinalList = pokemonListData.map(pokemonData => {
        const pokemon = pokemonData.data;
        return{
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other.dream_world.front_default,
            types: pokemon.types
        }
    });
    setpokemonData(pokemonFinalList)
       setPokemonListState({...pokemonListState, pokemonList: pokemonFinalList, nextUrl: response.data.next, prevUrl: response.data.previous});
        
    }

    useEffect(()=>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl]);

    //Search
    const searchData = pokemonData.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
      );


    
  return (
    <>
    <div>
       <input 
            id='search-pokemon'
            type="text" 
            placeholder="Poke You're looking for in this pg "
            value={search}
            onChange={(e)=>setSearch(e.target.value)}/>
    </div>
    
    <div className='pokemon-list-wrapper'>
        <div>
            <h1>Pokemon list</h1>
        </div>
        <div className="page-control">
            <button onClick={()=>setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.prevUrl})}>Prev</button>
            <button onClick={()=>setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.nextUrl})}>Next</button>
        </div>
        <div className='pokemon-list'>
        {searchData.map(pokemon => <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image} id={pokemon.id}/>)}
        {/* {pokemonListState.pokemonList.map(pokemon => <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image} id={pokemon.id}/>)} */}
        </div>
    </div>
    </>
  )
}

export default PokemonList