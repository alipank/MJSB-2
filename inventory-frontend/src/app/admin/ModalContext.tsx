'use client'

import { createContext, ReactNode, useState } from "react"
import { MachineDetails } from "@/models/machines/MachineDetails"

interface MMContext {
  openModal: (value: MachineDetails) => void,
  setItemIsWorkingOn: (value: boolean) => void,
  setItemIsReady: (value: boolean) => void
}

export const ModalMachineContext = createContext<MMContext>({
    openModal: () => { },
    setItemIsWorkingOn: () => { },
    setItemIsReady: () => { }
  })


export default function ModalMachineProvider({ children }: { children: ReactNode }) {


  return (
    <ModalMachineContext.Provider value={{
      openModal: () => { },
      setItemIsWorkingOn: () => { },
      setItemIsReady: () => { }
    }}>

      {children}
    </ModalMachineContext.Provider>
  )
}
