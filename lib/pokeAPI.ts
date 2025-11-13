import { PokemonTypeKey } from "./pokemonTypes";

export interface PokemonProps {
  id: number;
  name: string;
  types: PokemonTypeKey[];
  image: string;
}

/**
 * 개별 포켓몬 데이터 가져오기
 */
export async function getPokemon(id: number): Promise<PokemonProps> {
  try {
    // id 범위 검증
    if (isNaN(id) || id <= 0 || id > 1010) {
      console.warn(`⚠️ Invalid Pokemon ID requested: ${id}`);
      return {
        id,
        name: "Unknown",
        types: [],
        image: "/no-image.png",
      };
    }

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      next: { revalidate: 3600 },
    });

    // 존재하지 않는 포켓몬 예외 처리
    if (!res.ok) {
      console.warn(`❌ PokeAPI fetch failed: ${res.status} ${res.statusText}`);
      return {
        id,
        name: "Unknown",
        types: [],
        image: "/no-image.png",
      };
    }

    const data = await res.json();

    return {
      id: data.id,
      name: data.name,
      types: data.types.map((t: { type: { name: string } }) => t.type.name),
      image: data.sprites.other["official-artwork"].front_default,
    };
  } catch (err) {
    console.error("🔥 getPokemon Error:", err);
    return {
      id,
      name: "Unknown",
      types: [],
      image: "/no-image.png",
    };
  }
}

/**
 * 타입별 포켓몬 ID 목록 가져오기
 */
export async function getPokemonIdByType(typeName: string): Promise<number[]> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.warn(`⚠️ Type fetch failed: ${typeName} (${res.status})`);
      return [];
    }

    const data = await res.json();

    return data.pokemon
      .map((p: { pokemon: { url: string } }) => {
        const id = parseInt(p.pokemon.url.split("/")[6]);
        return id;
      })
      .filter((id: number) => !isNaN(id) && id > 0 && id <= 1010);
  } catch (err) {
    console.error("🔥 getPokemonIdByType Error:", err);
    return [];
  }
}

/**
 * 여러 타입에 해당하는 포켓몬 ID 가져오기
 * (합집합: 하나라도 해당되는 포켓몬 포함)
 */
export async function getPokemonIdByTypes(types: string[]): Promise<number[]> {
  if (types.length === 0) {
    return [];
  }

  const results = await Promise.all(types.map((type) => getPokemonIdByType(type)));

  // 중복 제거 + 정렬
  return [...new Set(results.flat())].sort((a, b) => a - b);
}
