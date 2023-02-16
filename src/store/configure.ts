import localForage from 'localforage'
import { DEFAULT_FOLDER_ID, DEFAULT_FOLDER_NAME } from '../Constants'
import { FolderData } from './types'

async function createDefaultFolderIfNotExists(store: LocalForage) {
		const result = await store.iterate((value: FolderData, key: string) => {
			if (value.name === DEFAULT_FOLDER_NAME) {
				return key
			}
		})
		if (result) {
			return result
		}

		if (!result) {
			await store.setItem<FolderData>(DEFAULT_FOLDER_ID, { name: DEFAULT_FOLDER_NAME, images: [] })
		}

		return DEFAULT_FOLDER_ID
}

export const initializeStore = async () => {
	const store = localForage.createInstance({ name: 'photoStore' })
	const defaultFolderId = await createDefaultFolderIfNotExists(store)

	return { store, defaultFolderId }
}
