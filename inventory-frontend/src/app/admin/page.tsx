import { FormEvent } from "react";

export default function Admin() {

    async function onSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const res = await fetch('/admin/machines', {
            method: "POST",
            body: formData
        })
    
    }

    return <form onSubmit={onSubmit}>
        <input type="text" />
        <input type="text" />
        <input type="text" />
    </form>
}