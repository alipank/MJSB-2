'use client'

import { baseURL } from "@/utils/constants";
import { getMachineData, getMachinesData } from "@/utils/getData";
import { cn, Switch } from "@nextui-org/react";
import { createContext, useContext, useEffect, useState } from "react";
import ReadySwitch, { ReadyContext } from "./ReadySwitch";

// export const getServerSideProps = (async () => )

export default function MachineLayout({
    children, params
}: Readonly<{
    children: React.ReactNode,
    params: any
}>) {

    // const ctx = useContext(ReadyContext)


    // useEffect(() => {

    //     getMachineData(params.id).then(data => {
    //         setReady(data.is_ready)
    //         setLoading(false)
    //     }
    // }, [])

    return (
        <>
            <ReadyContext.Provider value={{ ready: false }}>
                <ReadySwitch id={params.id} />
                <div className="h-12 xs:h-16"></div>
                {children}
            </ReadyContext.Provider>

            {/* <div className="h-[2px] w-full bg-default-200 my-6"></div>
                <p className="text-sm">@2024 | Made by <span className="font-bold">Alipank</span> with &lt;3</p> */}
        </>
    );

    // console.log(is_ready)


}
