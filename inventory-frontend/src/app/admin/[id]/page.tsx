import { MachineDetails } from "@/models/MachineDetails";
import { Brand } from "../add/page";
import Preview from "./preview";
import { getMachineData } from "@/app/utils/getData";

export default async function Page({params}: any) {
    // const machineDetails:MachineDetails = { "id": 33, "brand_id": 1, "model": "123", "bought_price": 123, "note": "123", "is_ready": 1 && true, "added_at": new Date("2024-11-01T17:00:00.000Z"), "updated_at": new Date("2024-11-01T17:00:00.000Z"), "images": [{ "image_id": 27, "image_path": "2024-11-02-52468.png" }] }


  // const res = await fetch('http://localhost:3002/admin/machines/brands')
  // const brands: Brand[] = await res.json()
  console.log(params)
  try {
    const machineDetails: MachineDetails = await getMachineData(params.id)
    console.log(machineDetails)
    const brands: Brand[] = [
      {
        id: 1,
        brand_name: "tes"
      }
    ]

    if(machineDetails.images[0].image_id === null) {
      throw {message: "This error shouldnt be happened (just jaga jaga :P), this error is caused by no image exist on the database."}
    }

    return (
        <Preview machineDetails={machineDetails} brands={brands}>

        </Preview>
    )
  } catch (error: any) {
    
    // console.log(error)

    return <p>{error.message}</p>
  }

}