import { Dispatch, SetStateAction } from "react"

export interface CustomerData {
    name: string,
    sold_price: string,
    phone: string
}

export interface CustomerDetails extends CustomerData {
    id: string,
    added_at: string
}

export interface PostBuyerProps extends CustomerData {
    machineId: string
}

export interface SetBuyerProps {
    isOpen: boolean,
    onOpenChange: () => void,
    machineId: string
    setCustomer: Dispatch<SetStateAction<CustomerDetails | undefined>>
}

export interface ViewBuyerProps  {
    isOpen: boolean,
    onOpenChange: () => void
    customerDetails?: CustomerDetails
}



