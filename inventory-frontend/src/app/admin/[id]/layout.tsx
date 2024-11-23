// 'use client'

import { baseURL } from "@/app/utils/constants";
import { getMachineData, getMachinesData } from "@/app/utils/getData";
import { cn, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ReadySwitch from "./ReadySwitch";

// export const getServerSideProps = (async () => )

export default async function MachineLayout({
    children, params
}: Readonly<{
    children: React.ReactNode,
    params: any
}>) {




    // useEffect(() => {

    //     getMachineData(params.id).then(data => {
    //         setReady(data.is_ready)
    //         setLoading(false)
    //     }
    // }, [])

     return getMachineData(params.id).then((data) => {
        console.log('masuk', data.is_ready)
        return (
            <>
                <ReadySwitch id={params.id} is_ready={data.is_ready}/>
                <div className="h-16"></div>
                {children}
                <div className="h-[2px] w-full bg-default-200 my-6"></div>
                <p className="text-sm">@2024 | Made by <span className="font-bold">Alipank</span> with &lt;3</p>
            </>
        );
     })

    // console.log(is_ready)
    

}
``