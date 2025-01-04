'use client'
import { putMachineReady } from "@/utils/alterData"
import { baseURL } from "@/utils/constants"
import { cn, Switch } from "@nextui-org/react"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

export const ReadyContext = createContext({
    ready: false
})

export default function ReadySwitch(props: { id: string }) {

    const formRoundness: string | undefined = 'rounded-lg'

    const [ready, setReady] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true)

    const readyCtx = useContext(ReadyContext)

    useEffect(() => {
        setReady(readyCtx.ready)
        setIsLoading(false)
    }, [readyCtx.ready])

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
                toast.error('Failed to change the ready state')
                console.log(err)
                setTimeout(() => {
                    setReady(!state)
                }, 2000)

            });
    }

    return (
        <Switch color="success" isDisabled={isLoading} isSelected={ready}
            onClickCapture={e => {
                handleValueChange(!ready)
            }}


            // onTouchStart={e => {
            //     console.log('touch')
            //     if (e.targetTouches.length === 1) {
            //         handleValueChange(!ready)
            //     }
            // }}

            className="fixed  top-0 left-0 z-50 shadow-md"
            classNames={{
                base: cn('border-2 max-w-none w-full h-12 xs:h-16 p-4 flex flex-row-reverse justify-between transition-colors', formRoundness,

                    "data-[disabled=true]:bg-default-100 data-[disabled=true]:border-default-500 data-[disabled=true]:text-default-600",
                    "data-[selected=true]:bg-success-100 data-[selected=true]:hover:bg-success-50 data-[selected=true]:border-green-500 data-[selected=true]:hover:border-green-400",
                    "bg-danger-100 hover:bg-danger-50 border-danger-500 hover:border-danger-400",
                    "text-danger-600 data-[selected=true]:text-success-600",
                    // loading && '!bg-default-100 !border-default-200 !text-default-500'
                ),
                wrapper: `${!ready && 'bg-danger'} ${isLoading && '!bg-default'}`,
                label: cn('text-inherit font-bold')
            }}
        >
            {ready ? "Ready" : "Not Ready"}
        </Switch>
    )
}