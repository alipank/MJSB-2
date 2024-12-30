'use client'

import { baseURL } from "@/utils/constants";
import { div } from "framer-motion/client";
import { usePathname, useRouter } from "next/navigation";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

export default function QrScan() {

    const router = useRouter()

    enum QrScannerPageState {
        Loading = 0,
        HasCamera = 1,
        NoCamera = 2

    }

    const [pageState, setPageState] = useState<QrScannerPageState>(QrScannerPageState.Loading)
    const [camera, setCamera] = useState()

    const videoRef = useRef<HTMLVideoElement>(null)

    if (videoRef && videoRef.current) {

        const onDecode = (decodedData: QrScanner.ScanResult): void => {
            //CREATE CHECK WIH DATA FROM SERVER / SEND VALUE TO SERVER FOR CHECKING
            //if you checking it to server, i recommend you tu check previous value too, if the previous value is the same, don't check it again
            //but for now, fuck it all

            router.replace(`http://${window.location.host}/admin/${decodedData.data}`)
            scanner.destroy()
            // console.log(decodedText)
        }

        const scanner = new QrScanner(
            videoRef.current,
            onDecode,
            {
                highlightScanRegion: true,
                highlightCodeOutline: true,
                // calculateScanRegion(video) {
                //     return {
                //         width: video.style
                //     }
                // },

            }
        )


        
        // console.log(videoRef.current.style)
        scanner.start().catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        QrScanner.hasCamera()
            .then(has => {
                setPageState(has ? QrScannerPageState.HasCamera : QrScannerPageState.NoCamera)
                if (has) {
                    return QrScanner.listCameras(true)
                }
            })
            .then(res => { console.log(res) })
    })

    if (pageState === QrScannerPageState.HasCamera) {
        return (
            <div className="w-dvh h-dvh">
                {/* <div className="max-w-md h-screen object-cover"> */}
                    <video ref={videoRef} className="w-full h-full object-cover" ></video>

                {/* </div> */}
            </div>
        )
    }
}