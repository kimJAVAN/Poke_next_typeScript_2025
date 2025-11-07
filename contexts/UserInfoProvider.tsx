"use client"

import { useSession } from "next-auth/react";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface UserInfoContextType {
  favorites: number[];    
  setFavorites: Dispatch<SetStateAction<number[]>>;
}
// TODO UserInfoContext 만들기
const UserInfoContext = createContext<UserInfoContextType>({
  favorites : [],
  setFavorites : ()=>{}
})


export function UserInfoProvider({children}:{children:ReactNode}) {
  // TODO session 확인하기, favorites 추가
  const {data:session} = useSession()
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(()=> {
    const getUserFavorites = async () => {
      // TODO session 정보 있으면 DB에서 favorites 불러오기 
      if(session){
        const data = await fetch('/api/favorites').then(res=>res.json())
        const data2 = data.map((d:any)=>(d.pokemon_id))
        setFavorites(data2)
      }else{
        setFavorites([])
      }
    }
    getUserFavorites()
  }, [session])
  return (
    <UserInfoContext.Provider value={{favorites, setFavorites}}>
      {children}
    </UserInfoContext.Provider>
  )
}

export const useUserInfo = () => useContext(UserInfoContext);