'use client'

import { FormAddMachine, FormInputProps, useFormControl } from "../../../components/Form"
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


    const formData = {

    }

    // 	fetch(
    // 		baseURL + "/admin/machines",
    // 		{
    // 			// headers: { "Content-Type": "multipart/form-data" },
    // 			method: "POST",
    // 			body: formData,
    // 		})
    // 		.then(async (res) => {
    // 			console.log(await res.json())
    // 		})
    // 		.catch((err) => console.log(err));
    // }

    console.log(formInput)
  }

  const formControl = useFormControl((formInput) => { onSubmit(formInput) })


  // untuk form edit
  //formControl.setPreviews([])

  return (
    <FormAddMachine brands={props.brands} formControl={formControl} />
  )
}