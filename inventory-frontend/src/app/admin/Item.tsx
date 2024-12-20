'use client'

import { MachineDetails } from "@/models/machines/MachineDetails";
import Image from "next/image";
import { Brand } from "./add/page";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { baseURL } from "../../utils/constants";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { ModalMachineContext } from "./ModalContext";

interface ItemProps {
    machineDetails: MachineDetails,
    brands: Brand[]
}

export default function Item(props: ItemProps) {


    const router = useRouter()

    const mm = useContext(ModalMachineContext)

    const [machineDetails, setMachineDetails] = useState<MachineDetails>(props.machineDetails)

    // modalMachine

    const { id, brand_id, model, images, is_ready, is_working_on } = machineDetails

    const imagePath = `${baseURL}/images/${images[0].image_path}`
    const brand = props.brands.find((val) => {
        return val.id === brand_id
    })?.brand_name

    const setItemIsWorkingOn = (value: boolean) => {
        console.log('ItemIsWorkingOn Func')
        machineDetails.is_working_on = value
        setMachineDetails({ ...machineDetails })
    }

    const setItemIsReady = (value: boolean) => {
        console.log('ItemIsReady Func')
        machineDetails.is_ready = value
        setMachineDetails({ ...machineDetails })
    }


    return (
        <div
            onClick={() => { router.push('/admin/' + id) }}
            // href={'/admin/' + id}
            className="flex flex-row justify-start gap-3 hover:opacity-90 hover:bg-default-200 py-2 px-4 transition-all duration-200 ease-in"
        >
            <Image src={imagePath} alt="" width={0} height={0} className="w-1/6 aspect-square rounded-lg"></Image>
            <div>
                <h3 className="font-bold text-start">
                    {`${id} | ${brand} ${model}`}
                </h3>
                <div className="flex flex-row">
                    <div className="text-default-600 text-sm font-medium">
                        {is_working_on ?
                            <><div className="inline-block w-4 h-4 mr-1 bg-warning-400 rounded-full align-middle"></div><span className="align-middle">On Working</span></>
                            : ''
                            // <><div className="inline-block w-4 h-4 mr-1 bg-danger-500 rounded-full align-middle"></div><span className="align-middle ">Not Ready</span></>
                        }
                    </div>
                    <div className="text-default-600 text-sm font-medium">
                        {is_ready ?
                            <><div className={`${is_working_on && "ml-2"} inline-block w-4 h-4 mr-1 bg-success-400 rounded-full align-middle p-0`}></div><span className="align-middle">Ready</span></>
                            :
                            <><div className={`${is_working_on && "ml-2"} inline-block w-4 h-4 mr-1  bg-danger-400 rounded-full align-middle p-0`}></div><span className="align-middle ">Not Ready</span></>
                        }
                    </div>
                </div>
            </div>
            <div className="flex-1 flex justify-end items-center pr-3">
                <Button onPress={(e) => {
                    console.log('clicked')
                    // setUseItemIsWorkingOn(() => setItemIsWorkingOn)
                    // setUseItemIsReady(() => setItemIsReady)
                    console.log(is_ready, is_working_on)
                    
                    mm.setItemIsReady = setItemIsReady
                    mm.setItemIsWorkingOn = setItemIsWorkingOn

                    mm.openModal(machineDetails)
                }} className="bg-transparent hover:bg-default-100" isIconOnly>
                    <FontAwesomeIcon icon={faEllipsis} ></FontAwesomeIcon>
                </Button>
            </div>
        </div>
    )
}