export enum ImageType {
	Existing = 1,
	New = 2
}

export interface FormImageDataFile {
	id: number,
	type: ImageType
	src: File
}

export interface FormImageDataURL {
	id: number,
	type: ImageType
	src: string
}
