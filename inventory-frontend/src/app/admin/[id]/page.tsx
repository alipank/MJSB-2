import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime"
import Form from "./form"
import { MachineDetails } from "@/models/machineDetails"

export type Brand = {
  id: number
  brand_name: string
}


//why it takes me weeks just to finish this section, huft

export default async function Page({params}: any) {

  // const res = await fetch('http://localhost:3002/admin/machines/brands')
  // const brands: Brand[] = await res.json()
  const machineDetails:MachineDetails = await (await fetch('http://localhost:3002/admin/machines/'+params.id)).json()

  const brands: Brand[] = [
    {
      id: 1,
      brand_name: "tes"
    }
  ]

  console.log(machineDetails)

  return (
    <Form  brands={brands} machineDetails={machineDetails} />
  )
 
}
