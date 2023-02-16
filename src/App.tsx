import React, {
	ChangeEvent,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'
import './App.css'
import AddButton from './components/AddButton'
import loadImage, { LoadImageResult } from 'blueimp-load-image'
import { API_KEY, API_URL, BASE64_IMAGE_HEADER } from './Constants'
import Archive from './components/Archive'
import { getAllFolders, PersitedFolder, saveImage } from './store'
import { LocalStoreContext } from '.'
import NewFolderContainer from './containers/NewFolder'

function App() {
	const { store, defaultFolderId } = useContext(LocalStoreContext)
	const [folderData, setFolderData] = useState<PersitedFolder[]>([])
	const [result, setResult] = useState<string | null>(null)
	const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)

	useEffect(() => {
		async function initializeState() {
			if (store) {
				const folderData = await getAllFolders(store)
				setFolderData(folderData)
			}
		}

		initializeState()
	}, [store])

	let uploadImageToServer = (file: File) => {
		return loadImage(file, {
			maxWidth: 400,
			maxHeight: 400,
			canvas: true,
		})
			.then(async (imageData: LoadImageResult) => {
				let image = imageData.image as HTMLCanvasElement

				let imageBase64 = image.toDataURL('image/png')
				let imageBase64Data = imageBase64.replace(BASE64_IMAGE_HEADER, '')
				let data = {
					image_file_b64: imageBase64Data,
				}
				const response = await fetch(API_URL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						'x-api-key': API_KEY,
					},
					body: JSON.stringify(data),
				})

				if (response.status >= 400 && response.status < 600) {
					throw new Error('Bad response from server')
				}

				const result = await response.json()
				const base64Result = BASE64_IMAGE_HEADER + result.result_b64
				setResult(base64Result)
				return base64Result
			})

			.catch(error => {
				console.error(error)
			})
	}

	const storeNewImageInDefaultFolder = useCallback(
		async (image: string) => {
			if (store && defaultFolderId) {
				await saveImage(store, defaultFolderId, image)
			}
		},
		[defaultFolderId, store]
	)

	let onImageAdd = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			if (e.target.files && e.target.files[0]) {
				const processedImage = await uploadImageToServer(e.target.files[0])
				if (processedImage) {
					await storeNewImageInDefaultFolder(processedImage)
				} else {
					console.error('Image failed to be processed')
				}
			} else {
				console.error('No file was picked')
			}
		},
		[storeNewImageInDefaultFolder]
	)

	const handleNewFolderClick = useCallback(() => {
		setIsNewFolderDialogOpen(true)
	}, [])

	const reloadFolderData = useCallback(() => {
		if (store) {
			getAllFolders(store).then(setFolderData)
		}
	}, [store])

	const handleNewFolderFlowEnded = useCallback(
		(folderCreated: boolean) => {
			setIsNewFolderDialogOpen(false)
			if (folderCreated) {
				reloadFolderData()
			}
		},
		[reloadFolderData]
	)

	return (
		<div className="App">
			<Archive folders={folderData} onNewFolderClick={handleNewFolderClick} />
			<header className="App-header">
				{!result && <AddButton onImageAdd={onImageAdd} />}
				{result && <img src={result} width={300} alt="result from the API" />}
			</header>
			<NewFolderContainer
				open={isNewFolderDialogOpen}
				onFlowEnd={handleNewFolderFlowEnded}
			/>
		</div>
	)
}

export default App
