import { CustomerDetails } from "../customers/Customer"

export interface MachineDetails {
    id: number,
    brand_id: number,
    model: string,
    note: string,
    added_at: Date,
    updated_at: Date,
    bought_price: number,
    is_ready: boolean,
    is_working_on: boolean,
    images: ImageDetails[],
    customer: CustomerDetails

}

export interface ImageDetails {
    image_id: number,
    image_path: string
}