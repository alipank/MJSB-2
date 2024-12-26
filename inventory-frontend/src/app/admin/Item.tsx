'use client'

import { MachineDetails } from "@/models/machines/MachineDetails";
import Image from "next/image";
import { Brand } from "./add/page";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faQrcode, faScrewdriverWrench, faTag } from "@fortawesome/free-solid-svg-icons";
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

    const { id, brand_id, model, images, is_ready, is_working_on, is_in_qr_batch } = machineDetails

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

    const setIsInBatch = (value: boolean) => {
        console.log('ItemIsReady Func')
        machineDetails.is_in_qr_batch = value
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
                            <div className="flex justify-center items-center size-6 mr-1 bg-warning-400 rounded-full align-middle">
                                <FontAwesomeIcon icon={faScrewdriverWrench} color="white" />
                            </div> : ''
                        }
                    </div>
                    <div className="text-default-600 text-sm font-medium">
                        <div className={`flex justify-center items-center size-6 mr-1 ${is_ready ? 'bg-success-400' : 'bg-danger-400'}  rounded-full align-middle`}>
                            <FontAwesomeIcon icon={faTag} color="white" />

                        </div>
                    </div>
                    <div className="text-default-600 text-sm font-medium">
                        {is_in_qr_batch ?
                            <div className="flex justify-center items-center size-6 mr-1 bg-sky-400 rounded-full align-middle">
                                <FontAwesomeIcon icon={faQrcode} color="white" />
                            </div> : ''
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
                    mm.setIsInBatch = setIsInBatch

                    mm.openModal(machineDetails)
                }} className="bg-transparent hover:bg-default-100" isIconOnly>
                    <FontAwesomeIcon icon={faEllipsis} ></FontAwesomeIcon>
                </Button>
            </div>
        </div>
    )
}