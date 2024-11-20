import { baseURL } from "./constants"

export async function getMachineData(id: number | string) {
    const res = await fetch(`${baseURL}/admin/` + id, {cache: "no-store"})

    if (!res.ok) {
      throw new Error('Failed to fetch data' + id)
    }

    return res.json()
  }

  export async function getMachinesData(pagination?:string) {
    const res = await fetch(`${baseURL}/admin/`, {cache: "no-store"})

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }