"use client"

import { getPokemon, PokemonProps } from "@/lib/pokeAPI"
import { useEffect, useState } from "react"
import { PokemonSkeleton } from "./PokemonCardSkeleton"
import PokemonCard from "./PokemonCard"

export default function PokemonItem({id}:{id:number}) {
  const [pokemon, setPokemon] = useState<PokemonProps | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchPokemon = async () => {
      try {
        const data = await getPokemon(id)
        setPokemon(data)
      } catch (error) {
        console.error(`Failed to fetch pokemon ${id}: ${error}`)
      } finally {
        setLoading(false)
      }
    }
    fetchPokemon()
  }, [])

  if (loading || !pokemon) {
    return <PokemonSkeleton/>
  } 
  return <PokemonCard pokemon={pokemon} priority={true}/>
}