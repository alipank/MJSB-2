export interface MachineDetails {
    id: number,
    brand_id: number,
    model: string,
    note: string,
    added_at: Date,
    updated_at: Date,
    bought_price: number,
    images: ImageDetails[]
    is_ready: boolean
    is_on_working: boolean
}

export interface ImageDetails {
    image_id: number,
    image_path: string
}