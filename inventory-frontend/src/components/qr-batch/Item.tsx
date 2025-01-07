'use client'

import { ImageDetails } from "@/models/machines/MachineDetails";
import Image from "next/image";
import { baseURL } from "@/utils/constants";
import { Brand } from "@/app/admin/(admin)/(padding)/add/page";
import { Checkbox, cn } from "@nextui-org/react";


export interface QrBatchMachineDetails {
    id: string,
    brand_id: string,
    model: string,
    images:ImageDetails[]
}

export interface QrBatchMachineState extends QrBatchMachineDetails{
    isSelected: boolean
}

interface ItemProps {
    machineDetails: QrBatchMachineDetails,
    brands: Brand[]
    selectItem: {
        add: (id:string) => void,
        remove: (id:string) => void
    },
    isSelected: boolean
}

export default function Item(props: ItemProps) {

    // const [machineDetails, setMachineDetails] = useState<MachineDetails>(props.machineDetails)
    const machineDetails:QrBatchMachineDetails = props.machineDetails 
    const {add, remove} = props.selectItem
    const isSelected = props.isSelected

    const { id, brand_id, model, images } = machineDetails


    const imagePath = `${baseURL}/images/${images[0].image_path}`
    const brand = props.brands.find((val) => {
        return val.id === brand_id
    })?.brand_name

    return (
        <Checkbox
            size="lg"
            className="hover:opacity-90 hover:bg-default-200 py-1 px-4 transition-all duration-200 ease-in"
            classNames={{
                base: cn('flex flex-row-reverse m-0'),
                label: cn('flex gap-2 items-center text-md'),
                wrapper: 'before:!duration-0 after:!duration-75 ',
                icon: ' !duration-100'
            }}
            isSelected = {isSelected}
            onValueChange ={() => {
                // console.log('change', e.currentTarget.value)
                // props.setMachineState(id, !machineDetails.isSelected)
                if (!isSelected) {
                    add(id)
                } else {
                    remove(id)
                }
            }}
        >
            <Image src={imagePath} alt="" width={0} height={0} className="w-1/6 aspect-square rounded-md"></Image>
            <div>
                <h3 className="font-bold text-start">
                    {`${id} | ${brand} ${model}`}
                </h3>
            </div>
        </Checkbox>
    )
}