import { Dispatch, Key, ReactElement, SetStateAction } from "react";
import { FormImageDataFile, ImageType, FormImageDataURL as IFormImageDataURL } from "./FormImageData";
import { Brand } from "@/app/admin/add/page";


export class FormImageDataURL implements IFormImageDataURL {
	public constructor(id: number, type: ImageType, src: string) {
		this.id = id
		this.type = type
		this.src = src
	}
	id: number;
	type: ImageType;
	src: string;

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
	note: string,
	ready: boolean
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
	note: string, setNote: Dispatch<SetStateAction<string>>,
	ready: boolean, setReady: Dispatch<SetStateAction<boolean>>
	onSubmit: (formInput: FormInputProps) => void
}

export interface PreviewMachineProps  {
	brands: Brand[]
	formControl: formControlProps
}

export interface FormMachineProps extends PreviewMachineProps {
	submitText: string
	deleteButton?: ReactElement

}