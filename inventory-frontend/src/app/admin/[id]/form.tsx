'use client'

import { ImageDetails, MachineDetails } from "@/models/machineDetails"
import { FormImageDataURL, FormInputProps, FormMachine, ImageType, useFormControl } from "../../../components/Form"
import { Brand } from "./page"
import { useEffect } from "react"



export default function Form(props: { brands: Brand[], machineDetails: MachineDetails }) {
  const details: MachineDetails = props.machineDetails

  const onSubmit = (formInput: FormInputProps) => {
    const { newImages, deleteImages, brandId, model, boughtPrice, note } = formInput

    const formData = new FormData()

    newImages.forEach(file => {
      formData.append("new_images", file)
    })

    formData.append("brand_id", brandId.toString())
    formData.append("model", model)
    formData.append("bought_price", boughtPrice)
    formData.append("note", note)

    console.log(formData)

    const baseURL = "http://localhost:3002"

    fetch(
      baseURL + "/admin/",
      {
        // headers: { "Content-Type": "multipart/form-data" },  
        method: "POST",
        body: formData,
      })
      .then(async (res) => {
        console.log(await res.json())
      })
      .catch((err) => console.log(err));
  }
  const formControl = useFormControl((formInput) => { onSubmit(formInput) })

  useEffect(() => {
    // formControl.setBrandId(details.brand_id)
    formControl.setBrandId(details.brand_id)
    formControl.setModel(details.model)
    formControl.setBoughtPrice(details.bought_price.toString())
    formControl.setNote(details.note)
    


  }, [])

  // formControl.setModel(details.model)
  // formControl.setNote(details.note)
  // formControl.setPreviews(
  //   details.images.map((img:ImageDetails) => (
  //     new FormImageDataURL(img.image_id, ImageType.Existing, img.image_path)
  //   ))
  // )


  // untuk form edit
  //formControl.setPreviews([])

  return (
    <FormMachine brands={props.brands} formControl={formControl} />
  )
}