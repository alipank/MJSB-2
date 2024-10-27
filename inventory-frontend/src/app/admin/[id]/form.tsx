'use client'

import { MachineDetails } from "@/models/machineDetails"
import { FormImageDataURL, FormInputProps, FormMachine, useFormControl } from "../../../components/Form"
import { Brand } from "./page"
import { useEffect } from "react"
import { ImageType } from "@/models/FormImageData"



export default function Form(props: { brands: Brand[], machineDetails: MachineDetails }) {

  const baseURL = "http://localhost:3002"


  const onSubmit = (formInput: FormInputProps) => {
    const { newImages, deleteImages, brandId, model, boughtPrice, note } = formInput

    const formData = new FormData()

    newImages.forEach((file, i) => {
      formData.append(`new_images[]`, file)
    })
    deleteImages.forEach((id, i) => {
      formData.append(`delete_images_id[]`, id.toString())
    }) 
    formData.append("brand_id", brandId.toString())
    formData.append("model", model)
    formData.append("bought_price", boughtPrice)
    formData.append("note", note)

    console.log(newImages, deleteImages, brandId, model, boughtPrice, note)


    fetch(
      baseURL + "/admin/" + props.machineDetails.id,
      {
        // headers: { "Content-Type": "multipart/form-data" },  
        method: "PUT",
        body: formData,
      })
      .then(async (res) => {
        console.log(await res.json())
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
  }, [props.machineDetails])

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