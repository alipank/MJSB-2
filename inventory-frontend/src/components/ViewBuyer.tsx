import { ViewBuyerProps } from "@/models/customers/Customer";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

export default function ViewBuyer(props: ViewBuyerProps) {

    const { isOpen, onOpenChange, customerDetails } = props

    // const { name, phone, sold_price, added_at } = customerDetails?

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            Buyer's Details
                        </ModalHeader>
                        <ModalBody className="flex flex-row">
                            {/* <p><span className="font-bold">Name</span>\t{name}</p>
                            <p><span className="font-bold">Phone</span>{phone}</p>
                            <p><span className="font-bold">Sold Price</span>{sold_price}</p> */}
                            <div>
                                <p className="font-bold">Name</p>
                                <p className="font-bold">Phone</p>
                                <p className="font-bold">Sold Price</p>
                            </div>
                            <div>
                                <p >:</p>
                                <p >:</p>
                                <p >:</p>
                            </div>
                            <div>
                                <p >{customerDetails?.name}</p>
                                <p >{customerDetails?.phone}</p>
                                <p >{customerDetails?.sold_price}</p>
                            </div>
                        </ModalBody>
                        <ModalFooter className="justify-between">
                            <p className="text-sm font-light">{new Date(customerDetails?.added_at || '').toLocaleDateString()}</p>
                            <Button color="primary" onPress={onClose} className="font-bold">Close</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}