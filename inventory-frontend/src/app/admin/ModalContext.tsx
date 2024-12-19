'use client'

import { createContext, ReactNode, useState } from "react"
import { MMItemProps } from "./Item"
// import { MMProps, OpenModalProps } from "./ModalMachine"
import { MachineDetails } from "@/models/machines/MachineDetails"


// export const ModalMachineContext = createContext<{
//   modalProps: MMProps,
//   itemProps: MMItemProps
// }>({
//   modalProps: {
//     setOpenModal: () => { },
//     useItemIsReady: false,
//     useItemIsWorkingOn: false,
//   },
//   itemProps: {
//     openModal: () => { },
//     setUseItemIsReady: () => { },
//     setUseItemIsWorkingOn: () => { }
//   }
// })

export const ModalMachineContext = createContext<{
  // openModal: (value: OpenModalProps) => void,
  modalMachineDetails?: MachineDetails
  setItemIsWorkingOn: (value:boolean) => void,
  setItemIsReady: (value: boolean) => void
}>({
  // openModal: () => { },
  setItemIsWorkingOn: () => {},
  setItemIsReady: () => {}
})


export default function ModalMachineProvider({ children }: { children: ReactNode }) {

  // const [openModal, setOpenModal] = useState(() => (value: OpenModalProps) => { })
  const [openModal, setOpenModal] = useState(() => (value: MachineDetails) => { })
  const [useItemIsReady, setUseItemIsReady] = useState(false)
  const [useItemIsWorkingOn, setUseItemIsWorkingOn] = useState(false)

  const modalProps = {
    setOpenModal,
    useItemIsReady,
    useItemIsWorkingOn
  }

  const itemProps = {
    openModal,
    setUseItemIsReady,
    setUseItemIsWorkingOn
  }

  return (
    // <ModalMachineContext.Provider value={{ modalProps, itemProps }}>
    <ModalMachineContext.Provider value={{
      // openModal: () => { },
      setItemIsWorkingOn: () => {},
      setItemIsReady: () => {}
    }}>

      {children}
    </ModalMachineContext.Provider>
  )
}
