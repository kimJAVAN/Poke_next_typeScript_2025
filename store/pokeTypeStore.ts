import { PokemonTypeKey } from "@/lib/pokemonTypes";
import { create } from "zustand";

interface PokeTypeState {
  selectedTypes: PokemonTypeKey[]
  toggleType: (type: PokemonTypeKey) => void
  resetTypes: () => void
}

export const usePokeTypeStore = create<PokeTypeState>((set) => ({
  selectedTypes: [],
  
  toggleType: (type: PokemonTypeKey) => {
    set((state) => {
    //   const newSelectedTypes = state.selectedTypes.includes(type)
    //     ? state.selectedTypes.filter(t => t !== type)
    //     : [...state.selectedTypes, type]
    //   return { selectedTypes: newSelectedTypes}

        if(state.selectedTypes.includes(type)){
            return {selectedTypes:state.selectedTypes.filter(t=>t!==type)}
        }else{
            return {selectedTypes : [...state.selectedTypes, type]}
        }

    })
  },
  
  resetTypes: () => set({ selectedTypes: []}),

}))