import { FolderData, PersitedFolder } from "./types"

export async function createFolder(store: LocalForage, name: string) {
	const folderId = await store.length()
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