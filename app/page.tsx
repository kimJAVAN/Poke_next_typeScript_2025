
import PokemonCard from "@/components/PokemonCard";
import { PokemonSkeleton } from "@/components/PokemonCardSkeleton";
import PokemonPagination from "@/components/PokemonPagination";
import { getPokemon } from "@/lib/pokeAPI";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function PokemonItem({id}:{id:number}) {
  const pokemon = await getPokemon(id);
  return <PokemonCard pokemon={pokemon} />
}

const ITEMS_PER_PAGE = 12
const TOTAL_POKEMON = 1010

export default async function Home({searchParams} : {searchParams:Promise<{page? : string}>}) {
  const params = await searchParams
  const currentPage = Number(params.page)
  // console.log(currentPage,' page')
  const totalPages = Math.ceil(TOTAL_POKEMON / ITEMS_PER_PAGE)

  if(isNaN(currentPage) || currentPage < 1){
    redirect("/?page=1")
  }

  if(currentPage > totalPages){
    redirect(`/?page=${totalPages}`)
  }

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE

  const NumOfPokemon = Math.min(ITEMS_PER_PAGE, TOTAL_POKEMON - startIdx)

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 mx-4">
        {Array.from({length:NumOfPokemon}).map((_, i) => {
          return (
            <Suspense key={i+1+startIdx} fallback={<PokemonSkeleton />}>
              <PokemonItem  id={i+1+startIdx}/>
            </Suspense>
          )
        })}
      </div>
      <div className="flex justify-center py-5">
        <PokemonPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>

  );
}
