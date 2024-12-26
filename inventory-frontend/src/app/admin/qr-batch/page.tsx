import { getBrands } from "@/utils/getData";
import ItemList from "./ItemList";

export default async function Page() {

    const brands = await getBrands()

    return (
        <ItemList brands={brands}/>
    )
}