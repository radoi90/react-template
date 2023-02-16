export type FolderData = {
	name: string
	images: string[]
}

export type PersitedFolder = FolderData & { id: string }