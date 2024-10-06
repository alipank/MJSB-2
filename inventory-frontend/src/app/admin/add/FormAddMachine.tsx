'use client'

import { Brand } from "@/app/admin/add/page";
import { Autocomplete, AutocompleteItem, Button, image, Input, LinkIcon, Modal, ModalBody, ModalContent, ModalHeader, Textarea, useDisclosure, UseDisclosureProps } from "@nextui-org/react";
import { ChangeEvent, ChangeEventHandler, Dispatch, FormEvent, FormEventHandler, HTMLAttributes, Key, SetStateAction, useState } from "react";
import { NewBrand } from "./NewBrand";
import Image from "next/image";
import { readFileAsDataURL } from "../../utils/fileReader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faImage, faImages, faPlus, faPlusCircle, faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import { resizeImage } from "../../utils/resizeImage";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";


enum ImageType {
	Existing = 1,
	New = 2
  }
  
  interface FormImageData {
	id: number,
	type: ImageType
	src: File | string
  }

export type FormInputProps = {
	newImages: File[],
	deleteImages: number[],
	brandId: Key,
	model: string,
	boughtPrice: number,
	note: string
}

export type formControlProps = {
	newImages: File[], setNewImages: Dispatch<SetStateAction<File[]>>,
	deleteImages: number[], setDeleteImages: Dispatch<SetStateAction<number[]>>
	previews: string[], setPreviews: Dispatch<SetStateAction<string[]>>,
	brandId: Key, setBrandId: Dispatch<SetStateAction<Key>>,
	model: string, setModel: Dispatch<SetStateAction<string>>,
	boughtPrice: number, setBoughtPrice: Dispatch<SetStateAction<number>>
	note: string, setNote: Dispatch<SetStateAction<string>>
	onSubmit: (formInput: FormInputProps) => void
}

export type FormAddMachineProps = {
	brands: Brand[]
	formControl: formControlProps
}

export const useFormControl = (onSubmit: (formInput: FormInputProps) => void): formControlProps => {
	const [newImages, setNewImages] = useState<File[]>([])
	const [deleteImages, setDeleteImages] = useState<number[]>([])
	const [previews, setPreviews] = useState<string[]>([])
	const [brandId, setBrandId] = useState<Key>('')
	const [model, setModel] = useState<string>('')
	const [boughtPrice, setBoughtPrice] = useState<number>(0)
	const [note, setNote] = useState<string>('')

	return {
		newImages, setNewImages,
		deleteImages, setDeleteImages,
		previews, setPreviews,
		brandId, setBrandId,
		model, setModel,
		boughtPrice, setBoughtPrice,
		note, setNote,
		onSubmit
	}


}

