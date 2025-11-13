"use client"

import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/store/counterStore";
import Link from "next/link";

export default function AboutPage() {
  
  const {count, inc, dec, reset} = useCounterStore()

  return (
    <div className="container mx-10 p-4">
      <h1 className="text-4xl font-bold mb-4">About</h1>
      <p className="text-gray-600 mb-6">
        React + Shadcn UI + PokeAPI
      </p>
      <div className="flex flex-col items-center w-3xs mb-10">
        <div className="text-3xl">
          {count}
        </div> 
        <div className="flex gap-2">

        <Button onClick={inc}>+</Button> 
         <Button onClick={dec}>-</Button> 
          <Button onClick={reset}>0</Button> 
          </div>
      </div>
      <Link href="/about/details">
        Details 페이지로 이동
      </Link>
    </div>
  )
}