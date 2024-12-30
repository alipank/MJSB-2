const fs = require('fs')
const { readBarcodesFromImageData, readBarcodesFromImageFile } = require("zxing-wasm/reader") ;

const readerOptions = {
    tryHarder: true,
    formats: ["QRCode"],
    maxNumberOfSymbols: 1,
  };
  

// const imageFile = await fetch(
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/NHS_Covid19_Test_and_Trace_QR_code.jpg/1701px-NHS_Covid19_Test_and_Trace_QR_code.jpg",
// ).then((resp) => resp.blob());

const imageFile = fs.readFileSync('./1.jpeg')

// const imageFileReadResults = await readBarcodesFromImageFile(imageFile, readerOptions);

// console.log(imageFileReadResults[0].text); // Hello world!

createImageBitmap(imageFile).then((imageBitmap) => {
    const { width, height } = imageBitmap;
    const context = new OffscreenCanvas(width, height).getContext(
      "2d",
    )
    context?.drawImage(imageBitmap, 0, 0, width, height);
    return context?.getImageData(0, 0, width, height);
  }) 
  .then(async res => {
    const imageDataReadResults = await readBarcodesFromImageData(res, readerOptions);
    console.log(imageDataReadResults)  
})
  