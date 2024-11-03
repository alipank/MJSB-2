import { MachineDetails } from "@/models/MachineDetails";
import { Brand } from "../add/page";
import Preview from "./preview";

export default function Page() {
    const machineDetails:MachineDetails = { "id": 33, "brand_id": 1, "model": "123", "bought_price": 123, "note": "123", "is_ready": 1 && true, "added_at": new Date("2024-11-01T17:00:00.000Z"), "updated_at": new Date("2024-11-01T17:00:00.000Z"), "images": [{ "image_id": 27, "image_path": "2024-11-02-52468.png" }] }

    const brands: Brand[] = [
        {
            id: 1,
            brand_name: "tes"
        }
    ]

    return (<div>

        <Preview machineDetails={machineDetails} brands={brands}>

        </Preview>
    </div>)
}