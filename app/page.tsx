import PokemonCard from "@/components/PokemonCard";
import { PokemonSkeleton } from "@/components/PokemonCardSkeleton";
import PokemonPagination from "@/components/PokemonPagination";
import TypeFilter from "@/components/TypeFilter";
import { getPokemon, getPokemonIdByTypes } from "@/lib/pokeAPI";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function PokemonItem({ id }: { id: number }) {
  const pokemon = await getPokemon(id);
  return <PokemonCard pokemon={pokemon} />;
}

const ITEMS_PER_PAGE = 12;
const TOTAL_POKEMON = 1010;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page);
  const totalPages = Math.ceil(TOTAL_POKEMON / ITEMS_PER_PAGE);

  if (isNaN(currentPage) || currentPage < 1) {
    redirect("/?page=1");
  }

  const selectedTypes = params.type ? params.type.split(",") : [];
  let pokemonIds: number[];

  if (selectedTypes.length === 0) {
    pokemonIds = Array.from({ length: TOTAL_POKEMON }, (_, i) => i + 1);
  } else {
    pokemonIds = await getPokemonIdByTypes(selectedTypes);
  }

  const validPage = Math.min(currentPage, totalPages);
  const startIdx = (validPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const displayIdx = pokemonIds.slice(startIdx, endIdx);

  return (
    <div>
      <TypeFilter />
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 mx-4">
        {displayIdx.map((id) => (
          <Suspense key={id} fallback={<PokemonSkeleton />}>
            <PokemonItem id={id} />
          </Suspense>
        ))}
      </div>
      <div className="flex justify-center py-5">
        <PokemonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          params={params}
        />
      </div>
    </div>
  );
}
