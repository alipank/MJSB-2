'use client'
import { putMachineReady } from "@/utils/alterData"
import { baseURL } from "@/utils/constants"
import { cn, Switch } from "@nextui-org/react"
import { useEffect, useState } from "react"

export default function ReadySwitch(props: { id: string, is_ready: boolean }) {

    const formRoundness: string | undefined = 'rounded-lg'

    const [ready, setReady] = useState<boolean>(false)

    useEffect(() => {
        setReady(props.is_ready)
    }, [props.is_ready])

    // const [loading, setLoading] = useState<boolean>(true)

    const handleValueChange = (state: boolean) => {
        setReady(state)
        console.log(state)

        putMachineReady({ id: props.id, value: state })

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
        <Switch color="success" isSelected={ready} onClick={() => { handleValueChange(!ready) }}
            className="fixed  top-0 left-0 z-50 shadow-md"
            classNames={{
                base: cn('border-2 max-w-none w-full h-16 p-4 flex flex-row-reverse justify-between transition-colors', formRoundness,
                    " border-2 border-default-200 hover:border-default-400 focus:border-default-foreground",
                    "data-[selected=true]:bg-success-100 data-[selected=true]:hover:bg-success-50 data-[selected=true]:border-green-500 data-[selected=true]:hover:border-green-400",
                    "bg-danger-100 hover:bg-danger-50 border-danger-500 hover:border-danger-400",
                    "text-danger-600 data-[selected=true]:text-success-600",
                    // loading && '!bg-default-100 !border-default-200 !text-default-500'
                ),
                wrapper:
                    // loading ? 
                    // 'bg-default-500':
                    'bg-danger',
                label: cn('text-inherit font-bold')
            }}
        >
            {ready ? "Ready" : "Not Ready"}
        </Switch>
    )
}