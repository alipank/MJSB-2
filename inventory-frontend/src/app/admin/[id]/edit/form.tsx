'use client'

import { MachineDetails } from "@/models/MachineDetails"
import { FormMachine, useFormControl } from "../../../../components/Form"
import { Brand } from "./page"
import { useEffect } from "react"
import { ImageType } from "@/models/FormImageData"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FormImageDataURL, FormInputProps } from "@/models/MachineProps"



export default function Form(props: { brands: Brand[], machineDetails: MachineDetails }) {

  const baseURL = "http://localhost:3002"

  const pathname = usePathname()

  const router = useRouter()

  const onSubmit = (formInput: FormInputProps) => {
    const { newImages, deleteImages, brandId, model, boughtPrice, note, ready } = formInput

    const formData = new FormData()

    newImages.forEach(file => {
      formData.append("new_images[]", file)
    })
    deleteImages.forEach((id, i) => {
      formData.append(`delete_images_id[]`, id.toString())
    })
    formData.append("brand_id", brandId.toString())
    formData.append("model", model)
    formData.append("bought_price", boughtPrice)
    formData.append("note", note)
    formData.append('is_ready', ready ? '1' : '0')

    console.log(newImages, deleteImages, brandId, model, boughtPrice, note, ready)


    fetch(
      baseURL + "/admin/" + props.machineDetails.id,
      {
        // headers: { "Content-Type": "multipart/form-data" },  
        method: "PUT",
        body: formData,
      })
      .then(async (res) => {
        console.log(await res.json())
        router.push('/admin/add')

      })
      .catch((err) => console.log(err));
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
  }, [props.machineDetails])

  // const deleteButton = <Button size="lg" color="danger" variant="flat" className="min-w-12 w-14 h-12 p-0" onPress={() => {
  //   console.log(pathname.split('/'))
  //   fetch(
  //     baseURL + '/admin/' + pathname.split('/').at(-1),
  //     {
  //       method: 'DELETE'
  //     }
  //   ).then(
  //     () => { console.log("DELETEEED") }
  //   ).catch(
  //     (err) => { console.log(err) }
  //   )
  // }}>
  //   <FontAwesomeIcon icon={faTrash} />
  // </Button >

  return (
    // <div className="flex flex-col items-center">
      <FormMachine brands={props.brands} formControl={formControl} submitText="Save Changes" hideReadyField/>
    // </div>
  )
}