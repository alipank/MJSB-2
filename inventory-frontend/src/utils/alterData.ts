import { useRouter } from "next/navigation"
import { baseURL } from "./constants"
import { CustomerData } from "@/models/customers/Customer"
import { PostBuyerProps } from "@/models/customers/Customer"
import { FormInputProps } from "@/models/machines/MachineProps"

const mURL = baseURL + '/machines'
const cURL = baseURL + '/customers'

export function postMachine(props: Omit<Omit<FormInputProps, 'deleteImages'>, 'ready'>) {

    const { newImages, brandId, model, boughtPrice, note} = props


    const formData = new FormData()

    newImages.forEach(file => {
        formData.append("new_images[]", file)
    })

    formData.append("brand_id", brandId.toString())
    formData.append("model", model)
    formData.append("bought_price", boughtPrice)
    formData.append("note", note)
    // formData.append('is_ready', ready ? '1' : '0')

    console.log(formData)

    return fetch(
        mURL + "/add",
        {
            // headers: { "Content-Type": "multipart/form-data" },  
            method: "POST",
            body: formData,
        })
}

export function putMachine(props: Omit<FormInputProps, 'ready'> & {machineId:string}) {

    const { newImages, deleteImages, brandId, model, boughtPrice, note, machineId } = props

    const formData = new FormData()

    newImages.forEach(file => {
        formData.append("new_images[]", file)
    })
    deleteImages.forEach((id, i) => {
        formData.append(`delete_images_id[]`, id.toString())
    })
    formData.append("brand_id", brandId.toString())
    formData.append("model", model)
    formData.append("bought_price", boughtPrice)
    formData.append("note", note)
    // formData.append('is_ready', ready ? '1' : '0')

    console.log(formData)


    return fetch(
        `${mURL}/${machineId}`,
        {
            // headers: { "Content-Type": "multipart/form-data" },  
            method: "PUT",
            body: formData,
        })
}

export function deleteMachine({ id }: { id: string }) {
    const formData = new FormData()

    formData.append('id', id)

    return fetch(
        `${mURL}/${id}`, {
        method: 'DELETE',
        body: formData //some kind of auth for later
    }
    )
}

export function putMachineWorkingOn(props: { id: string, value: boolean }) {
    const formData = new FormData()

    formData.append('is_working_on', props.value ? '1' : '0')

    return fetch(
        `${mURL}/${props.id}/is_working_on`,
        {
            // headers: { "Content-Type": "multipart/form-data" },  
            method: "PUT",
            body: formData,
        })
}

export function putMachineReady(props: { id: string, value: boolean }) {
    const formData = new FormData()

    // console.log('putting')

    formData.append('is_ready', props.value ? '1' : '0')

    return fetch(
        `${mURL}/${props.id}/is_ready`,
        {
            method: "PUT",
            body: formData,
        })
}

export function postBrand(value: string) {
    const formData = new FormData()

    formData.append('brand_name', value)
    return fetch(
        baseURL + "/brands",
        {
            method: "POST",
            body: formData,
        })
}

export function postCustomer(props: PostBuyerProps) {

    // if (Object.values(props).find(e => e == false)) {
    //     console.log('props value(s) are falsy')
    // }

    const { machineId, name, phone, sold_price } = props

    const formData = new FormData()

    formData.append('machine_id', machineId)
    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('sold_price', sold_price)

    return fetch(
        cURL,
        {
            // headers: { "Content-Type": "multipart/form-data" },  
            method: "POST",
            body: formData,
        }
    )
}

export function deleteCustomer(props: { id: string }) {
    const formData = new FormData()
    formData.append('id', props.id)

    return fetch(
        cURL,
        {
            method: "DELETE",
            body: formData
        }
    )
}

export function deleteQrBatch(props: { id: string[] }) {
    const formData = new FormData()
    for (const id in props.id) {
        formData.append('id[]', props.id[id])
    }

    return fetch(
        `${baseURL}/qr-batch`,
        {
            method: 'DELETE',
            body: formData
        }
    )
}

export function putQrBatch(props: { id: string[] }) {
    const formData = new FormData()
    for (const id in props.id) {
        formData.append('id[]', props.id[id])
    }

    return fetch(
        `${baseURL}/qr-batch`,
        {
            method: 'PUT',
            body: formData
        }
    )
}
