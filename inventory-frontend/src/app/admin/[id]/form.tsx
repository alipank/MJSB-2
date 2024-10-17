'use client'

import { MachineDetails } from "@/models/machineDetails"
import { FormAddMachine, FormInputProps, useFormControl } from "../../../components/Form"
import { Brand } from "./page"



export default function Form(props: { brands: Brand[], machineDetails: MachineDetails}) {

  const onSubmit = (formInput: FormInputProps) => {
    const { newImages, deleteImages, brandId, model, boughtPrice, note } = formInput

    const formData = new FormData()

    newImages.forEach(file => {
      formData.append("new_images", file)
    })

    formData.append("brand_id", brandId.toString())
    formData.append("model", model)
    formData.append("bought_price", boughtPrice.toString())
    formData.append("note", note)

    console.log(formData)

    const baseURL = "http://localhost:3002"

    fetch(
      baseURL + "/admin/machines",
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


// untuk form edit
//formControl.setPreviews([])

return (
  <FormAddMachine brands={props.brands} formControl={formControl} />
)
}