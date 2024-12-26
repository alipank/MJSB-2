'use client'
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react"
import { faCircleDollarToSlot, faFileLines, faPenToSquare, faQrcode, faScrewdriverWrench, faTag, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { deleteMachine, putMachineReady, putMachineWorkingOn, putQrBatch } from "../../utils/alterData"
import { MachineDetails } from "@/models/machines/MachineDetails"
import { ModalMachineContext } from "./ModalContext"

export interface OpenModalProps {
  id: string,
  machineData?: MachineDetails
}

export interface MMProps {
  setOpenModal: Dispatch<SetStateAction<(value: OpenModalProps) => void>>,
  useItemIsWorkingOn: boolean
  useItemIsReady: boolean
}

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


export default function ModalMachine() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [modalMachineId, setModalMachineId] = useState('')
  const [modalMachineData, setModalMachineData] = useState<MachineDetails>()
  // const [useItemIsWorkingOn, setUseItemIsWorkingOn] = useState<(value: boolean) => void>(() => { })
  // const [useItemsIsReady, setUseItemIsReady] = useState<(value:boolean) => void>(() => {})

  const router = useRouter()

  const mm = useContext(ModalMachineContext)


  async function openModal(machineData: MachineDetails) {

    console.log('open', machineData?.id || 'ID NOT FOUND')

    // const data = await getMachineData(id)

    setModalMachineId(machineData?.id.toString() || '')
    setModalMachineData(machineData)

    // setModalMachineData
    if (machineData) {
      onOpen()
    }
  }

  mm.openModal = openModal

  return (
    // <ModalMachineContext.Provider value={{ openModal, modalMachineId, setUseItemIsWorkingOn, setUseItemIsReady }}>
    <div>
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
                  onPress={() => {
                    deleteMachine({ id: modalMachineId })
                      .then((res) => {
                        mm.removeItem(modalMachineId)
                        onClose()
                      })
                  }}
                >Delete Machine</ModalItemButton>

                <ModalItemButton
                  icon={faQrcode}
                  onPress={() => {
                    putQrBatch({ id: [modalMachineId] })
                      .then(() => {
                        mm.setIsInBatch(!modalMachineData?.is_in_qr_batch)
                        onClose()
                      })
                  }}
                >{!modalMachineData?.is_in_qr_batch ? 'Add to Batch' : 'Remove from Batch'}</ModalItemButton>

                <ModalItemButton
                  icon={faScrewdriverWrench}
                  onPress={() => {
                    putMachineWorkingOn({ id: modalMachineId, value: !modalMachineData?.is_working_on })
                      .then(() => {
                        mm.setItemIsWorkingOn(!modalMachineData?.is_working_on)
                        onClose()
                      })
                  }}
                >
                  {!modalMachineData?.is_working_on ? 'Mark as Working On' : 'Mark as Done Working On'}
                </ModalItemButton>

                <ModalItemButton
                  icon={faTag}
                  onPress={() => {
                    putMachineReady({ id: modalMachineId, value: !modalMachineData?.is_ready })
                      .then(() => {
                        // useItemIsReady(!modalMachineData?.is_ready)
                        mm.setItemIsReady(!modalMachineData?.is_ready)
                        onClose()
                      })
                  }}
                >
                  {!modalMachineData?.is_ready ? 'Mark as Ready' : 'Mark as Not Ready'}
                </ModalItemButton>

                <ModalItemButton
                  icon={faCircleDollarToSlot}
                  onPress={() => { }}
                >Mark as Sold</ModalItemButton>

              </ModalBody>)
          }}
        </ModalContent>

      </Modal>

    </div>
    // </ModalMachineContext.Provider >

  )
}

