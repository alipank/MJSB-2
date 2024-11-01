import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@nextui-org/react"
import Image from "next/image"

export default function Preview() {
    return (
        <div className="relative min-h-dvh flex justify-center items-center">
            <div className="*:mb-4 max-w-md w-full p-4 border-2 border-gray-200 rounded-3xl">
                <div className="relative block -mx-4 w-auto overflow-x-auto scrollbar-hide">
                    <div className="flex w-full flex-row-reverse justify-end gap-1 *:flex-shrink-0">
                        {
                            previews.map((imageSrc, i) => {
                                if (typeof imageSrc.src == 'string') {

                                    const key = imageSrc.type + imageSrc.id

                                    return (
                                        <div key={imageSrc.getKey()} className="relative">
                                            <Button data-img-id={imageSrc.id} data-img-type={imageSrc.type} className="absolute p-0 m-2 min-w-8 w-8 h-8 rounded-full bg-[#00000077]" onClick={handleImageDelete}>
                                                <FontAwesomeIcon icon={faXmark} className="text-slate-200" />
                                            </Button>
                                            <Image key={imageSrc.getKey()} src={imageSrc.src} alt="Your image" width={1} height={1} className={`w-fit h-36 border-2 border-gray-200 ${formRoundness}`} />
                                        </div>
                                    )

                                } else {
                                    console.log(typeof imageSrc.src, "Seharusnya type imageSrc.src adalah string")
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}