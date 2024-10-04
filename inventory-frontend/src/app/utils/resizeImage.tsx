export function resizeImage(url: string, maxWidth: number, maxHeight: number, quality: number): Promise<string> {
    return new Promise((resolve, reject) => {
        // const ctx = document.createElement
        if (quality > 1 || quality < 0) {
            reject(new Error('quality params only accept 0 - 1'))
        }

        console.log(url)

        const img = new Image()
        img.src = url

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

            const resizedUrl = canvas.toBlob((blob) => {
                if (blob) {
                    resolve(URL.createObjectURL(blob))
                } else {
                    reject(new Error('canvas.toBlob returned nothing, go check it out. hehe'))
                }
            }, 'image/jpeg', quality)




        }


    })
}