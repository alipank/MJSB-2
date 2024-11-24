import { useRouter } from "next/navigation"
import { baseURL } from "./constants"

export function deleteMachine({ id }: { id: string }) {
    const url = `${baseURL}/admin/machines`
    console.log(url)
    const formData = new FormData()

    formData.append('id', id)

    return fetch(
        url, {
        method: 'DELETE',
        body: formData
    }
    )
}

export function putMachineWorkingOn(props: { id: string, value: boolean }) {
    const formData = new FormData()

    formData.append('is_working_on', props.value ? '1' : '0')

    return fetch(
        baseURL + "/admin/" + props.id + "/is_working_on",
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
        baseURL + "/admin/" + props.id + "/is_ready",
        {
            // headers: { "Content-Type": "multipart/form-data" },  
            method: "PUT",
            body: formData,
        })
}