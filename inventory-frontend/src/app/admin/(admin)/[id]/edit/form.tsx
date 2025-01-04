'use client'

import { MachineDetails } from "@/models/machines/MachineDetails"
import { FormMachine, useFormControl } from "../../../../../components/Form"
import { useContext, useEffect } from "react"
import { ImageType } from "@/models/machines/FormImageData"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FormImageDataURL, FormInputProps } from "@/models/machines/MachineProps"
import { baseURL } from "@/utils/constants"
import { toast } from "react-toastify"
import { Brand } from "../../add/page"
import { ReadyContext } from "../ReadySwitch"
import { putMachine } from "@/utils/alterData"





export default function Form(props: { brands: Brand[], machineDetails: MachineDetails }) {

  const readyCtx = useContext(ReadyContext)

  const machineId = props.machineDetails.id

  const router = useRouter()

  const onSubmit = (formInput: FormInputProps) => {
    const { ready, ...restFormInput } = formInput

    // const formData = new FormData()

    // newImages.forEach(file => {
    //   formData.append("new_images[]", file)
    // })
    // deleteImages.forEach((id, i) => {
    //   formData.append(`delete_images_id[]`, id.toString())
    // })
    // formData.append("brand_id", brandId.toString())
    // formData.append("model", model)
    // formData.append("bought_price", boughtPrice)
    // formData.append("note", note)
    // formData.append('is_ready', ready ? '1' : '0')

    // console.log(newImages, deleteImages, brandId, model, boughtPrice, note, ready)


    // fetch(
    //   baseURL + "/admin/" + machineId,
    //   {
    //     // headers: { "Content-Type": "multipart/form-data" },  
    //     method: "PUT",
    //     body: formData,
    //   })
    putMachine({...restFormInput, machineId})
      .then(async (res) => {
        console.log(await res.json())
        if (!res.ok) {throw res.status}
        toast.success("Edited Successfully")
        router.replace(`/admin/${machineId}`)

      })
      .catch((err) => {
        toast.error("Failed to edit the item")

        console.log(err)
      });
  }
  const formControl = useFormControl((formInput) => { onSubmit(formInput) })


  useEffect(() => {

    const details: MachineDetails = props.machineDetails

    const existingImages: FormImageDataURL[] = details.images.map((img) => (
      new FormImageDataURL(img.image_id, ImageType.Existing, baseURL + '/images/' + img.image_path)
    ))


    console.log("monitor formControl useEffect")
    formControl.setPreviews(existingImages)
    formControl.setBrandId(details.brand_id)
    formControl.setModel(details.model)
    formControl.setBoughtPrice(details.bought_price.toString())
    formControl.setNote(details.note)
    formControl.setReady(details.is_ready)

    readyCtx.ready = details.is_ready

  }, [props.machineDetails])


  return (
    <FormMachine brands={props.brands} formControl={formControl} submitText="Save Changes" hideReadyField />
  )
}