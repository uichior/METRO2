"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    router.push("/orders")
  }, [router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">METRO2 - 業務管理システム</h1>
        <p className="text-lg mb-8">リダイレクト中...</p>
      </div>
    </main>
  )
}
