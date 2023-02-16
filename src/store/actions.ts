import { FolderData, PersitedFolder } from "./types"

export async function createFolder(store: LocalForage, name: string) {
	const folderId = await (await store.length()).toString()
	await store.setItem<FolderData>(folderId.toString(), { name, images: [] })
	return folderId
}

export async function renameFolder(store: LocalForage, folderId: string, name: string) {
	const folder = await store.getItem<FolderData>(folderId)
	if (folder !== null) {
		store.setItem<FolderData>(folderId, { ...folder, name })
	}
}

export async function saveImage(store: LocalForage, folderId: string, image: string) {
	const folder = await store.getItem<FolderData>(folderId)
	console.log({ folder, folderId })
	if (folder !== null) {
		store.setItem<FolderData>(folderId, { ...folder, images: [...folder.images, image] })
	}
}

export async function getAllFolders(store: LocalForage): Promise<PersitedFolder[]> {
	const folders: PersitedFolder[] = []
	await store.iterate((value: FolderData, key) => {
		folders.push({ id: key, ...value })
	})

	return folders
}

export async function moveImage(store: LocalForage, image: string, sourceFolderId: string, destinationFolderId: string) {
	const sourceFolder = await store.getItem<FolderData>(sourceFolderId)

	if (sourceFolder !== null) {
		const sourceImages = sourceFolder.images.filter(img => img !== image)
		store.setItem<FolderData>(sourceFolderId, { ...sourceFolder, images: sourceImages })
	}

	if (destinationFolderId !== null) {
		const destinationFolder = await store.getItem<FolderData>(destinationFolderId)

		if (destinationFolder !== null) {
			store.setItem<FolderData>(destinationFolderId, { ...destinationFolder, images: [...destinationFolder.images, image] })
		}
	}
}