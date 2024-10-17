export interface MachineDetails {
    id: number,
    brand_id: number,
    model: string,
    note: string,
    added_at: Date,
    updated_at: Date,
    bought_price: number,
    images: Image[]
}

interface Image {
    image_id: number,
    image_path: string
}