import { useRouter } from "next/navigation"
import { baseURL } from "./constants"
import { CustomerData } from "@/models/customers/Customer"
import { PostBuyerProps } from "@/models/customers/Customer"

const mURL = baseURL+'/machines'
const cURL = baseURL+'/customers'

export function deleteMachine({ id }: { id: string }) {
    const formData = new FormData()

    formData.append('id', id)

    return fetch(
        mURL, {
        method: 'DELETE',
        body: formData
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

    formData.append('is_ready', props.value ? '1' : '0')

    return fetch(
        `${mURL}/${props.id}/is_ready`,
        {
            // headers: { "Content-Type": "multipart/form-data" },  
            method: "PUT",
            body: formData,
        })
}

export function postCustomer(props: PostBuyerProps) {

    // if (Object.values(props).find(e => e == false)) {
    //     console.log('props value(s) are falsy')
    // }

    const {machineId ,name , phone, sold_price} = props

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

export function deleteCustomer (props: {id: string}) {
    const formData = new FormData()
    formData.append('id', props.id)

    return fetch(
        cURL,
        {
            method: "DELETE",
            body:formData
        }
    )
}