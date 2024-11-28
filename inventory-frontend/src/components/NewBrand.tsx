'use client'

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import { Required } from "./Form";
import { Brand } from "@/app/admin/add/page";


type NewBrandProps = {
    isOpen: boolean,
    // onOpen: () => void,
    onOpenChange: () => void,
    addNewBrandFunc:(brand:Brand) => void
}

export function NewBrand(props: NewBrandProps) {

    const baseURL = "http://localhost:3002"
    const { isOpen, onOpenChange } = props


    const [newBrand, setNewBrand] = useState<string>()

    const [loading, setLoading] = useState<boolean>(false)
    const [disable, setDisable] = useState<boolean>(false)
    const [wiggle, setWiggle] = useState<boolean>(false)
    const [error, setError] = useState<Error>()
    const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false)

    // const [touched, setTouched] = useState<boolean>(false)
    const isInvalid = Required(newBrand)

    function onSubmit(onClose: () => void) {

        if (isInvalid || isInputInvalid) {
            setIsInputInvalid(true)
            setWiggle(true)
            return
        }

        setLoading(true)

        const formData = {
            brand_name: newBrand
        }

        fetch(
            baseURL + "/brands",
            {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(formData),
            })
            .then(async (res) => {
                const json = await (res.json())
                if(!res.ok || res.status === 400) {
                    setError(new Error(await json.message))
                    setIsInputInvalid(true)
                    setLoading(false)
                    return
                }
                console.log(json)
                setLoading(false)
                props.addNewBrandFunc(json)
                onClose()
            })
            .catch((err) => {
                setError(new Error(err))
                setLoading(false)
                setDisable(true)
                setTimeout(() => { setDisable(false) }, 2000)
                console.log(err)
            });

    }

    function onCloseHandler() {
        setDisable(false)
        // setBrand(undefined)
        setLoading(false)
        setError(undefined)
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onCloseHandler} hideCloseButton backdrop="blur" placement="center" >
            <ModalContent>
                {(onClose) =>
                // setError(undefined)

                (
                    <div className={`relative ${disable && 'animate-wiggle'}`} >
                        {/* <div className={`z-50 absolute bg-black w-full h-full opacity-25 ${loading ? 'block' : 'hidden'}`}></div> */}

                        <ModalHeader>

                            {/* {!error ? "Tambahkan Brand" : `${error.message}`} */}
                            <p>Tambahkan Brand</p>
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                placeholder="Contoh: Singer, Brother, Janome"
                                description="Masukkan Brand Mesin Jahit yang belum ada di Database"
                                errorMessage={error?.message || "Wajib diisi"}
                                value={newBrand}
                                isInvalid={isInputInvalid}
                                // onBlur={() => {setTouched(true)}}
                                onChange={(e) => {
                                    setIsInputInvalid(false)
                                    setError(undefined)
                                    setNewBrand(e.target.value)
                                    console.log(newBrand)
                                }}></Input>
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={() => {

                                onClose()
                            }} >Cancel</Button>
                            <Button className={wiggle ? 'animate-wiggle' : ''} isLoading={loading} isDisabled={disable} type="submit" color="primary" onPress={() => { onSubmit(onClose) }} onAnimationEnd={() => { setWiggle(false) }}>Submit</Button>

                        </ModalFooter>
                    </div>
                )
                }
            </ModalContent>
        </Modal>
    )
}