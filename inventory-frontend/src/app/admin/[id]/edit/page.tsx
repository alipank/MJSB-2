import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime"
import Form from "./form"
import { MachineDetails } from "@/models/MachineDetails"
import { getMachineData } from "@/app/utils/getData"

export type Brand = {
  id: number
  brand_name: string
}


//why it takes me weeks just to finish this section, huft

export default async function Page({ params }: any) {

 
  // const res = await fetch('http://localhost:3002/admin/machines/brands')
  // const brands: Brand[] = await res.json()
  console.log(params)
  try {
    const machineDetails: MachineDetails = await getMachineData(params.id )
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
      <Form brands={brands} machineDetails={machineDetails}  />
    )
  } catch (error: any) {
    
    // console.log(error)

    return <p>{error.message}</p>
  }

}
