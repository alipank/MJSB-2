import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { FormEvent, useState } from "react";


type NewBrandProps = {
    isOpen: boolean,
    // onOpen: () => void,
    onOpenChange: () => void
}



export function NewBrand(props: NewBrandProps) {

    const baseURL = "http://localhost:3002"
    const { isOpen, onOpenChange } = props


    const [brand, setBrand] = useState<string>()


    const [loading, setLoading] = useState<boolean>(false)
    const [disable, setDisable] = useState<boolean>(false)
    const [error, setError] = useState<Error>()


    function onSubmit(e: any) {

        setLoading(true)

        const formData = {
            brand_name: brand
        }

        fetch(
            baseURL + "/admin/brands",
            // "http://192.168.172.87:3002/admin/machines",
            {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(formData),
            })
            .then((res) => {
                if (res.ok) {
                    setLoading(false)
                } else {
                    setError(new Error())
                    setLoading(false)
                }
                setBrand(undefined)
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
                    <div className='relative'>
                        {/* <div className={`z-50 absolute bg-black w-full h-full opacity-25 ${loading ? 'block' : 'hidden'}`}></div> */}

                        <ModalHeader>

                            {!error ? "Tambahkan Brand" : `${error.message}`}
                        </ModalHeader>
                        <ModalBody>
                            <Input placeholder="Contoh: Singer, Brother, Janome" description="Masukkan Brand Mesin Jahit yang belum ada di Database" onChange={(e) => {
                                setBrand(e.target.value)
                                console.log(brand)
                            }}></Input>
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={() => {
                                onClose()
                            }} >Cancel</Button>
                            <Button isLoading={loading} isDisabled={disable} type="submit" color="primary" onClick={onSubmit}>Submit</Button>

                        </ModalFooter>
                    </div>
                )
                }
            </ModalContent>
        </Modal>
    )
}