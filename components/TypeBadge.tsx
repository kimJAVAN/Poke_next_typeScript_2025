import { getTypeConfig, PokemonTypeKey } from "@/lib/pokemonTypes";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface TypeBadgeProps {
  typeName : PokemonTypeKey;
  onClick? : ()=> void;
  isSelected? : boolean
}

export default function TypeBadge({typeName, onClick, isSelected }:TypeBadgeProps) {
  const typeConfig = getTypeConfig(typeName);
  const IconEl = typeConfig.icon
  const isFilterMode = !!onClick 

  const BadgeContent = (
    <Badge
      className={cn(
        typeConfig.bgClass,
        typeConfig.textClass,
        "ring-2",
        typeConfig.ringClass,
        "font-semibold",
        "flex items-center gap-1.5",
        "transition-all",
        isFilterMode && !isSelected && "bg-gray-100! text-gray-600! ring-gray-300! opacity-70",
        isFilterMode && 'cursor-pointer hover:scale-105',
        isFilterMode && "hover:opacity-85"
      )}
    >
        <IconEl />
        <span>{typeConfig.displayName}</span>
    </Badge>
  )

  if(isFilterMode){
    return <button onClick={onClick}>{BadgeContent}</button>
  }

  return BadgeContent
}