import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import { FormEvent, useState } from "react";

type NewBrandProps = {
    isOpen: boolean,
    // onOpen: () => void,
    onOpenChange: () => void
}

export function NewBrand (props:NewBrandProps) {

    const {isOpen, onOpenChange} = props
    const [loading, setLoading] = useState<boolean>(false)

    function onSubmit (e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        
    } 

    return (
        <Modal isOpen={isOpen} onSubmit={onSubmit} placement="bottom-center" onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader>
                        Tambahkan Brand
                    </ModalHeader>
                    <ModalBody>
                        <form>
                            <Input></Input>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={onClose}>Cancel</Button>
                        <Button isLoading={loading} type="submit" onPress={() => {

                        }}>Submit</Button>

                    </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}