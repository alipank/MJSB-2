'use client'

import { MachineDetails } from "@/models/MachineDetails"
import { FormImageDataURL } from "@/models/MachineProps"
import Image from "next/image"
import { Brand } from "../add/page"
import { useFormControl } from "@/components/Form"
import { useEffect } from "react"
import { ImageType } from "@/models/FormImageData"
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro"

export default function Preview(props: { brands: Brand[], machineDetails: MachineDetails }) {

    const baseURL = 'http://localhost:3002'

    const formRoundness: string | undefined = 'rounded-lg'

    const formControl = useFormControl((formInput) => { onSubmit(formInput) })

    useEffect(() => {

        const details: MachineDetails = props.machineDetails

        const existingImages: FormImageDataURL[] = details.images.map((img) => (
            new FormImageDataURL(img.image_id, ImageType.Existing, baseURL + '/images/' + img.image_path)
        ))


        console.log("monitor formControl useEffect")
        formControl.setPreviews(existingImages)
        formControl.setBrandId(details.brand_id)
        formControl.setModel(details.model)
        formControl.setBoughtPrice(details.bought_price.toString())
        formControl.setNote(details.note)
        formControl.setReady(details.is_ready)
    }, [props.machineDetails])

    const { newImages, setNewImages, deleteImages, setDeleteImages, previews, setPreviews, brandId, setBrandId, model, setModel, boughtPrice, setBoughtPrice, note, setNote, ready, setReady, onSubmit } = formControl

    const brandName = (props.brands.find(val => (val.id === brandId)))?.brand_name

    return (
        <div className="relative min-h-dvh flex justify-center items-center">
            <div className="*:mb-4 max-w-md w-full p-4 border-2 border-gray-200 rounded-3xl">
                <div className="relative block -mx-4 w-auto overflow-x-auto scrollbar-hide">
                    <div className="flex w-full flex-row-reverse justify-end gap-1 *:flex-shrink-0">
                        {
                            previews.map((imageSrc: any, i: any) => {
                                if (typeof imageSrc.src == 'string') {

                                    const key = imageSrc.type + imageSrc.id

                                    return (
                                        <div key={imageSrc.getKey()} className="relative">
                                            <Image key={imageSrc.getKey()} src={imageSrc.src} alt="Your image" width={1} height={1} className={`w-fit h-36 border-2 border-gray-200 ${formRoundness}`} />
                                        </div>
                                    )

                                } else {
                                    console.log(typeof imageSrc.src, "Seharusnya type imageSrc.src adalah string")
                                }
                            })
                        }
                    </div>
                </div>
                <h1>
                    {brandName + ' ' + model}
                </h1>
            </div>
        </div>
    )
}