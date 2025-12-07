"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { AccountMode } from "./types"

interface StoreContextType {
  mode: AccountMode
  setMode: (mode: AccountMode) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

/**
 * Provider component that wraps the application and provides global state
 * for account mode (business/personal) and sidebar visibility.
 * 
 * @param children - The child components to wrap.
 */
export function StoreProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AccountMode>("business")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <StoreContext.Provider value={{ mode, setMode, sidebarOpen, setSidebarOpen }}>{children}</StoreContext.Provider>
  )
}

/**
 * Custom hook to access the global store context.
 * 
 * @returns The store context value containing mode and sidebar state.
 * @throws Error if used outside of a StoreProvider.
 */
export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
