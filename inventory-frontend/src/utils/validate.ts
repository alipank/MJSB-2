import { useMemo } from "react"


export const useRequired = (value: any) => useMemo(() => {
    return !Boolean(value)
}, [value])

//minLen, returns a useMemo that will check if value > min (not >=) 
export const useMinLen = (value: any, min: number) => useMemo(() => {
    return value.length > min
}, [value])
