'use client'

import { Brand } from "@/app/admin/add/page";
import { Autocomplete, AutocompleteItem, Button, image, Input, LinkIcon, Modal, ModalBody, ModalContent, ModalHeader, Textarea, useDisclosure, UseDisclosureProps } from "@nextui-org/react";
import { ChangeEvent, ChangeEventHandler, Dispatch, FormEvent, FormEventHandler, HTMLAttributes, Key, SetStateAction, useEffect, useMemo, useState } from "react";
import { NewBrand } from "./NewBrand";
import Image from "next/image";
import { readFileAsDataURL } from "../app/utils/fileReader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faImage, faImages, faPlus, faPlusCircle, faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import { resizeImage } from "../app/utils/resizeImage";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { inherits } from "util";
import randomInt from "@/app/utils/randomInt";
import useStateMax from "@/app/utils/useStateMax";
import { register } from "module";
import { Label } from "./Label";


export enum ImageType {
	Existing = 1,
	New = 2
}

interface FormImageDataFile {
	id: number,
	type: ImageType
	src: File
}

export interface FormImageDataURL {
	id: number,
	type: ImageType
	src: string
}

export class FormImageDataURL {
	public constructor(id: number, type: ImageType, src: string) {
		this.id = id
		this.type = type
		this.src = src
	}

	//for react list key
	public getKey(): number {
		return Number(this.type.toString() + this.id)
	}
}

export type FormInputProps = {
	newImages: File[],
	deleteImages: number[],
	brandId: Key,
	model: string,
	boughtPrice: string,
	note: string
}

export type formControlProps = {
	newImages: FormImageDataFile[], setNewImages: Dispatch<SetStateAction<FormImageDataFile[]>>,

	deleteImages: number[],

	/**
	 * state to store images that are to be deleted, this state is only used for the existing images (images that has been stored in the server), then you want to delete it
	 */
	setDeleteImages: Dispatch<SetStateAction<number[]>>
	previews: FormImageDataURL[], setPreviews: Dispatch<SetStateAction<FormImageDataURL[]>>,
	brandId: Key, setBrandId: Dispatch<SetStateAction<Key>>,
	model: string, setModel: Dispatch<SetStateAction<string>>,
	boughtPrice: string, setBoughtPrice: Dispatch<SetStateAction<string>>
	note: string, setNote: Dispatch<SetStateAction<string>>
	onSubmit: (formInput: FormInputProps) => void
}

export type FormMachineProps = {
	brands: Brand[]
	formControl: formControlProps
}

