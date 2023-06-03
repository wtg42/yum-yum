import {
  useState,
  createContext,
  useContext,
} from 'react'

type contextDefaultValue = () => void
const SideBarContext = createContext(false)
const SideBarToggleContext = createContext<contextDefaultValue>(() => { return })

export function useSideBar() {
  return useContext(SideBarContext)
}

export function useSideBarToggle() {
  return useContext(SideBarToggleContext)
}

export function SideBarProvider({ children }: { children: React.ReactNode }) {
  const [sideBar, setSideBar] = useState(false)

  function toggleSideBar() {
    setSideBar(prev => !prev)
  }
  return (
    <SideBarContext.Provider value={sideBar}>
      <SideBarToggleContext.Provider value={toggleSideBar}>
      {children}
      </SideBarToggleContext.Provider>
    </SideBarContext.Provider>
  )
}