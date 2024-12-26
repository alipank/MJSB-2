import { QrBatchMachineDetails } from "@/app/admin/qr-batch/Item"
import { Brand } from "../app/admin/add/page"
import { baseURL } from "./constants"

const mURL = `${baseURL}/machines`

export async function getBrands(): Promise<Brand[]> {
  const res = await fetch(`${baseURL}/brands`)

  if (!res.ok) {
    throw new Error('Failed to fetch data (brands)')
  }

  return res.json()

}

export async function getMachineData(id: number | string) {
  const res = await fetch(`${mURL}/` + id, { cache: 'no-store' })

  if (!res.ok) {
    console.log(id)
    throw new Error('Failed to fetch data' + id)
  }

  return res.json()
}

export async function getMachinesData(pagination?: number) {
  const res = await fetch(mURL)

  if (!res.ok) {
    // console.log(await res.json())
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function getQrBatch() {
  const res = await fetch(`${baseURL}/qr-batch`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function printQrBatch({ id }: { id: string[] }) {
  const formData = new FormData()
  for (const i in id) {
    formData.append('id[]', id[i])
  }

  fetch(`${baseURL}/qr-batch/generate`, {
    method: 'POST',
    body: formData
  }).then(res => {
    if (res.ok) {
      return res.blob()
    }
    throw new Error('failed to download PDF')
  })
    .then((blob) => {
      // Create a temporary link for download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      // link.download = "sewing_machines_qr_codes.pdf";
      link.click();
      window.URL.revokeObjectURL(url); // Cleanup
    })
    .catch((error) => {
      console.error("Error downloading the PDF:", error);
    });
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