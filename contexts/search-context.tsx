"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  setSearchQuery: () => {},
})

interface SearchProviderProps {
  children: ReactNode
  initialQuery?: string
}

export function SearchProvider({ children, initialQuery = "" }: SearchProviderProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext)
