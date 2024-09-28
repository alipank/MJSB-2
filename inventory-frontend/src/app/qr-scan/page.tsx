'use client'

import Html5QrcodePlugin from "@/components/Html5QrcodePlugin";

export default function QrScan() {
    const onNewScanResult = (decodedText: any, decodedResult: any): void => {
        console.log("decoded text", decodedText)
        console.log("decoded result", decodedResult)

    }

    return <div>
        <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
        />
    </div>
}