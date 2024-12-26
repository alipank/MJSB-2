'use client'

import Html5QrcodePlugin from "@/components/Html5QrcodePlugin";
import { baseURL } from "@/utils/constants";
import { usePathname, useRouter } from "next/navigation";

export default function QrScan() {

    const router = useRouter()

    const onNewScanResult = (decodedText: string, decodedResult: any): void => {
        //CREATE CHECK WIH DATA FROM SERVER / SEND VALUE TO SERVER FOR CHECKING
        //if you checking it to server, i recommend you tu check previous value too, if the previous value is the same, don't check it again
        //but for now, fuck it all
        router.replace(`http://${window.location.host}/admin/${decodedText}`)
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