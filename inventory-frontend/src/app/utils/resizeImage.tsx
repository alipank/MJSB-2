import { FormImageDataFile } from "@/models/FormImageData"

export interface ResizeImageResult {
    url: string,
    file: File
}

export function resizeImage(file: FormImageDataFile, maxWidth: number, maxHeight: number, quality: number): Promise<ResizeImageResult> {
    return new Promise(async (resolve, reject) => {
        // const ctx = document.createElement
        if (quality > 1 || quality < 0) {
            reject(new Error('quality params only accept 0 - 1'))
        }

        // console.log(file.src.text())
        const reader = new FileReader()

        const img = new Image()

        reader.onload = async () => {
            if(reader.result) {
                img.src = reader.result.toString()
            }
        }

        reader.readAsDataURL(file.src)
        // img.src = await file.src.arrayBuffer()


        img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > maxWidth || height > maxHeight) {
                const aspectRatio = width / height
                if (width > height) {
                    width = maxWidth
                    height = Math.round(maxWidth / aspectRatio)
                } else {
                    height = maxHeight
                    width = Math.round(maxHeight * aspectRatio)
                }
            }

            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height

            const ctx = canvas.getContext('2d')

            ctx?.drawImage(img, 0, 0, width, height)

            canvas.toBlob((blob) => {
                if (blob) {
                    const newImagesfile = new File([blob], file.src.name, { type: file.src.type });
                    resolve({
                        url :URL.createObjectURL(blob),
                        file: newImagesfile})
                } else {
                    reject(new Error('canvas.toBlob returned nothing, go check it out. hehe'))
                }
            }, 'image/jpeg', quality)



        }


    })
}