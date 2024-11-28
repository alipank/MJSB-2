import ItemList from "./ItemList";
import ModalMachine from "./ModalMachine";
 "./ModalMachine";

export default function Page() {

    // const { isOpen, onOpen, onOpenChange } = useDisclosure()
  
    // const { onOpen, onOpenChange, isOpen } = useDisclosure()
    // const [modalMachineId, setModalMachineId] = useState('')
  
    return (
      // <ModalMachineContext.Provider value={{ isOpen, onOpen, onOpenChange, modalMachineId, setModalMachineId }}>
      <ModalMachine>
        <ItemList/>
      </ModalMachine>
    )
  } 