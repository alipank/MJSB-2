'use client'

import { MachineDetails } from "@/models/machines/MachineDetails"
import { FormImageDataURL } from "@/models/machines/MachineProps"
import Image from "next/image"
import { Brand } from "../add/page"
import { useFormControl } from "@/components/Form"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { ImageType } from "@/models/machines/FormImageData"
import { Button, cn, Popover, PopoverContent, PopoverTrigger, Switch, useDisclosure } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faDiceThree, faEllipsis, faListDots, faPen, faPenToSquare, faQrcode, faSackXmark, faSquareXmark, faTrash, faTrashArrowUp, faTrashCan, faX, faXmark, faXmarksLines } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/navigation"
import { baseURL } from "@/utils/constants"
import { deleteCustomer, deleteMachine, deleteQrBatch, putMachineWorkingOn, putQrBatch } from "@/utils/alterData"
import revalidateAdmin from "@/utils/revalidate"
import { CustomerDetails } from "@/models/customers/Customer"
import SetBuyer from "@/components/SetBuyer"
import ViewBuyer from "@/components/ViewBuyer"
import { toast } from "react-toastify"
import { ReadyContext } from "./ReadySwitch"
import ArrowBack from "@/components/ArrowBack"
import { div } from "framer-motion/client"
// import { revalidatePath } from "next/cache"


