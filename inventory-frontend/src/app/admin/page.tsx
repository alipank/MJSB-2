
import { MachineDetails } from "@/models/MachineDetails"
import { getMachinesData } from "../utils/getData"
import { Brand } from "./add/page"
import Item from "./Item"
import { Button, Input, Modal, ModalContent, useDisclosure } from "@nextui-org/react"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import ItemList from "./ItemList"
// import { useState } from "react"

export default async function Page() {

  // const { onOpen, onOpenChange, isOpen } = useDisclosure()
  // const [modalMachineId, setModalMachineId] = useState(null)

  return (
    <>
    <ItemList/>
    {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => {
          return <>
            <Link href='#'><Button>View</Button></Link>
            <Link href="#"><Button>Edit</Button></Link>
          </>
        }}
      </ModalContent>
    
  </Modal> */}
    </>
  )
} 