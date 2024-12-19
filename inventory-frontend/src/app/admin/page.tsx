import { getBrands } from "@/utils/getData";
import ItemList from "./ItemList";
import ModalMachine from "./ModalMachine";
import { Brand } from "./add/page";
import { MMItemProps } from "./Item";
import { useState } from "react";
 "./ModalMachine";

export default async function Page(props:MMItemProps) {

    // const { isOpen, onOpen, onOpenChange } = useDisclosure()
  
    // const { onOpen, onOpenChange, isOpen } = useDisclosure()
    // const [modalMachineId, setModalMachineId] = useState('')
    const brands:Brand[] = await getBrands() 
  
    return (
      // <ModalMachineContext.Provider value={{ isOpen, onOpen, onOpenChange, modalMachineId, setModalMachineId }}>
        <ItemList brands={brands} MMItemProps={props} />
    )
  } 