import { SetBuyerProps } from "@/models/customers/Customer";
import { postCustomer } from "@/utils/alterData";
import { useRequired } from "@/utils/validate";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";


export default function SetBuyer(props: SetBuyerProps) {

    const { setCustomer, isOpen, onOpenChange, machineId } = props

    const [loading, setLoading] = useState<boolean>(false)
    const [disable, setDisable] = useState<boolean>(false)
    const [wiggle, setWiggle] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<Error>()
    // const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false)

    const [name, setName] = useState<string>('')
    const [soldPrice, setSoldPrice] = useState<string>('')
    const [phone, setPhone] = useState<string>('')


    const [error, setError] = useState({
        name: false,
        soldPrice: false,
        phone: false
    })


    const isInvalid = {
        name: useRequired(name),
        phone: useRequired(phone && (9 < phone.length && phone.length < 15)),
        soldPrice: useRequired(soldPrice)
    }

    const areFieldsValid = !Object.values(isInvalid).includes(true)


    const onSubmit = (onClose: () => void) => {
        // const isInvalidEntries = Object.entries(isInvalid) //KAPAN KAPAN GUNAKAN LOOP tapi sekrang typescript nya masih ngebug

        if (isInvalid.name) {
            setError(prev => ({ ...prev, name: true }))
        }
        if (isInvalid.phone) {
            setError(prev => ({ ...prev, phone: true }))
        }
        if (isInvalid.soldPrice) {
            setError(prev => ({ ...prev, soldPrice: true }))
        }
        if (!areFieldsValid) {
            setWiggle(true)
            return
        }

        setLoading(true)

        return postCustomer(
            {
                machineId: machineId,//SEMENTAUN,
                name: name,
                phone: phone!,
                sold_price: soldPrice!
            }
        ).then(async (res) => {
            const json = await (res.json())
            if (!res.ok || res.status === 400) {
                setErrorMsg(new Error(await json.message))
                setLoading(false)
                return
            }
            // console.log(json)
            setCustomer({
                id: json.body.id,
                name: name,
                phone: phone,
                sold_price: soldPrice,
                added_at: Date()
            })
            setLoading(false)
            onClose()
        })
            .catch((err) => {
                setErrorMsg(new Error(err))
                setLoading(false)
                setDisable(true)
                setTimeout(() => { setDisable(false) }, 2000)
                console.log(err)
            })
    }

    function onCloseHandler() {
        setDisable(false)
        // setBrand(undefined)
        setLoading(false)
        setError({
            name: false,
            phone: false,
            soldPrice: false
        })
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onCloseHandler} classNames={{wrapper:"absolute left-0 top-0"}}>
            <ModalContent>
                {(onClose) => {
                    return (
                        <>
                            <ModalHeader>
                                Set Customer
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    size="lg"
                                    label={'Name'}
                                    // placeholder=""
                                    description='(Atas) Nama pembeli'
                                    errorMessage="Wajib diisi"
                                    isInvalid={error.name}
                                    onChange={(e) => {
                                        setName(e.currentTarget.value)
                                    }}
                                >
                                </Input>
                                <Input
                                    size="lg"
                                    label={'Phone'}
                                    // inputMode="numeric"
                                    errorMessage="Wajib diisi dan 9 < Nilai < 15"
                                    isInvalid={error.phone}
                                    onChange={(e) => {
                                        setPhone(e.currentTarget.value)
                                    }}
                                >
                                </Input>
                                <Input
                                    size="lg"
                                    label={'Sold Price'}
                                    // inputMode="numeric"
                                    isInvalid={error.soldPrice}
                                    onChange={(e) => {
                                        setSoldPrice(e.currentTarget.value.match(/\D+/) ? soldPrice : e.currentTarget.value)
                                    }}
                                >
                                </Input>
                                <p hidden={errorMsg ? true : false}>{errorMsg?.message}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button onPress={() => { onClose() }} >Cancel</Button>
                                <Button className={wiggle ? 'animate-wiggle' : ''} isLoading={loading} isDisabled={disable} color="primary" onPress={() => { onSubmit(onClose) }} onAnimationEnd={() => { setWiggle(false) }}>Submit</Button>

                            </ModalFooter>
                        </>
                    )
                }}
            </ModalContent>
        </Modal>
    )
}