export function FormAddMachine(props: FormAddMachineProps) {

	const formRoundness: string | undefined = 'rounded-lg'
	const { newImages, setNewImages, deleteImages, setDeleteImages, previews, setPreviews, brandId, setBrandId, model, setModel, boughtPrice, setBoughtPrice, note, setNote, onSubmit } = props.formControl
	// const [fileImages, setFileImages] = useState<File[]>([])
	// const [previews, setPreviews] = useState<string[]>([])
	// const [brandId, setBrandId] = useState<Key>("");
	// const [model, setModel] = useState("");
	// const [boughtPrice, setBoughtPrice] = useState(0);
	// const [note, setNote] = useState("");
	//test modal


	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	// const baseURL = "http://localhost:3002"

	async function handleImagesInput(e: ChangeEvent<HTMLInputElement>) {

		const selectedFiles = Array.from(e.target.files || [])

		setNewImages([...newImages, ...selectedFiles])

		//Handle Image Preview
		const newPreviews = await Promise.all(
			selectedFiles.map(async (file, i) => {
				const url = URL.createObjectURL(file)
				const resizedImageUrl = resizeImage(url, 600, 600, 0.9)
				
				const imageObj:FormImageData = {
					id:0,
					type:ImageType.New,
					src: await resizeImage(url, 600, 600, 0.9)
				}

				return imageObj
			})
		)

		setPreviews([...previews, ...newPreviews])
	}

	// function onSubmit() {
	// 	// event.preventDefault();

	// 	// const formData = new FormData(event.currentTarget);
	// 	formData.set("images", "") //reset images field to be used with useState value fileImages
	// 	formData.set("brand_id", brandId.toString());

	// 	fileImages.forEach((file) => {
	// 		formData.append("images", file)
	// 	})

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

	return (
		<div className="min-h-dvh flex justify-center items-center">
			<form className="*:mb-4 max-w-md w-full p-4 border-2 border-gray-200 rounded-3xl">
				<div className="block w-full overflow-x-auto">
					<div className="flex w-full flex-row-reverse justify-end gap-1">

						<label htmlFor="images" className={`flex justify-center items-center ${formRoundness} flex-col gap-1 flex-shrink-0 w-52 aspect-[3/2] text-foreground-500 border-2 border-default-200 hover:border-default-400 focus:border-default-foreground `}>
							<FontAwesomeIcon icon={faImage} size="xl" />
							<p>Tambahkan Foto</p>
						</label>
						<Input id="images" name="images" type="file" onChange={handleImagesInput} multiple accept="image/*" className="hidden" classNames={{
							// input: "h-full",
							// inputWrapper: "h-full",

						}}></Input>

						{
							previews.map((imageSrc, i) => {
								return (<Image key={i} src={imageSrc} alt="Your image" width={0} height={0} className="w-fit h-fit max-h-36 border-2 border-gray-200 rounded-2xl"></Image>)

							})
						}

					</div>
				</div>


				<div className={`flex gap-3 items-center`}>
					<Autocomplete
						name="brand_id"
						// placeholder="Brand Mesin Jahit"
						size="lg"
						variant="bordered"
						label="Brand"
						labelPlacement="inside"
						className={`max-w-72 rounded-md ${formRoundness}`}
						classNames={{
							selectorButton: "text-medium",
						}}
						inputProps={{
							required: true,
							classNames: {
								inputWrapper: `${formRoundness}`
							}
						}}
						onSelectionChange={(e) => {
							setBrandId(e || '');
							// console.log(e);
						}}
						listboxProps={{
							emptyContent: <><Button onPress={onOpen} variant="bordered" className="-m-2">+ Tambahkan Brand</Button></>

						}}>

						{props.brands.map((brand: any) => (
							<AutocompleteItem
								className="max-w-xs"
								key={brand.id}
								value={brand.id}
							>
								{brand.brand_name}
							</AutocompleteItem>
						))}

					</Autocomplete>
					<Button className="h-12 min-w-12 w-12 p-0" variant="bordered" onPress={onOpen}>
						<FontAwesomeIcon icon={faPlus} size="lg" />
					</Button>
				</div>

				<Input
					required
					name="model"
					onChange={(e) => {
						setModel(e.currentTarget.value);
					}}
					className={`max-w-72`}
					classNames={{
						'inputWrapper': `${formRoundness}`
					}}
					// placeholder="Model Mesin Jahit. Contoh: 8280, MYLOCK 3340"
					variant="bordered"
					size="lg"
					label="Model"
					labelPlacement="inside"
				/>
				<Input
					name="bought_price"
					className={`max-w-72`}
					classNames={{
						'inputWrapper': `${formRoundness}`
					}}
					onChange={(e) => setBoughtPrice(Number(e.currentTarget.value))}
					type="number"
					// placeholder="Model Mesin Jahit. Contoh: 8280, MYLOCK 3340"
					variant="bordered"
					size="lg"
					label="Bought Price"
					labelPlacement="inside"
					startContent={
						<div className="pointer-events-none items-center">
							<span className="text-default-500 ">Rp.</span>
						</div>
					}
				/>
				<Textarea
					name="note"
					classNames={{
						label: "text-medium", // to match regular input style
						inputWrapper: `${formRoundness}`
					}}
					onChange={(e) => setNote(e.currentTarget.value)}
					// placeholder="Catatan seperti: Butuh sparepart apa. mau diperbaiki bagaimana"
					variant="bordered"
					size="lg"
					label="Note"
					labelPlacement="inside"
				/>

				<Button onPress={() => {
					const formInput: FormInputProps = {
						newImages, deleteImages, brandId, model, boughtPrice, note
					}
					onSubmit(formInput)
				}}
					size="lg"
					color="primary"
					className="w-36 h-12 font-bold">Selesai</Button>
				<NewBrand isOpen={isOpen} onOpenChange={onOpenChange}></NewBrand>
			</form>
		</div>
	);
}