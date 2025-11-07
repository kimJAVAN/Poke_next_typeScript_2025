"use client"

import { PokemonProps } from "@/lib/pokeAPI";
import { getTypeConfig } from "@/lib/pokemonTypes";
import Link from "next/link";
// import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import TypeBadge from "./TypeBadge";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useUserInfo } from "@/contexts/UserInfoProvider";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import FavoriteDialog from "./FavoriteDialog";

export default function PokemonCard({pokemon}:{pokemon:PokemonProps}) {
  // TODO session, favorites, showDialog, isFavorited 추가
  const {data:session} = useSession()
  const {favorites, setFavorites} = useUserInfo()
  const [showDialog, setShowDialog] = useState(false)
  const isFavorited = favorites.includes(pokemon.id)
  const typeConfig = getTypeConfig(pokemon?.types[0])
   // TODO handleStarClick 만들기
  function handleStarClick(e:React.MouseEvent){
    e.preventDefault()
    e.stopPropagation()
    if(!session){
      alert('로그인이 필요합니다')
      return
    }
    setShowDialog(true);
  }

  return (
    <>
      <Link href={`/pokemon/${pokemon?.id}`}>
        <Card 
          className={cn(
            "relative",
            "w-full", // TODO relative 추가
            "rounded-md",
            "hover:opacity-80",
            "hover:scale-105",
            "transition-all",
            "duration-200",
            "hover:cursor-pointer",
            "ring-2",
            typeConfig.ringClass
          )}
        >
            <CardHeader className="flex justify-center">
              <button
                onClick={handleStarClick}
                className={cn(
                  "absolute",
                  "top-2",
                  "right-2",
                  "z-10",
                  "p-1",
                  "rounded-full",
                  "hover:hg-white/20"
                )}
              >
              {isFavorited ? (
                <FaStar className="text-yellow-400" size={20}/>
              ) : (
                <FaStar className="text-gray-400" size={20}/>
              )} 
              </button>
              <CardTitle className="text-xl font-bold">
                {pokemon?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-2">
                {pokemon?.types.map((t,i)=> <TypeBadge key={i} typeName={t}/>)}
              </div>
              <Image src={pokemon?.image} alt={pokemon?.name} width={100} height={100} className="w-full h-full"/>
            </CardContent>
        </Card>
      </Link>
      <FavoriteDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        pokemonId={pokemon.id}
        pokemonName={pokemon.name}
      />
    </>
    //TODO FavoriteDialog 추가 + Fragment로 감싸기
  )
}
