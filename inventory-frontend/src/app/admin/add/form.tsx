'use client'

import { FormMachine, FormInputProps, useFormControl } from "../../../components/Form"
import { Brand } from "./page"



export default function Form(props: { brands: Brand[] }) {

  const onSubmit = (formInput: FormInputProps) => {
    const { newImages, deleteImages, brandId, model, boughtPrice, note } = formInput

    // 	// const formData = new FormData(event.currentTarget);
    // 	formData.set("images", "") //reset images field to be used with useState value fileImages
    // 	formData.set("brand_id", brandId.toString());

    // 	fileImages.forEach((file) => {
    // 		formData.append("images", file)
    // 	})


    // const formData = {
    //   new_images: newImages,
    //   brand_id: brandId,
    //   model: model,
    //   bought_price: boughtPrice,
    //   note: note
    // }

    const formData = new FormData()


    newImages.forEach(file => {
      formData.append("new_images[]", file)
    })

    formData.append("brand_id", brandId.toString())
    formData.append("model", model)
    formData.append("bought_price", boughtPrice)
    formData.append("note", note)

    console.log(formData)

    const baseURL = "http://localhost:3002"

    fetch(
      baseURL + "/admin",
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
    <FormMachine brands={props.brands} formControl={formControl} />
  )
}