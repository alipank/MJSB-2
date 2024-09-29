'use client'

import { Brand } from "@/app/admin/page";
import { Autocomplete, AutocompleteItem, Button, image, Input, LinkIcon, Modal, ModalBody, ModalContent, ModalHeader, Textarea, useDisclosure, UseDisclosureProps } from "@nextui-org/react";
import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, Key, useState } from "react";
import { NewBrand } from "./NewBrand";
import Image from "next/image";
import { readFileAsDataURL } from "../utils/fileReader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faImages } from "@fortawesome/free-solid-svg-icons";

type FormAddMachineProps = {
	brands: Brand[]
}

export function FormAddMachine(props: FormAddMachineProps) {
	const [fileImages, setFileImages] = useState<File[]>([])
	const [previews, setPreviews] = useState<string[]>([])
	const [brandId, setBrandId] = useState<Key>("");
	const [model, setModel] = useState("");
	const [boughtPrice, setBoughtPrice] = useState(0);
	const [note, setNote] = useState("");
	//test modal

	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const baseURL = "http://localhost:3002"

	async function handleImagesInput(e: ChangeEvent<HTMLInputElement>) {

		const selectedFiles = Array.from(e.target.files || [])

		setFileImages([...fileImages, ...selectedFiles])

		//Handle Image Preview
		const newPreviews = await Promise.all(
			selectedFiles.map(async (file, i) => {
				return readFileAsDataURL(file)
					.then((src) => {
						console.log("lapor pakss", i)

						return src ? src.toString() : "There was nothing"
					})
					.catch(err => {
						throw Error(err)
					})
			})
		)

		setPreviews([...previews, ...newPreviews])
		// setImages([...images, ...newImages])
	}

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		formData.set("images", "") //reset images field to be used with useState value fileImages
		formData.set("brand_id", brandId.toString());

		fileImages.forEach((file) => {
			formData.append("images", file)
		})

		fetch(
			baseURL + "/admin/machines",
			// "http://192.168.172.87:3002/admin/machines",
			{
				// headers: { "Content-Type": "multipart/form-data" },
				method: "POST",
				body: formData,
			})
			.then(async (res) => {
				console.log(await res.json())
				// setBrandId(undefined)

			})
			.catch((err) => console.log(err));
	}

	return (
		<form onSubmit={onSubmit} className="*:mb-11 m-6">
			<div className="flex">
				{
					previews.map((imageSrc, i) => {
						return (<Image key={i} src={imageSrc} alt="Your image" width={0} height={0} className="w-4/5 max-w-52 aspect-square object-cover"></Image>)

					})
				}
				<label htmlFor="images" className="w-4/5 max-w-52 aspect-square bg-slate-200 border-4 border-slate-500">
					<FontAwesomeIcon icon={faImage} />
				</label>
				<Input id="images" name="images" type="file" onChange={handleImagesInput} multiple accept="image/*" className="w-4/5 max-w-52 aspect-square hidden" classNames={{
					// input: "h-full",
					// inputWrapper: "h-full",

				}}></Input>

			</div>


			<div className="flex w-full flex-wrap gap-4">
				<Autocomplete
					name="brand_id"
					placeholder="Brand Mesin Jahit"
					size="lg"
					variant="bordered"
					label="Brand"
					labelPlacement="outside"
					className="w-64"
					classNames={{ selectorButton: "text-medium" }}
					onSelectionChange={(e) => {
						setBrandId(e || '');
						// console.log(e);
					}}
					listboxProps={{
						emptyContent: <><Button onPress={onOpen} variant="bordered" className="-m-2">+ Tambahkan Brand</Button></>
					}}
				// onInputChange={e => console.log(e)}
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
			</div>

			<Input
				name="model"
				onChange={(e) => {
					setModel(e.currentTarget.value);
				}}
				className="w-64"
				placeholder="Model Mesin Jahit. Contoh: 8280, MYLOCK 3340"
				variant="bordered"
				size="lg"
				label="Model"
				labelPlacement="outside"
			/>
			<Input
				name="bought_price"
				className="w-72"
				onChange={(e) => setBoughtPrice(Number(e.currentTarget.value))}
				type="number"
				placeholder="Model Mesin Jahit. Contoh: 8280, MYLOCK 3340"
				variant="bordered"
				size="lg"
				label="Bought Price"
				labelPlacement="outside"
				startContent={
					<div className="pointer-events-none items-center">
						<span className="text-default-500 ">Rp.</span>
					</div>
				}
			/>
			<Textarea
				name="note"
				onChange={(e) => setNote(e.currentTarget.value)}
				placeholder="Catatan seperti: Butuh sparepart apa. mau diperbaiki bagaimana"
				variant="bordered"
				size="lg"
				label="Note"
				labelPlacement="outside"
				classNames={{
					label: "text-medium -mt-8", // to match regular input style
				}}
			/>

      //test modal
			<Button onPress={onOpen}>Open Modal</Button>

			<Button type="submit" size="lg" variant="bordered" className="w-36 h-12 bg-sky-600 text-slate-50 font-bold">Selesai</Button>
			<NewBrand isOpen={isOpen} onOpenChange={onOpenChange}></NewBrand>
		</form>
	);
}