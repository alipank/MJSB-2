'use client'
import { Button, Input, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react"
import { faCircleDollarToSlot, faDisplay, faFileLines, faPen, faPenAlt, faPenToSquare, faScrewdriverWrench, faSearch, faTag, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import ItemList from "./ItemList"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { deleteMachine, putMachineReady, putMachineWorkingOn } from "../utils/alterData"
import { MachineDetails } from "@/models/MachineDetails"
import { getMachineData } from "../utils/getData"


// interface MMContext {
//   isOpen: boolean,
//   onOpen: () => void,
//   onOpenChange: () => void,
//   modalMachineId: string,
//   setModalMachineId: Dispatch<SetStateAction<string>>
// }
// const ModalMachineContext = createContext<{isOpen: boolean, onOpen:()=> void, onOpenChange: () => void}>({isOpen: false, onOpen : () => {}, onOpenChange : () => {}})
interface OpenModalProps {
  id: string,
  machineData: MachineDetails
}

export const ModalMachineContext = createContext<{
  openModal: (props: OpenModalProps) => void,
  modalMachineId: string,
  modalMachineData?: MachineDetails,
  setUseItemIsWorkingOn: Dispatch<SetStateAction<(value: boolean) => void>>
  setUseItemIsReady: Dispatch<SetStateAction<(value: boolean) => void>>

}>({
  openModal: () => { },
  modalMachineId: '',
  setUseItemIsWorkingOn: () => { },
  setUseItemIsReady: () => { }
})

export function ModalItemButton({ icon, onPress, children }: { icon: IconProp, onPress: () => void, children: React.ReactNode }) {

  return (
    <Button
      className="group hover:bg-default-200 justify-start px-5 py-8"
      size="lg"
      startContent={<FontAwesomeIcon icon={icon} className="group-hover:bg-default-300 p-3 w-5 h-5 rounded-full bg-default-200" />}
      onPress={onPress}>
      {children}
    </Button>
  )
}

export default function ModalMachine({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [modalMachineId, setModalMachineId] = useState('')
  const [modalMachineData, setModalMachineData] = useState<MachineDetails>()
  const [useItemIsWorkingOn, setUseItemIsWorkingOn] = useState<(value: boolean) => void>(() => { })
  const [useItemsIsReady, setUseItemIsReady] = useState<(value:boolean) => void>(() => {})

  const router = useRouter()

  async function openModal({ id, machineData }: OpenModalProps) {

    console.log('open', id)

    // const data = await getMachineData(id)

    setModalMachineId(id)
    // setModalMachineData(await data)
    setModalMachineData(machineData)

    // setModalMachineData
    if (machineData) {
      onOpen()
    }
  }

  return (
    <ModalMachineContext.Provider value={{ openModal, modalMachineId, setUseItemIsWorkingOn, setUseItemIsReady }}>
      {children}

      <Modal isOpen={isOpen} placement="bottom-center" className="rounded-b-none -mb-1 " hideCloseButton onOpenChange={() => {
        setModalMachineId('')
        onOpenChange()
      }}>
        <ModalContent >
          {(onClose) => {
            return (
              <ModalBody className="flex flex-col gap-0 mt-8 px-0 *:bg-white *:rounded-none *:font-bold ">
                <ModalItemButton
                  icon={faFileLines}
                  onPress={() => { router.push('/admin/' + modalMachineId) }}
                >View Machine </ModalItemButton>

                <ModalItemButton
                  icon={faPenToSquare}
                  onPress={() => { router.push('/admin/' + modalMachineId + '/edit') }}
                >Edit Machine </ModalItemButton>

                <ModalItemButton
                  icon={faTrash}
                  onPress={() => { deleteMachine({ id: modalMachineId }) }}
                >Delete Machine</ModalItemButton>

                <ModalItemButton
                  icon={faScrewdriverWrench}
                  onPress={() => {
                    putMachineWorkingOn({ id: modalMachineId, value: !modalMachineData?.is_working_on })
                      .then(() => {
                        useItemIsWorkingOn(!modalMachineData?.is_working_on)
                        onClose()
                      })
                  }}
                >
                  {!modalMachineData?.is_working_on ? 'Mark as Working On' : 'Mark as Done Working On'}
                </ModalItemButton>

                <ModalItemButton
                  icon={faTag}
                  onPress={() => {
                    putMachineReady({id: modalMachineId, value: !modalMachineData?.is_ready})
                    .then(() => {
                      useItemsIsReady(!modalMachineData?.is_ready)
                      onClose()
                    })
                  }}
                >Mark as Ready</ModalItemButton>

                <ModalItemButton
                  icon={faCircleDollarToSlot}
                  onPress={() => { }}
                >Mark as Sold</ModalItemButton>

              </ModalBody>)
          }}
        </ModalContent>

      </Modal>

    </ModalMachineContext.Provider >

  )
}

