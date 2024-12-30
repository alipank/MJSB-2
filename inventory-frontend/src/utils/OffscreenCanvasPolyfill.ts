export class OffscreenCanvasPolyfill {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    constructor(width:number, height:number) {
        // Create a hidden HTMLCanvasElement
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
    }

    getContext(type:string) {
        if (type === '2d') return this.context;
        throw new Error(`Context type "${type}" is not supported in this polyfill.`);
    }

    async transferToImageBitmap() {
        return new Promise((resolve, reject) => {
            this.canvas.toBlob((blob) => {
                if (!blob) return reject(new Error('Failed to create Blob.'));
                createImageBitmap(blob).then(resolve).catch(reject);
            });
        });
    }
}

// Export OffscreenCanvas with fallback
export const OffscreenCanvas =
    typeof self !== 'undefined' && self.OffscreenCanvas
        ? self.OffscreenCanvas
        : OffscreenCanvasPolyfill;