"use client"

import { getAllTypeNames, PokemonTypeKey } from "@/lib/pokemonTypes"
import { useRouter, useSearchParams } from "next/navigation"
import TypeBadge from "./TypeBadge"
import { usePokeTypeStore } from "@/store/pokeTypeStore"
import { useEffect } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export default function TypeFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // const typeParam = searchParams.get("type")
  // const selectedTypes = typeParam ? typeParam.split(",") : []

  const {selectedTypes, toggleType, resetTypes} = usePokeTypeStore()

  function handleClick(type: string) {
    const params = new URLSearchParams(searchParams.toString())
    toggleType(type)

    // let newSelectedTypes: string[]
    // if (selectedTypes.includes(type)) {
    //   newSelectedTypes = selectedTypes.filter((t) => t !== type)
    // } else {
    //   newSelectedTypes = [...selectedTypes, type]
    // }

    // if (newSelectedTypes.length === 0) {
    //   params.delete("type")
    // } else {
    //   params.set("type", newSelectedTypes.join(","))
    // }

    params.set("page", "1")
    router.push(`/?${params.toString()}`)
  }

  function handleReset(){
    resetTypes()
  }

  useEffect(()=>console.log(selectedTypes),[selectedTypes

  ])

  return (
    <div className="m-4 p-4 border-2 rounded-2xl">
      <div className="flex items-start gap-3">
        <h3 className="font-semibold whitespace-nowrap border-2 rounded-2xl py-4 px-2 bg-gray-100 dark:bg-gray-800">
          타입
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {getAllTypeNames().map((type) => (
            <TypeBadge
              key={type}
              typeName={type as PokemonTypeKey}
              onClick={() => handleClick(type as PokemonTypeKey)}
              isSelected={selectedTypes.includes(type as PokemonTypeKey)}
            />
          ))}
        </div>
        <Button
          onClick={handleReset}
          disabled = {selectedTypes.length===0}
          className = {cn(
            selectedTypes.length === 0 && 'invisible'
          )}
        >
          초기화
        </Button>
      </div>
    </div>
  )
}
