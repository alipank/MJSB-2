'use client'

import { createContext, ReactNode, useState } from "react"
import { MachineDetails } from "@/models/machines/MachineDetails"

interface MMContext {
  openModal: (value: MachineDetails) => void,
  setItemIsWorkingOn: (value: boolean) => void,
  setItemIsReady: (value: boolean) => void,
  removeItem: (id:string) => void,
  setIsInBatch: (value: boolean) => void
}

export const ModalMachineContext = createContext<MMContext>({
  openModal: () => { },
  setItemIsWorkingOn: () => { },
  setItemIsReady: () => { },
  setIsInBatch: () => {},
    removeItem: () => { }
})


export default function ModalMachineProvider({ children }: { children: ReactNode }) {


  return (
    <ModalMachineContext.Provider value={{
      openModal: () => { },
      setItemIsWorkingOn: () => { },
      setItemIsReady: () => { },
      setIsInBatch: () => {},
      removeItem: () => { }

    }}>

      {children}
    </ModalMachineContext.Provider>
  )
}
