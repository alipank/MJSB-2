import { getBrands } from "@/utils/getData";
import ItemList from "./ItemList";
import ModalMachine from "./ModalMachine";
import { Brand } from "./add/page";
import ModalMachineProvider from "./ModalContext";
"./ModalMachine";

export default async function Page() {

  console.log('extra certs', process.env.NODE_EXTRA_CA_CERTS)

  const brands: Brand[] = await getBrands()

  return (
    <ModalMachineProvider>
      <ModalMachine />
      <ItemList brands={brands} />
    </ModalMachineProvider>
  )
} 