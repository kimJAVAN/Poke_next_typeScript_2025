// FavoriteDialog.tsx
import { useUserInfo } from "@/contexts/UserInfoProvider";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { useContext } from "react";

interface FavoriteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void; // setShowDialog -> 창 닫기 위해 가져옴
  pokemonId: number; 
  pokemonName: string;
}

export default function FavoriteDialog({
  open, onOpenChange, pokemonId, pokemonName
}: FavoriteProps) {
  const { favorites, setFavorites } = useUserInfo();  // Context 가져옴
  
  const isFavorited = favorites.includes(pokemonId);

  async function handleConfirm() {
    // TODO HandleConfirm 내부 구현하기
    if (isFavorited) {
      // ✅ 삭제
      await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pokemon_id: pokemonId })
      });
      setFavorites(favorites.filter(id => id !== pokemonId));
    } else {
      // ✅ 추가
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pokemon_id: pokemonId })
      });
      setFavorites([...favorites, pokemonId]);
    }

    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-xs!">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isFavorited ? `${pokemonName} 찜하기 취소` : `${pokemonName} 찜하기`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isFavorited ? '찜 목록에서 제거하시겠습니까?' : '찜 목록에 추가하시겠습니까?'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}