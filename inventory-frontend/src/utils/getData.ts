import { Brand } from "../app/admin/add/page"
import { baseURL } from "./constants"

const mURL = `${baseURL}/machines`

export async function getBrands():Promise<Brand[]> {
  const res = await fetch(`${baseURL}/brands`)

  if (!res.ok) {
    throw new Error('Failed to fetch data (brands)')
  }

  return res.json()

}

export async function getMachineData(id: number | string) {
    const res = await fetch(`${mURL}/` + id, {cache:'no-store'})

    if (!res.ok) {
      throw new Error('Failed to fetch data' + id)
    }

    return res.json()
  }

  export async function getMachinesData(pagination?:number) {
    const res = await fetch(mURL)

    if (!res.ok) {
      // console.log(await res.json())
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }

  // export async function getMachinesDataReady(id: number | string) {
  //   const res = await fetch(`${baseURL}/admin/${id}/is_ready`)
  //   console.log(`${baseURL}/admin/${id}/is_ready`)
  //   if (!res.ok) {
  //     // console.log(await res.json())

  //     throw new Error('Failed to fetch data')
  //   }

  //   return res.json()
  // }