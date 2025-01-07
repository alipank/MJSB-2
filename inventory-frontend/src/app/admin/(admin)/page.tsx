import { getBrands } from "@/utils/getData";
import ItemList from "@/components/admin/ItemList";
import ModalMachine from "@/components/admin/ModalMachine";
import { Brand } from "./(padding)/add/page";
import ModalMachineProvider from "@/components/admin/ModalContext";
"./ModalMachine";

export default async function Page() {
  const brands: Brand[] = await getBrands()

  return (
    <ModalMachineProvider>
      <ModalMachine/>
      <ItemList brands={brands} />
    </ModalMachineProvider>
  )
} 