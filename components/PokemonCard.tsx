"use client";

import { PokemonProps } from "@/lib/pokeAPI";
import { getTypeConfig } from "@/lib/pokemonTypes";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import TypeBadge from "./TypeBadge";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useUserInfo } from "@/contexts/UserInfoProvider";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import FavoriteDialog from "./FavoriteDialog";

interface PokemonCardProps {
  pokemon: PokemonProps;
  priority?: boolean; // 이미지 우선 로딩 여부 (기본값 false)
}

export default function PokemonCard({ pokemon, priority = false }: PokemonCardProps) {
  const { data: session } = useSession();
  const { favorites, setFavorites } = useUserInfo();
  const [showDialog, setShowDialog] = useState(false);

  const isFavorited = favorites.includes(pokemon.id);
  const typeConfig = getTypeConfig(pokemon?.types[0]);

  // ⭐ 즐겨찾기 버튼 클릭 시 처리
  function handleStarClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      alert("로그인이 필요합니다");
      return;
    }

    setShowDialog(true);
  }

  return (
    <>
      <Link href={`/pokemon/${pokemon?.id}`}>
        <Card
          className={cn(
            "relative w-full rounded-md transition-all duration-200 ring-2",
            "hover:opacity-80 hover:scale-105 hover:cursor-pointer",
            typeConfig.ringClass
          )}
        >
          <CardHeader className="flex justify-center">
            {/* 즐겨찾기 버튼 */}
            <button
              onClick={handleStarClick}
              className={cn(
                "absolute top-2 right-2 z-10 p-1 rounded-full hover:bg-white/20"
              )}
            >
              {isFavorited ? (
                <FaStar className="text-yellow-400" size={20} />
              ) : (
                <FaStar className="text-gray-400" size={20} />
              )}
            </button>

            <CardTitle className="text-xl font-bold text-center">
              {pokemon?.name}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex justify-center gap-2 mb-2">
              {pokemon?.types.map((t, i) => (
                <TypeBadge key={i} typeName={t} />
              ))}
            </div>

            {/* 🖼️ 이미지: 첫 화면 포켓몬은 priority로 즉시 로딩 */}
            <div className="flex justify-center">
              <Image
                src={pokemon?.image}
                alt={pokemon?.name}
                width={100}
                height={100}
                priority={priority}
                className="w-full h-full object-contain"
              />
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* 즐겨찾기 다이얼로그 */}
      <FavoriteDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        pokemonId={pokemon.id}
        pokemonName={pokemon.name}
      />
    </>
  );
}
