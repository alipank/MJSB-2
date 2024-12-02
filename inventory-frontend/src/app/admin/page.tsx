import { getBrands } from "@/utils/getData";
import ItemList from "./ItemList";
import ModalMachine from "./ModalMachine";
import { Brand } from "./add/page";
 "./ModalMachine";

export default async function Page() {

    // const { isOpen, onOpen, onOpenChange } = useDisclosure()
  
    // const { onOpen, onOpenChange, isOpen } = useDisclosure()
    // const [modalMachineId, setModalMachineId] = useState('')
    const brands:Brand[] = await getBrands() 
  
    return (
      // <ModalMachineContext.Provider value={{ isOpen, onOpen, onOpenChange, modalMachineId, setModalMachineId }}>
      <ModalMachine>
        <ItemList brands={brands} />
      </ModalMachine>
    )
  } 