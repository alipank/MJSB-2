import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useState } from "react";

interface ModalNewCustomerProps {
    isOpen: boolean,
    onOpenChange: () => void,

}

export default function ModalNewCustomer(props:ModalNewCustomerProps) {
    
    const { isOpen,onOpenChange } = props

    const [loading, setLoading] = useState<boolean>(false)
    const [disable, setDisable] = useState<boolean>(false)
    const [wiggle, setWiggle] = useState<boolean>(false)
    const [error, setError] = useState<Error>()
    // const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false)
    
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => {
                    return (
                        <>
                            <ModalBody>

                            </ModalBody>
                        </>
                    )
                }}
            </ModalContent>
        </Modal>
    )
}