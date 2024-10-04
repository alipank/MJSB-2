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
    const [loading, setLoading] = useState<boolean>(false)

    const [brand, setBrand] = useState<string>()

    function onSubmit(e: any) {

        setLoading(true)

        const formData = {
            brand_name: brand
        }

        fetch(
            baseURL + "/admin/machines/brand",
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
                    setTimeout(() => {
                        setLoading(false)

                    }, 2000)
                }
                setBrand(undefined)
            })
            .catch((err) => console.log(err));

    }

    return (
        <Modal isOpen={isOpen} hideCloseButton	 backdrop="blur" placement="center" onOpenChange={onOpenChange} >
            <ModalContent>
                {(onClose) => (
                    <div className='relative'>
                        <div className={`z-50 absolute bg-black w-full h-full opacity-25 ${loading ? 'block' : 'hidden'}`}></div>

                        <ModalHeader>
                            Tambahkan Brand
                        </ModalHeader>
                        <ModalBody>
                            <Input placeholder="Contoh: Singer, Brother, Janome" description="Masukkan Brand Mesin Jahit yang belum ada di Database" onChange={(e) => {
                                setBrand(e.target.value)
                                console.log(brand)
                            }}></Input>
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={() => {
                                setBrand(undefined)
                                onClose()
                            }} >Cancel</Button>
                            <Button isLoading={loading} type="submit" color="primary" onClick={onSubmit}>Submit</Button>

                        </ModalFooter>
                    </div>
                )}
            </ModalContent>
        </Modal>
    )
}