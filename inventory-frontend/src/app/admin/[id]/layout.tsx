'use client'

import { getData } from "@/app/utils/getData";
import { cn, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function MachineLayout({
    children, params
}: Readonly<{
    children: React.ReactNode,
    params: any
}>) {

    const baseURL = "http://localhost:3002"

    const formRoundness: string | undefined = 'rounded-lg'

    const [ready, setReady] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {

        getData(params.id).then(data => {
            setReady(data.is_ready)
            setLoading(false)
        })

    }, [])

    const handleValueChange = (state: boolean) => {

        const formData = new FormData()

        formData.append('is_ready', state ? '1' : '0')

        setReady(state)
        console.log(state)

        fetch(
            baseURL + "/admin/" + params.id + "/is_ready",
            {
                // headers: { "Content-Type": "multipart/form-data" },  
                method: "PUT",
                body: formData,
            })
            .then(async (res) => {
                const json = await res.json()

                if (!res.ok) {
                    throw json
                }

                console.log(json)
            })
            .catch((err) => {
                console.log(err)
                setTimeout(() => {
                    setReady(!state)

                }, 200)

            });
    }

    return (
        <div>
            <Switch color="success" isSelected={ready} onValueChange={(state) => { handleValueChange(state) }} classNames={{
                base: cn('border-2 max-w-none w-full h-16 p-4 flex flex-row-reverse justify-between transition-colors', formRoundness,
                    " border-2 border-default-200 hover:border-default-400 focus:border-default-foreground",
                    "data-[selected=true]:bg-success-100 data-[selected=true]:hover:bg-success-50 data-[selected=true]:border-green-500 data-[selected=true]:hover:border-green-400",
                    "bg-danger-100 hover:bg-danger-50 border-danger-500 hover:border-danger-400",
                    "text-danger-600 data-[selected=true]:text-success-600",
                    loading && '!bg-default-100 !border-default-200 !text-default-500'
                ),
                wrapper: loading ? 'bg-default-500':'bg-danger',
                label: cn('text-inherit font-bold')
            }}
            >
                {ready ? "Ready" : "Not Ready"}
            </Switch>

            {children}
        </div>
    );
}
`` 