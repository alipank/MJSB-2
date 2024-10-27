import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime"
import Form from "./form"
import { MachineDetails } from "@/models/machineDetails"

export type Brand = {
  id: number
  brand_name: string
}


//why it takes me weeks just to finish this section, huft

export default async function Page({ params }: any) {

  async function getData() {
    const res = await fetch('http://localhost:3002/admin/' + params.id, {cache: "no-store"})

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }


  // const res = await fetch('http://localhost:3002/admin/machines/brands')
  // const brands: Brand[] = await res.json()
  console.log(params)
  try {
    const machineDetails: MachineDetails = await getData()

    const brands: Brand[] = [
      {
        id: 1,
        brand_name: "tes"
      }
    ]

    return (
      <Form brands={brands} machineDetails={machineDetails} />
    )
  } catch (error: any) {
    
    // console.log(error)

    return <p>{error.message}</p>
  }

}
