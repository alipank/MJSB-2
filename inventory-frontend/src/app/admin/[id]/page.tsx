import { MachineDetails } from "@/models/MachineDetails";
import { Brand } from "../add/page";
import Preview from "./preview";
import { getBrands, getMachineData } from "@/app/utils/getData";
import { GetServerSidePropsContext } from "next";

// export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
//   const { id } = context.params ? context.params : { id: 0 }
//   if (!id) {
//     throw Error('failed to fetch data (serverSideProps) : no id')
//   }
//   const data = getMachineData(id.toString())

//   if (!data) {
//     return {
//       status:404,
//       message: 'failed to fetch data (serverSideProps)'
//     }
//   }

//   return {props:data}
// })
// TODO: THIS MACHINE PREVIEW WILL TAKING MACHINE DATA FROM THE MODAL MACHINE CONTEXT

export default async function Page({params}: {params:{id:string}}) {
  // const machineDetails:MachineDetails = { "id": 33, "brand_id": 1, "model": "123", "bought_price": 123, "note": "123", "is_ready": 1 && true, "added_at": new Date("2024-11-01T17:00:00.000Z"), "updated_at": new Date("2024-11-01T17:00:00.000Z"), "images": [{ "image_id": 27, "image_path": "2024-11-02-52468.png" }] }


  // const res = await fetch('http://localhost:3002/admin/machines/brands')
  // const brands: Brand[] = await res.json()
  // console.log('fetched data: ',params)
  try {
    const machineDetails: MachineDetails = await getMachineData(params.id)
    console.log(machineDetails)
    const brands: Brand[] = await getBrands() 

    if (machineDetails.images[0].image_id === null) {
      throw { message: "This error shouldnt be happened (just jaga jaga :P), this error is caused by no image exist on the database." }
    }

    return (
      <Preview machineDetails={machineDetails} brands={brands}></Preview>
    )
  } catch (error: any) {

    // console.log(error)

    return <p>{error.message}</p>
  }

}