export const useFormControl = (onSubmit: (formInput: FormInputProps) => void): formControlProps => {
	const [newImages, setNewImages] = useState<FormImageDataFile[]>([])
	const [deleteImages, setDeleteImages] = useState<number[]>([])
	const [previews, setPreviews] = useState<FormImageDataURL[]>([])
	// const [previews, addPreviews, subPreviews] = useStateMax(10, () => {})
	const [brandId, setBrandId] = useState<Key>('')
	const [model, setModel] = useState<string>('')
	const [boughtPrice, setBoughtPrice] = useState<string>('')
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

const randomId: { usedIds: number[], generate: () => number } = {
	usedIds: [],
	generate: () => {
		let rand
		do {
			rand = randomInt(1000)
			console.log(rand)
		} while (
			randomId.usedIds.includes(rand)
		)
		randomId.usedIds.push(rand)
		return rand
	}
}

export function FormMachine(props: FormMachineProps) {

	const formRoundness: string | undefined = 'rounded-lg'
	const { newImages, setNewImages, deleteImages, setDeleteImages, previews, setPreviews, brandId, setBrandId, model, setModel, boughtPrice, setBoughtPrice, note, setNote, onSubmit } = props.formControl
	// const [fileImages, setFileImages] = useState<File[]>([])
	// const [previews, setPreviews] = useState<string[]>([])
	// const [brandId, setBrandId] = useState<Key>("");
	// const [model, setModel] = useState("");
	// const [boughtPrice, setBoughtPrice] = useState(0);
	// const [note, setNote] = useState("");
	//test modal


	// const baseURL = "http://localhost:3002"

	async function handleImagesInput(e: ChangeEvent<HTMLInputElement>) {

		const selectedFiles = Array
			.from(e.target.files || [])
			.map(file => (
				{
					id: randomId.generate(),
					type: ImageType.New,
					src: file
				} as FormImageDataFile
			))

		setNewImages([...newImages, ...selectedFiles])

		//Handle Image Preview
		const newPreviews = await Promise.all(
			selectedFiles.map(async (imageData, i) => {

				const url = URL.createObjectURL(imageData.src)
				const resizedImageUrl = resizeImage(url, 600, 600, 0.9)


				const imageObj: FormImageDataURL = new FormImageDataURL(
					imageData.id,
					imageData.type,
					await resizedImageUrl,

				)

				return imageObj


			})
		)

		e.target.value = ""
		setPreviews([...previews, ...newPreviews])
	}

	function handleImageDelete(e: React.MouseEvent<HTMLButtonElement>) {
		const id = Number(e.currentTarget.getAttribute('data-img-id'))
		const type = e.currentTarget.getAttribute('data-img-type')

		console.log(id, type)

		const filteredPreviews = previews.filter(img => img.id !== id)


		if (type === ImageType.Existing.toString()) {
			setPreviews(filteredPreviews)
			setDeleteImages([...deleteImages, id])
		}
		if (type === ImageType.New.toString()) {
			const filteredNewImages = newImages.filter(img => img.id !== id)
			setPreviews(filteredPreviews)
			setNewImages(filteredNewImages)
		}

	}

	const Required = (value: any) => useMemo(() => {
		return !Boolean(value)
	}, [value])

	const isInvalid = {
		images: Required(previews.length),
		brandId: Required(brandId),
		model: Required(model),
		boughtPrice: Required(boughtPrice),
		note: Required(note)
	}

	const [touched, setTouched] = useState({
		image: false,
		brandId: false,
		model: false,
		boughtPrice: false,
		note: false,
	})

	const handleTouched = (set: 'image' | 'brandId' | 'model' | 'boughtPrice' | 'note') => {
		setTouched((prevState) => ({
			...prevState,
			[set]: true
		}))
	}

	// const [errorFinish, setErrorFinish] = useState<boolean>(false)

	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const areFieldsValid = !Object.values(isInvalid).includes(true)
	const [btnTouched, setBtnTouched] = useState(false)

	// useEffect(() => {
	// 	if (disableFinish) {
	// 		console.log("set finish")
	// 		setDisableFinish(false)
	// 	}
	// 	console.log('useEffect')
	// }, [areFieldsValid])

	return (
		<div className="min-h-dvh flex justify-center items-center">
			<form className="*:mb-4 max-w-md w-full p-4 border-2 border-gray-200 rounded-3xl">
				<div className="block w-full overflow-x-auto">
					<div className="flex w-full flex-row-reverse justify-end gap-1 *:flex-shrink-0">

						<Label htmlFor="images" isInvalid={isInvalid.images && touched.image} className={`flex justify-center items-center ${formRoundness} flex-col gap-1 w-52 aspect-[3/2] text-foreground-500 border-2 border-default-200 hover:border-default-400 focus:border-default-foreground `}>
							<FontAwesomeIcon icon={faImage} size="xl" />
							<p>Tambahkan Foto</p>
						</Label>
						<Input isInvalid={isInvalid.images} id="images" name="images" type="file" onChange={handleImagesInput} multiple accept="image/*" className="hidden" classNames={{
							// input: "h-full",
							// inputWrapper: "h-full",

						}}></Input>

						{
							previews.map((imageSrc, i) => {
								if (typeof imageSrc.src == 'string') {

									const key = imageSrc.type + imageSrc.id

									return (
										<div key={imageSrc.getKey()} >
											<Button data-img-id={imageSrc.id} data-img-type={imageSrc.type} className="absolute p-0 min-w-8 w-8 h-8 rounded-full" onClick={handleImageDelete}>Del</Button>
											<Image key={imageSrc.getKey()} src={imageSrc.src} alt="Your image" width={1} height={1} className="w-fit h-36 border-2 border-gray-200 rounded-2xl" />
										</div>
									)

								} else {
									console.log(typeof imageSrc.src, "Seharusnya type imageSrc.src adalah string")
								}
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
						description="Pilih merek Mesin Jahitnya"
						inputProps={{
							classNames: {
								inputWrapper: `${formRoundness}`
							}
						}}
						onSelectionChange={(e) => {
							setBrandId(e || '');
							// console.log(e);
						}}
						selectedKey={brandId.toString()}
						listboxProps={{
							emptyContent: <><Button onPress={onOpen} variant="bordered" className="-m-2">+ Tambahkan Brand</Button></>

						}}
						onClose={() => { handleTouched("brandId") }}
						errorMessage="Harap pilih merek Mesin Jahitnya yang betul"
						isInvalid={touched.brandId && isInvalid.brandId}
					>

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
					name="model"
					onChange={(e) => {
						setModel(e.currentTarget.value);
					}}
					className={`max-w-72 `}
					classNames={{
						'inputWrapper': `${formRoundness}`
					}}
					value={model}
					// placeholder="Model Mesin Jahit. Contoh: 8280, MYLOCK 3340"
					variant="bordered"
					size="lg"
					label="Model"
					labelPlacement="inside"
					onBlur={() => {
						handleTouched("model")
						// console.log(isInvalid)
					}}
					isInvalid={isInvalid.model && touched.model}
					errorMessage="Wajib diisi"
				/>
				<Input
					name="bought_price"
					className={`max-w-72`}
					classNames={{
						'inputWrapper': `${formRoundness}`
					}}
					inputMode="numeric"
					value={boughtPrice.toString()}
					onChange={(e) => {
						setBoughtPrice(e.currentTarget.value.match(/\D+/) ? boughtPrice : e.currentTarget.value)

					}}
					type="text"
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
					onBlur={() => { handleTouched('boughtPrice') }}
					isInvalid={isInvalid.boughtPrice && touched.boughtPrice}
					errorMessage="Wajib diisi"
				/>
				<Textarea
					name="note"
					classNames={{
						label: "text-medium", // to match regular input style
						inputWrapper: `${formRoundness}`
					}}
					value={note}
					onChange={(e) => setNote(e.currentTarget.value)}
					placeholder="Catatan: Butuh sparepart apa. mau diperbaiki bagaimana."
					variant="bordered"
					size="lg"
					label="Note"
					labelPlacement="inside"
					isInvalid={isInvalid.note && touched.note}
					errorMessage='Wajib diisi'
				/>

				<div className="flex flex-row items-center gap-2">
					<Button onPress={() => {
						const newImagesFile = newImages.map(img => img.src)
						setBtnTouched(true)
						const formInput: FormInputProps = {
							newImages: newImagesFile, deleteImages, brandId, model, boughtPrice, note
						}
						if (areFieldsValid) {
							onSubmit(formInput)
						} else {
							Object.keys(touched).forEach((key) => {
								setTouched((prevState) => ({
									...prevState,
									[key]: true
								}))
							})
						}
					}}
						size="lg"
						color={!areFieldsValid && btnTouched ? "danger" : "primary"}
						className="w-36 h-12 font-bold">Selesai
					</Button>
					<p className="text-xs text-danger" hidden={!(!areFieldsValid && btnTouched)}>Isi Semua Kolom Dulu</p>
				</div>
				<NewBrand isOpen={isOpen} onOpenChange={onOpenChange}></NewBrand>
			</form>
		</div>
	);
}