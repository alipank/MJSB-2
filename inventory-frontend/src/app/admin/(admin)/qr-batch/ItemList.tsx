'use client'

import { getQrBatch, printQrBatch } from "@/utils/getData";
import Item, { QrBatchMachineDetails, QrBatchMachineState } from "./Item";
import { HTMLAttributes, useEffect, useState } from "react";
import { Brand } from "../add/page";
import { Button, ButtonProps, Spacer } from "@nextui-org/react";
import Collapsible, { CollapsibleContent } from "./Collapsible";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faTrash, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons/faPrint";
import { deleteQrBatch } from "@/utils/alterData";

export default function ItemList({ brands }: { brands: Brand[] }) {
    // const qrCodeBatch: QrBatchMachineDetails[] = await getQrBatch()
    // const brands = await getBrands()import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";

    const [isLoading, setIsloading] = useState(true)
    const [qrCodeBatch, setQrCodeBatch] = useState<QrBatchMachineDetails[]>([])
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
    const selectItem = {
        add: (id: string) => {
            setSelectedItems(prev => {
                return new Set(prev).add(id)
            })
        },
        addAll: () => {
            const allId = qrCodeBatch.map(e => e.id)
            setSelectedItems(new Set(allId))
        },
        remove: (id: string) => {
            setSelectedItems(prev => {
                const newSet = new Set(prev)
                newSet.delete(id)
                return newSet
            })
        },
        removeAll: () => {
            setSelectedItems(new Set())

        }
    }

    const onClose = () => {
        selectItem.removeAll()
    }

    const handleDeleteButton = (idBatch: Set<string>) => {
        deleteQrBatch({
            id: Array.from(idBatch)
        })
            .then(res => (res.json()))
            .then(json => {
                console.log(json)
                const newBatch = qrCodeBatch.filter(item => !selectedItems.has(item.id))
                setQrCodeBatch(newBatch)
                selectItem.removeAll()
            })
            .catch(err => console.log(err))
    }

    const handlePrintButton = (idBatch: Set<string>) => {
        printQrBatch({id: Array.from(idBatch)})
    }
    // const setMachineState = (id: string, state: boolean) => {
    //     // let item = qrCodeBatch.find((val) => val.id === id)
    //     const newBatch = qrCodeBatch.map((item, i) => {
    //         // console.log(item.id, id)
    //         if (item.id === id) {
    //             return {
    //                 ...item,
    //                 isSelected: state
    //             }
    //         } else {
    //             return item
    //         }
    //     })

    //     setQrCodeBatch(newBatch)
    //     // setQrCodeBatch
    // }
    // const [selectedItem, _setSelectedItem] = useState<number[]>([])

    // const addSelectedItem = (id:number) => {
    //     _setSelectedItem((prev) => {
    //         return [...prev, id]
    //     })
    // }


    const CollapsibleButton = ({ children, className, onPress }: ButtonProps) => {
        return (
            <Button onPress={onPress} className={`p-0 min-w-10 h-10 rounded-full bg-transparent hover:bg-default-200 ${className}`}>
                {children}
            </Button>
        )
    }

    useEffect(
        () => {
            getQrBatch()
                .then((res) => {
                    setQrCodeBatch(res)
                    setIsloading(false)
                })
        }, [])

    if (!isLoading) {
        return (
            <div>
                <div>
                    <Collapsible isOpen={selectedItems.size !== 0} onClose={onClose} className="absolute right-0 left-0 top-0 mx-auto my-0 max-w-md  bg-white z-50">
                        <CollapsibleContent className="px-3 pt-4">
                            {
                                (onClose) => {
                                    return (<>
                                        <div className="w-full flex justify-start items-center">
                                            <CollapsibleButton onPress={onClose} >
                                                <FontAwesomeIcon icon={faXmark} size="xl" />
                                            </CollapsibleButton>
                                            <p>
                                                {selectedItems.size} item
                                            </p>

                                        </div>
                                        <div className="w-full flex justify-end items-center">

                                            <CollapsibleButton onPress={selectItem.addAll}>
                                                <FontAwesomeIcon icon={faSquareCheck} size="xl" className="absolute" />
                                            </CollapsibleButton>

                                            <Spacer x={3}></Spacer>

                                            <CollapsibleButton onPress={() => { handleDeleteButton(selectedItems) }}>
                                                <FontAwesomeIcon icon={faTrashCan} size="xl" className="absolute" />
                                            </CollapsibleButton>

                                            <Spacer x={3}></Spacer>

                                            <CollapsibleButton onPress={() => { handlePrintButton(selectedItems) }}>
                                                <FontAwesomeIcon icon={faPrint} size="xl" className="absolute" />
                                            </CollapsibleButton>

                                        </div>
                                    </>)
                                }
                            }
                        </CollapsibleContent>
                    </Collapsible>
                    {
                        //     <Modal backdrop="transparent" placement={"top"} isOpen={selectedItems.size !== 0} onOpenChange={onOpenChange} className="rounded-none" hideCloseButton isDismissable={false} classNames={{
                        //     base: "!m-0 h-14 pointer-events-auto",
                        //     body: "justify-center",
                        //     // backdrop: "pointer-events-none",
                        //     wrapper: "pointer-events-none"
                        // }}>
                        //     <ModalContent className="flex flex-row items-center p-3">

                        //         {(onClose) => {
                        //             return (
                        //                 <>
                        //                 {/* <ModalHeader>Test</ModalHeader> */}

                        //                 <Button onPress={onClose} className="p-0 min-w-10 h-10 rounded-full bg-transparent hover:bg-default-200">
                        //                     <FontAwesomeIcon icon={faXmark} size="lg"/>
                        //                 </Button>
                        //                 <Spacer />
                        //                 <p>Test</p>
                        //             </>
                        //             )
                        //         }}
                        //     </ModalContent>
                        // </Modal>
                    }
                    <h1 className="text-xl font-bold mx-2 mt-0">
                        QR Code Print Batch
                    </h1>
                    <Spacer className="mb-5" />
                </div>
                <div className="flex flex-col -mx-2">
                    {
                        qrCodeBatch.map((data) => {
                            // console.log(data)
                            const isSelected = selectedItems.has(data.id)

                            return (
                                <Item key={data.id} machineDetails={data} brands={brands} selectItem={selectItem} isSelected={isSelected} />
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}