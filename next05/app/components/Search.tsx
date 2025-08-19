'use client'
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function Search() {
    const [search, setSearch] = useState("")
    const router = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        router.push(`/${search}/`)
        setSearch("")
    }
    
    return (
    <form className="flex flex-wrap justify-center w-full" onSubmit={handleSubmit}>
        <input 
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)} 
            className="bg-white p-2 w-80 text-xl rounded-xl"
            placeholder="Search"
        />
        <button className="p-2 text-xl rounded-xl bg-slate-300 ml-2 font-bold">
            🚀
        </button>
    </form>
  )
}
