'use client'

import { OffscreenCanvas } from "@/utils/OffscreenCanvasPolyfill";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { readBarcodesFromImageData, readBarcodesFromImageFile, ReadResult, type ReaderOptions } from "zxing-wasm/reader";



export default function Page() {

    const readerOptions: ReaderOptions = {
        tryHarder: false,
        formats: ["MicroQRCode"],

        // maxNumberOfSymbols: 1,
    };

    const router = useRouter()

    const [pageError, setPageError] = useState<Error>()
    const [result, setResult] = useState<ReadResult[]>([])
    const [resultErr, setResultErr] = useState<boolean>(false)

    const videoRef = useRef<HTMLVideoElement>(null)
    const [videoDimension, setVideoDimension] = useState<{
        cWidth: number,
        cHeight: number,
        videoToClientBoxDimensionScale: number,
        boxDimension:number
    }>({
        cWidth: 0,
        cHeight: 0,
        videoToClientBoxDimensionScale: 0,
        boxDimension:0
    })

    // const [scannerView, setScannerView] = useState<string>('')

    const startScanning = (video: HTMLVideoElement) => {

        const scannerArea = 2/3//relative to the shortest width ot height 

        const cWidth = video.clientWidth
        const cHeight = video.clientHeight
        const boxDimension = cHeight >= cWidth ? cWidth * scannerArea : cHeight * scannerArea

        const width = video.videoWidth
        const height = video.videoHeight
        const cropDimension = height >= width ? width * scannerArea : height *scannerArea


        setVideoDimension({
            cWidth: cWidth,
            cHeight: cHeight,
            videoToClientBoxDimensionScale : boxDimension / cropDimension,
            boxDimension
        })

        const cropX = width / 2 - cropDimension / 2
        const cropY = height / 2 - cropDimension / 2

        // console.log(cropX, cropY, (video.width/2) - (cropDimension/2), (video.height/2) - (cropDimension/2))
        console.log(video.videoWidth, video.videoHeight, video.clientWidth, video.clientHeight)

        const ctx = new OffscreenCanvas(cropDimension, cropDimension).getContext('2d') as OffscreenCanvasRenderingContext2D

        setInterval(() => {
            ctx.drawImage(video,
                cropX, cropY, cropDimension, cropDimension,
                0, 0, cropDimension, cropDimension
            )

            const imageData = ctx.getImageData(
                0, 0, cropDimension, cropDimension
            )

            readBarcodesFromImageData(imageData, readerOptions)
                .then((results) => {
                    setResult(results)
                    console.log('interval', results)
                })
                .catch(err => {
                    console.log(err)
                })

        }, 200)
    }
// awlanya akan memakai button untuk memulai scannya, namun saya mencoba menaidakan tombol agar mempermudah proses scan
    const buttonHandler = () => { 

        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: 'environment',
            }
        })
            .then((stream) => {
                const video = videoRef.current
                if (!video) return

                video.srcObject = stream

                video.onloadedmetadata = () => {
                    if (!video) return
                    video.play()
                        .then(() => {
                            startScanning(video)


                        })
                        .catch(err => console.log(err))
                }

            })
            .catch(err => {
                console.log(err)
                // setPageError(new Error(err))
            })
    }

    useEffect(() => {
        buttonHandler()
    }, [])

    useEffect(() => {
        if (result.length === 0) {
            setResultErr(false)
            return
        }

        if (result.length > 1) {
            setResultErr(true)
            return
        }

        // setResultErr(false)
        const split = result[0].text.split('-')

        console.log(split[0])

        if (split[0] !== 'MJSB' || (split[1] !== undefined ? split[1].match(/\D+/) : true)) {
            // console.log(split[0] !== 'MJSB' , split[1].match(/\D+/))
            setResultErr(true)
            return
        }
        
        router.push(`/admin/${split[1]}`)
        

    }, [result])

    // console.log(videoRef.current?.videoWidth)
    // console.log(Math.round((videoRef.current?.videoWidth || 0) / 3))
    // console.log(Math.round(1000/4))



    return (
        <div className="fixed">
            {/* <Button onPress={buttonHandler}>
        Click Nigga
      </Button> */}
            {/* {videoRef.current.videoWidth} */}
            {
                !pageError ? (
                    <div className="relative h-dvh">
                        <div
                            className={`absolute border-2 border-slate-600  aspect-square`}
                            style={{
                                width: `${videoDimension.boxDimension}px`,
                                left: `${Math.round((videoDimension.cWidth / 2) - (videoDimension.boxDimension / 2))}px`,
                                top: `${Math.round((videoDimension.cHeight / 2) - (videoDimension.boxDimension / 2))}px`

                            }}
                        >
                            <div className="relative *:absolute">
                                {result.map(i => {
                                    const pos = i.position
                                    const rot = i.orientation
                                    const scale = videoDimension.videoToClientBoxDimensionScale

                                    const checkRot = rot <= 90 && rot >= -90 

                                    console.log(checkRot)

                                    const mostL = checkRot ? Math.min(pos.topLeft.x, pos.bottomLeft.x) * scale : Math.max(pos.topLeft.x, pos.bottomLeft.x) * scale
                                    const mostR = checkRot ? Math.max(pos.topRight.x, pos.bottomRight.x) * scale : Math.min(pos.topRight.x, pos.bottomRight.x) * scale
                                    const mostT = checkRot ? Math.min(pos.topLeft.y, pos.topRight.y) * scale : Math.max(pos.topLeft.y, pos.topRight.y) * scale
                                    const mostB = checkRot ? Math.max(pos.bottomLeft.y, pos.bottomRight.y) * scale : Math.min(pos.bottomLeft.y, pos.bottomRight.y) * scale 

                                    // const qrBoxWidth = mostR - mostL 
                                    // const qrBoxHeight = mostB - mostT 

                                    const qrBoxWidth = checkRot ? mostR - mostL : mostL - mostR
                                    const qrBoxHeight = checkRot ? mostB - mostT : mostT - mostB 

                                    const qrCenterX = (checkRot ? mostR : mostL) - qrBoxWidth / 2
                                    const qrCenterY = (checkRot? mostB : mostT) - qrBoxHeight / 2

                                    console.log(mostL, mostT, mostR, mostB)

                                    return (
                                        <>
                                            <div id={i.text} className={`border-4 scale-150 -translate-y-1/2 -translate-x-1/2 ${resultErr ? 'border-red-500' : 'border-white'}`} style={{
                                                width: qrBoxWidth,
                                                height: qrBoxHeight,
                                                top: qrCenterY,
                                                left: qrCenterX
                                            }}>

                                            </div>

                                            <div className="bg-red-500 size-2" style={{
                                                left: mostL,
                                                top: mostT
                                            }}></div>
                                            <div className="bg-yellow-500 size-2" style={{
                                                left: mostL,
                                                top: mostB
                                            }}></div>
                                            <div className="bg-green-500 size-2" style={{
                                                left: mostR,
                                                top: mostT
                                            }}></div>
                                            <div className="bg-blue-500 size-2" style={{
                                                left: mostR,
                                                top: mostB
                                            }}></div>

                        
                                        </>
                                    )
                                })}
                            </div>
                        </div>



                        <video className="h-full object-cover" ref={videoRef} playsInline autoPlay muted></video>
                    </div>
                ) : (
                    <p>{pageError?.message} Hi</p>
                )
            }
        </div>
    )
}