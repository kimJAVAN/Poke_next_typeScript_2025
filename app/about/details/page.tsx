
"use client"

import { useCounterStore } from "@/store/counterStore"
import Link from "next/link";

export default function AboutPage() {
  const {count} = useCounterStore()
  return (
    <div className="container mx-10 p-4">
      <h1 className="text-4xl font-bold mb-4">About</h1>
      <p className="text-gray-600 mb-6">
        {count}
      </p>
      <Link href ='/about/'>
        상위로이동
      </Link>
      <p>test</p>
    </div>
  )
}