import React, {
	ChangeEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import './App.css'
import AddButton from './components/AddButton'
import loadImage, { LoadImageResult } from 'blueimp-load-image'
import { API_KEY, API_URL, BASE64_IMAGE_HEADER } from './Constants'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Archive from './components/Archive'
import {
	getAllFolders,
	initializeStore,
	PersitedFolder,
	saveImage,
} from './store'

function App() {
	const storeRef = useRef<LocalForage>()
	const [defaultFolderId, setDefaultFolderId] = useState<string | null>(null)
	const [folderData, setFolderData] = useState<PersitedFolder[]>([])
	const [result, setResult] = useState<string | null>(null)

	useEffect(() => {
		async function initializeState() {
			const { store, defaultFolderId } = await initializeStore()
			storeRef.current = store
			setDefaultFolderId(defaultFolderId)

			const folderData = await getAllFolders(store)
			setFolderData(folderData)
		}

		initializeState()
	}, [])

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
			if (defaultFolderId && storeRef.current) {
				await saveImage(storeRef.current, defaultFolderId, image)
			}
		},
		[defaultFolderId]
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

	return (
		<div className="App">
			<Archive folders={folderData} />
			<header className="App-header">
				{!result && <AddButton onImageAdd={onImageAdd} />}
				{result && <img src={result} width={300} alt="result from the API" />}
			</header>
			<Fab color="primary" aria-label="add">
				<AddIcon />
			</Fab>
		</div>
	)
}

export default App
