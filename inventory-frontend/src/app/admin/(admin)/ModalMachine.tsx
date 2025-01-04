'use client'
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react"
import { faCircleDollarToSlot, faFileLines, faPenToSquare, faQrcode, faScrewdriverWrench, faTag, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { deleteMachine, deleteQrBatch, putMachineReady, putMachineWorkingOn, putQrBatch } from "../../../utils/alterData"
import { MachineDetails } from "@/models/machines/MachineDetails"
import { ModalMachineContext } from "./ModalContext"
import { toast } from "react-toastify"
import { Brand } from "./add/page"

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
      className="group hover:bg-default-200 justify-start px-5 m-0 text-sm"
      size="lg"
      startContent={<FontAwesomeIcon icon={icon} className="group-hover:bg-default-300 p-3 size-4 rounded-full bg-default-200" />}
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

  useEffect(() => {
    mm.openModal = openModal

  }, [])

  return (
    // <ModalMachineContext.Provider value={{ openModal, modalMachineId, setUseItemIsWorkingOn, setUseItemIsReady }}>
    <div>
      <Modal isOpen={isOpen} placement="bottom-center" className="rounded-b-none -mb-1 " hideCloseButton onOpenChange={() => {
        setModalMachineId('')
        onOpenChange()
      }}>
        <ModalContent className="fixed">
          {(onClose) => {
            return (
              <ModalBody className="gap-0 mt-8 px-0 *:bg-white *:rounded-none *:font-bold">
                <ModalItemButton
                  icon={faFileLines}
                  onPress={() => { router.replace('/admin/' + modalMachineId) }}
                >View Machine </ModalItemButton>

                <ModalItemButton
                  icon={faPenToSquare}
                  onPress={() => { router.replace('/admin/' + modalMachineId + '/edit') }}
                >Edit Machine </ModalItemButton>

                <ModalItemButton
                  icon={faTrash}
                  onPress={() => {
                    deleteMachine({ id: modalMachineId })
                      .then((res) => {
                        if (!res.ok) throw res.status

                        mm.removeItem(modalMachineId)
                        toast.success('Removed Successfully')
                        onClose()
                      })
                      .catch((err) => {
                        console.log('error, failed to delete the item', err)
                        toast.error("Failed to delete the item")
                      })
                  }}
                >Delete Machine</ModalItemButton>

                <ModalItemButton
                  icon={faQrcode}
                  onPress={() => {

                    if (!modalMachineData?.is_in_qr_batch) {
                      putQrBatch({ id: [modalMachineId] })
                        .then((res) => {
                          if (!res.ok) throw res.status
                          mm.setIsInBatch(true)
                          toast.success('Added to QR Batch')
                          onClose()
                        })
                        .catch((err) => {
                          console.log("error, failed to add the item's to qr batch", err)
                          toast.error("Failed to add the item to QR batch")
                        })
                    } else {

                      deleteQrBatch({ id: [modalMachineId] })
                        .then((res) => {
                          if (!res.ok) throw res.status
                          mm.setIsInBatch(false)
                          toast.success('Removed from QR Batch')
                          onClose()
                        })
                        .catch((err) => {
                          console.log("error, failed to remove the item from the qr batch", err)
                          toast.error("Failed to remove the item from the QR batch")
                        })
                    }

                  }}
                >{!modalMachineData?.is_in_qr_batch ? 'Add to Batch' : 'Remove from Batch'}</ModalItemButton>

                <ModalItemButton
                  icon={faScrewdriverWrench}
                  onPress={() => {
                    putMachineWorkingOn({ id: modalMachineId, value: !modalMachineData?.is_working_on })
                      .then((res) => {
                        if (!res.ok) throw res.status

                        mm.setItemIsWorkingOn(!modalMachineData?.is_working_on)
                        toast.success('Changed successfully')
                        onClose()
                      })
                      .catch((err) => {
                        console.log("error, failed to edit the item's working on status", err)
                        toast.error(`Failed to change the item's Working on status`)
                      })
                  }}
                >
                  {!modalMachineData?.is_working_on ? 'Mark as Working On' : 'Mark as Done Working On'}
                </ModalItemButton>

                <ModalItemButton
                  icon={faTag}
                  onPress={() => {
                    putMachineReady({ id: modalMachineId, value: !modalMachineData?.is_ready })
                      .then((res) => {
                        if (!res.ok) throw res.status

                        mm.setItemIsReady(!modalMachineData?.is_ready)
                        toast.success('changed successfully')
                        onClose()
                      }).catch((err) => {
                        console.log("error, failed to edit the item's ready status", err)
                        toast.error(`Failed to change the item's Ready status`)
                      })
                  }}
                >
                  {!modalMachineData?.is_ready ? 'Mark as Ready' : 'Mark as Not Ready'}
                </ModalItemButton>
{/* 
                <ModalItemButton
                  icon={faCircleDollarToSlot}
                  onPress={() => { }}
                >Mark as Sold</ModalItemButton> */}

              </ModalBody>)
          }}
        </ModalContent>

      </Modal>

    </div>
    // </ModalMachineContext.Provider >

  )
}

