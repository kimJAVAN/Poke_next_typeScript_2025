"use client"// TODO use client 추가

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FaMoon, FaSun } from "react-icons/fa6";
import LoginButton from "./loginButton";


export function Navigation(){
  // TODO useTheme 적용
  const {theme, setTheme} = useTheme();
  const [mouted, setMouted] = useState(false);

  // TODO useState + useEffect로 mounted 적용 - 클라이언트에서 theme이 준비될 때까지 버튼을 숨김
  useEffect(()=> {
    setMouted(true)
  }, [])
  return (
    <nav className="border-b mx-3">
      <div className="container flex h-14 max-w-screen-2xl justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <h2>포켓몬 도감</h2>
          </Link>
          <Link href="/about">
            <h2>About</h2>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {mouted && (
            <>
              <LoginButton />
              <Button
                variant="ghost"
                size="sm"
                onClick={()=>setTheme(theme==='dark' ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <FaSun className="text-yellow-500"/>
                ) : (
                  <FaMoon className="text-yellow-500"/>
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}