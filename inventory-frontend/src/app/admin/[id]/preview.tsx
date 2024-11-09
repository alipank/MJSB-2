'use client'

import { MachineDetails } from "@/models/MachineDetails"
import { FormImageDataURL } from "@/models/MachineProps"
import Image from "next/image"
import { Brand } from "../add/page"
import { useFormControl } from "@/components/Form"
import { useEffect, useState } from "react"
import { ImageType } from "@/models/FormImageData"
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro"
import { Button, CircularProgress, cn, divider, Skeleton, Switch } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"

export default function Preview(props: { brands: Brand[], machineDetails: MachineDetails }) {

    const baseURL = 'http://localhost:3002'

    const formRoundness: string | undefined = 'rounded-lg'

    const formControl = useFormControl((formInput) => { onSubmit(formInput) })

    const [isLoaded, setIsLoaded] = useState(false)

    const [updatedAt, setUpdatedAt] = useState('')
    const [addedAt, setAddedAt] = useState('')


    useEffect(() => {

        const details: MachineDetails = props.machineDetails

        const existingImages: FormImageDataURL[] = details.images.map((img) => (
            new FormImageDataURL(img.image_id, ImageType.Existing, baseURL + '/images/' + img.image_path)
        ))

        console.log("monitor formControl useEffect", details.images.length, existingImages.length)
        formControl.setPreviews(existingImages)
        formControl.setBrandId(details.brand_id)
        formControl.setModel(details.model)
        formControl.setBoughtPrice(details.bought_price.toString())
        formControl.setNote(details.note)
        formControl.setReady(details.is_ready)

        // setUpdatedAt(details.updated_at)
        if (typeof details.updated_at === 'string') {
            setUpdatedAt(details.updated_at)
        }

        setIsLoaded(true)
    }, [])

    const { newImages, setNewImages, deleteImages, setDeleteImages, previews, setPreviews, brandId, setBrandId, model, setModel, boughtPrice, setBoughtPrice, note, setNote, ready, setReady, onSubmit } = formControl

    const brandName = (props.brands.find(val => (val.id === brandId)))?.brand_name

    if (isLoaded) {
        return (
            <div className="relative min-h-dvh flex justify-center items-center">
                <div className="*:mb-4 max-w-md w-full p-4 border-2 border-gray-200 rounded-3xl">
                    <div className="relative block -mx-4 w-auto overflow-x-auto scrollbar-hide">
                        <div className="flex w-full flex-row-reverse justify-end gap-1 *:flex-shrink-0">
                            {
                                previews.map((imageSrc: any, i: any) => {
                                    if (typeof imageSrc.src == 'string') {

                                        const key = imageSrc.type + imageSrc.id

                                        console.log('1')
                                        console.log(previews.length)


                                        return (
                                            <div key={key} className="relative">
                                                <Image key={key} src={imageSrc.src} alt="Your image" width={1} height={1} className={`w-fit h-36 border-2 border-gray-200 ${formRoundness}`} />
                                            </div>
                                        )


                                    } else {
                                        console.log(typeof imageSrc.src, "Seharusnya type imageSrc.src adalah string")
                                        return (<div>gagal render :/</div>)
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className="flex basis-full flex-shrink-0 flex-col justify-center items-center ">
                        {/* <div className=""> */}
                        <h1 className="text-2xl font-bold text-foreground-800">
                            {brandName + ' ' + model}
                        </h1>
                        <p className="text-sm text-foreground-500">
                            {updatedAt}
                        </p>
                        <div className="flex flex-row items-center  w-full max-w-80 gap-1 mt-4 mb-2">
                            <Button className=" h-12 font-bold w-full text-md" size="lg" color="primary">
                                Tandai Sudah Terjual
                            </Button>
                            <Button className="min-w-16 w-14 h-12 rounded-xl"> {/* mt-1 to align it with its sibling button */}
                                .icon
                            </Button>
                        </div>
                        {/* <div className="w-full max-w-80"> */}
                        <Switch color="warning"
                            size="sm"
                            className="mb-3"
                            classNames={{
                                base: cn(
                                    "flex flex-row-reverse w-full bg-content2 data-[hover=true]:opacity-hover items-center",
                                    "justify-between cursor-pointer rounded-2xl gap-2 h-12 pr-1 border-2 border-transparent",
                                    "border-default-200 data-[selected=true]:border-warning data-[selected=true]:bg-warning-50 transition-background transition-opacity",
                                    "text-default-400 data-[selected=true]:text-warning",
                                    '!max-w-80'
                                ),
                                label: cn("text-inherit w-full font-bold text-md")
                            }}>
                            <p className="text-center ">
                                Sedang Dikerjakan
                            </p>
                        </Switch>
                        <div className="flex flex-row justify-around w-full max-w-80">
                            <Button className="min-w-12 w-12 h-12 p-0 rounded-full"><FontAwesomeIcon size="lg" icon={faPen} /></Button>
                            <Button className="min-w-12 w-12 h-12 p-0 rounded-full"><FontAwesomeIcon size="lg" icon={faTrash} /></Button>
                            <Button className="min-w-12 w-12 h-12 p-0 rounded-full"></Button>
                            <Button className="min-w-12 w-12 h-12 p-0 rounded-full"></Button>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        )
    }
}