export default function Preview(props: { brands: Brand[], machineDetails: MachineDetails }) {

    //modal for creating customer and modal for viewing customer details
    const { isOpen: isOpenSetBuyer, onOpenChange: onOpenChangeSetBuyer } = useDisclosure()
    const { isOpen: isOpenViewBuyer, onOpenChange: onOpenChangeViewBuyer } = useDisclosure()

    //popover control
    const { isOpen: isOpenPDelMachine, onOpenChange: onOpenCPDelMachine, onClose: onClosePDelMachine } = useDisclosure()
    const { isOpen: isOpenPDelCustomer, onOpenChange: onOpenCPDelCustomer, onClose: onClosePdelMachine } = useDisclosure()


    const formRoundness: string | undefined = 'rounded-lg'

    const formControl = useFormControl((formInput) => { onSubmit(formInput) })

    const [isLoaded, setIsLoaded] = useState(false)
    const [updatedAt, setUpdatedAt] = useState('')
    // const [addedAt, setAddedAt] = useState('')
    const [workingOn, setWorkingOn] = useState(false)
    const [isInQrBatch, setIsInQrBatch] = useState(false)
    const [customer, setCustomer] = useState<CustomerDetails>()

    const machineId = props.machineDetails.id.toString()

    const readyCtx = useContext(ReadyContext)

    // const isWorkingOn = props.machineDetails.is_working_on

    const router = useRouter()

    useEffect(() => {

        const details: MachineDetails = props.machineDetails

        console.log("monitor formControl useEffect")

        if (!isLoaded) { //just a sample to check if it has been executed or not

            console.log("monitor formControl useEffect 2", isLoaded)


            const existingImages: FormImageDataURL[] = details.images.map((img) => (
                new FormImageDataURL(img.image_id, ImageType.Existing, baseURL + '/images/' + img.image_path)
            ))

            formControl.setPreviews(x => existingImages)
            formControl.setBrandId(x => details.brand_id)
            formControl.setModel(x => details.model)
            formControl.setBoughtPrice(x => details.bought_price.toString())
            formControl.setNote(x => details.note)
            formControl.setReady(x => details.is_ready)

            setWorkingOn(details.is_working_on)
            setCustomer(details.customer)
            // console.log(details)
            setIsInQrBatch(details.is_in_qr_batch)

            // setUpdatedAt(details.updated_at)
            if (typeof details.updated_at === 'string') {
                setUpdatedAt(details.updated_at)
            }

            readyCtx.ready = details.is_ready

            setIsLoaded(true)
        }
    }, [props.machineDetails])

    //why put it in a useState ? not just destructuring it directly ? if i destructure it directly it will be rerendered every changes, even if the formControl didnt changed

    const { previews, brandId, model, note, onSubmit } = formControl

    const brandName = (props.brands.find(val => (val.id === brandId)))?.brand_name

    const isCustomerExist = useMemo(() => (Object.values(customer ? customer : {}).length !== 0), [customer])

    const handleWorkingOn = (state: boolean) => {

        setWorkingOn(state)

        putMachineWorkingOn({ id: machineId, value: state })
            .then(async (res) => {
                const json = await res.json()
                console.log('success', json)

                if (!res.ok) {
                    throw json
                }
                // return revalidateAdmin()
            })
            .then(done => { console.log('/admin revalidated') })
            .catch((err) => {
                console.log(err)
                setTimeout(() => {
                    setWorkingOn(!state)
                }, 200)
            });
    }

    const handleDeleteButton = () => {
        deleteMachine({ id: machineId })
            .then(res => (res.json()))
            .then(json => {
                console.log(json)
                toast.success('Removed successfully')
                router.push('/admin')
            })
            .catch(err => {
                toast.error("Failed to delete the item")
                console.log(err)
            })
    }

    const handleCustomerDeleteButton = () => {
        if (customer?.id) {
            deleteCustomer({ id: customer?.id })
                .then(res => res.json())
                .then(json => {
                    setCustomer(undefined);
                    onOpenCPDelCustomer()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const handleAddPrintBatch = () => {
        (isInQrBatch ?
            deleteQrBatch({ id: [machineId] }) :
            putQrBatch({ id: [machineId] }))
            .then(async res => {
                if (res.ok) {
                    return res.json()
                }
                throw { message: await res.json() }
            })
            .then(json => {
                setIsInQrBatch(!isInQrBatch)
                toast.success(!isInQrBatch ? 'Added to QR Batch' : "Removed from QR Batch")
                console.log(json)
            })
            .catch(err => {
                toast.error(!isInQrBatch ? 'Failed to add the item to QR Batch' : "Failed to remove the item from QR Batch")
                console.log(err)
            })

    }

    // const handlePrintQr = () => {
    //     const formData = new FormData()
    //     formData.append('id[]', machineId)

    //     fetch(`${baseURL}/card/generate-card`, {
    //         method: 'POST',
    //         body: formData
    //     }).then(res => {
    //         if (res.ok) {
    //             return res.blob()
    //         }
    //         throw new Error('failed to download PDF')
    //     })
    //         .then((blob) => {
    //             // Create a temporary link for download
    //             const url = window.URL.createObjectURL(blob);
    //             const link = document.createElement("a");
    //             link.href = url;
    //             link.download = "sewing_machines_qr_codes.pdf";
    //             link.click();
    //             window.URL.revokeObjectURL(url); // Cleanup
    //         })
    //         .catch((error) => {
    //             console.error("Error downloading the PDF:", error);
    //         });
    // }

    if (isLoaded) {
        return (
            <>
                {/* <div className="relative min-h-dvh flex justify-center items-center">
                <div className="max-w-md w-full p-4 border-2 border-gray-200 rounded-3xl"> */}
                <ArrowBack path={'/admin'} />

                <div className="relative block -mx-4 w-auto overflow-x-scroll ">
                    <div className="flex w-full flex-row-reverse justify-end gap-1 *:flex-shrink-0">
                        {
                            previews.map((imageSrc, i: any) => {
                                if (typeof imageSrc.src == 'string') {

                                    const key = imageSrc.type.toString() + imageSrc.id

                                    console.log(previews.length, key)

                                    return (
                                        <div key={key} className="relative">
                                            <Image key={key} src={imageSrc.src} alt="Your image" width={1} height={1} className={`h-36 w-auto border-2 border-gray-200 ${formRoundness} `} />
                                        </div>
                                    )


                                }
                            })
                        }
                    </div>
                </div>
                <div className="h-4" />
                <div className="flex basis-full flex-shrink-0 flex-col justify-center items-center ">
                    {/* <div className=""> */}
                    <h1 className="text-2xl font-bold text-foreground-800">
                        {machineId + ' | ' + brandName + ' ' + model}
                    </h1>
                    <p className="text-sm text-foreground-500">
                        {updatedAt}
                    </p>
                    <div className="flex flex-row items-center  w-full max-w-80 gap-1 mt-4 mb-2">
                        <Button className=" h-12 font-bold w-full text-md" size="lg" color={isCustomerExist ? 'default' : 'primary'} onPress={
                            () => {
                                if (isCustomerExist) {
                                    onOpenChangeViewBuyer()
                                } else {
                                    onOpenChangeSetBuyer()
                                }
                            }
                        }>
                            {isCustomerExist ? "View Buyer's Details" : "Mark as Sold"}
                        </Button>
                        <Popover placement="bottom" isOpen={isOpenPDelCustomer} onOpenChange={onOpenCPDelCustomer}>
                            <PopoverTrigger>
                                <Button variant='flat' className={`bg-default-100 min-w-16 w-14 h-12 rounded-xl ${!isCustomerExist && 'hidden'}`} onPress={() => { onOpenCPDelCustomer() }}>
                                    <FontAwesomeIcon icon={faTrashCan} size="lg" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="px-1 py-2">
                                    <div className="te font-bold">Yakin ?</div>
                                    <div className="h-2" />

                                    <div className="flex flex-row gap-3 justify-center">
                                        <Button size="sm" color="primary" isIconOnly onPress={handleCustomerDeleteButton}><FontAwesomeIcon icon={faCheck} /></Button>
                                        {/* <Button size="sm" color="danger" isIconOnly onPress={}><FontAwesomeIcon icon={faXmark} /></Button> */}
                                    </div>
                                </div>
                            </PopoverContent>

                        </Popover>
                        {/* <Button className={`min-w-16 w-14 h-12 rounded-xl ${!isCustomerExist && 'hidden'}`}>
                            .icon
                        </Button> */}
                    </div>
                    {/* <div className="w-full max-w-80"> */}
                    <div className="max-w-80 w-full flex justify-center mb-3 rounded-2xl bg-gradient-to-br from-transparent to-default-100">
                        <Switch color="warning"
                            isSelected={workingOn}
                            // onValueChange={(value) => {handleWorkingOn(value)}}
                            // onTouchStart={(e) => {
                            //     if (e.targetTouches.length === 1) {
                            //         handleWorkingOn(!workingOn)
                            //     } 
                            // }}
                            onClickCapture={() => { handleWorkingOn(!workingOn) }}
                            size="sm"
                            // className="mb-3"
                            classNames={{
                                base: cn(
                                    "flex flex-row-reverse w-full data-[hover=true]:opacity-hover items-center",
                                    "justify-between cursor-pointer rounded-2xl gap-2 h-12 pr-1 border-2 border-transparent",
                                    "border-default-400 data-[selected=true]:border-warning transition-background transition-opacity",
                                    "text-default-500 data-[selected=true]:text-warning-500",
                                    'data-[selected=true]:bg-gradient-to-br data-[selected=true]:from-warning-50 data-[selected=true]:to-warning-100',
                                    '!max-w-80'
                                ),
                                label: cn("text-inherit w-full font-bold text-md")
                            }}>
                            <p className="text-center ">
                                Sedang Dikerjakan
                            </p>
                        </Switch>
                    </div>

                    <div className="*:text-center *:text-default-800 *:*:text-default-800 flex flex-row justify-around w-full max-w-80">
                        <div className="w-1/5 flex flex-col gap-1 items-center font-bold text-sm">
                            <Button onPress={() => {
                                router.replace(`/admin/${machineId}/edit`)
                            }} className="min-w-12 w-12 h-12 p-0 rounded-full"><FontAwesomeIcon size="lg" icon={faPen} /></Button>
                            Edit item
                        </div>
                        <div className="w-1/5 flex flex-col gap-1  items-center font-bold text-sm">
                            <Popover placement="bottom" isOpen={isOpenPDelMachine} onOpenChange={onOpenCPDelMachine}>
                                <PopoverTrigger>
                                    <Button className="min-w-12 w-12 h-12 p-0 rounded-full" onPress={onOpenCPDelMachine}><FontAwesomeIcon size="lg" icon={faTrash} /></Button>
                                </PopoverTrigger>
                                <PopoverContent>

                                    <div className="px-1 py-2 text-center">
                                        <div className="te font-bold">Yakin ?</div>
                                        <div className="h-2" />

                                        <div className="flex flex-row gap-3 justify-center">
                                            <Button size="sm" color="primary" isIconOnly onPress={handleDeleteButton}><FontAwesomeIcon icon={faCheck} /></Button>
                                        </div>

                                    </div>

                                </PopoverContent>
                            </Popover>
                            Delete Item
                        </div>
                        <div className="w-1/5 flex flex-col gap-1 items-center font-bold text-sm">
                            <Button className="min-w-12 w-12 h-12 p-0 rounded-full" onPress={handleAddPrintBatch}><FontAwesomeIcon size="lg" icon={faQrcode} /></Button>
                            {isInQrBatch ? 'Remove from Batch' : 'Add to Batch'}
                        </div>
                        <div className="w-1/5 flex flex-col gap-1 items-center font-bold text-sm">

                            <Button isDisabled={true} className="min-w-12 w-12 h-12 p-0 rounded-full"><FontAwesomeIcon size="lg" icon={faEllipsis} /></Button>
                            More
                        </div>
                    </div>

                    {/* </div> */}
                    <div className="h-[2px] w-full mt-6 mb-4 bg-default-200 "></div>
                    {note.split('\n').map((i) => {
                        return (
                            <div key={i} className="text-start w-full">
                                {i}
                            </div>
                        )
                    })}

                </div>
                <SetBuyer isOpen={isOpenSetBuyer} onOpenChange={onOpenChangeSetBuyer} machineId={machineId} setCustomer={setCustomer} />
                <ViewBuyer isOpen={isOpenViewBuyer} onOpenChange={onOpenChangeViewBuyer} customerDetails={customer} />

                {/* </div>
            </div> */}
            </>
        )
    }
}