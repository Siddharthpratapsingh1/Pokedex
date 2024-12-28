import { useParams, Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import './PokemonDetails.css';

function PokemonDetails() {

    
        const { id } = useParams();
        // const POKEMON_DETAIL_URL = 'https://pokeapi.co/api/v2/pokemon/';

        const [pokemon, setPokemon] = useState(null);

        async function downloadPokemon() {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemon = response.data;
            setPokemon({
                name: pokemon.name,
                height: pokemon.height,
                weight: pokemon.weight,
                types: pokemon.types,
                image: pokemon.sprites.other.dream_world.front_default
            })
        }
    

  useEffect(() => {  
    downloadPokemon();
  });
  
  return (
    <>
    <h1><Link to="/">Pokedex</Link></h1>
    {pokemon && <div className='pokemon-details-wrapper'>
        <div>
           <h1> {pokemon.name}</h1>
        </div>
        <div>
            <img src={pokemon.image} alt='pic'/>
        </div>
        <div>
            <h1>height: {pokemon.height} &nbsp;
            weight: {pokemon.weight}</h1>
        </div>
        <div>
            <h1>Type:{pokemon.types.map(t => <span key={t.type.name}>{t.type.name}</span>)}</h1>
        </div>
    </div>}
    </>
  )
}

export default PokemonDetails;