import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import { useCallback, useContext, useEffect } from 'react'
import { FC, useState } from 'react'
import { LocalStoreContext } from '../..'
import Folder from '../../components/Folder'
import { moveImage, renameFolder } from '../../store'

interface FolderData {
	id: string
	name: string
	images: string[]
}

type Props = {
	id: string
	name: string
	images: string[]
	onRename: () => void
	onImageMove: () => void
	folders: FolderData[]
}

const FolderContainer: FC<Props> = ({
	id,
	name,
	images,
	onRename,
	onImageMove,
	folders,
}) => {
	const [isFolderNameEditDialogOpen, setIsFolderNameEditDialogOpen] =
		useState(false)
	const { store } = useContext(LocalStoreContext)
	const [updatedName, setUpdatedName] = useState(name)
	const [imageToMove, setImageToMove] = useState('')
	const [isMoveToFolderDialogOpen, setIsMoveToFolderDialogOpen] =
		useState(false)

	useEffect(() => {
		if (imageToMove) {
			setIsMoveToFolderDialogOpen(true)
		}
	}, [imageToMove])

	const handleCancelRename = useCallback(() => {
		setIsFolderNameEditDialogOpen(false)
	}, [])

	const handleRename = useCallback(async () => {
		setIsFolderNameEditDialogOpen(false)
		if (store) {
			await renameFolder(store, id, updatedName)
			onRename()
		}
	}, [store, id, updatedName, onRename])

	const handleRenameClick = useCallback(() => {
		setIsFolderNameEditDialogOpen(true)
	}, [])

	const handleImageMoveClick = useCallback(image => {
		setImageToMove(image)
	}, [])

	const handleCancelMove = useCallback(() => {
		setIsFolderNameEditDialogOpen(false)
		setImageToMove('')
	}, [])

	const handleMoveToImageToFolderClick = useCallback(
		async (targetFolderId: string) => {
			if (store && imageToMove) {
				await moveImage(store, imageToMove, id, targetFolderId)
				onImageMove()
			}
			setIsMoveToFolderDialogOpen(false)
			setImageToMove('')
		},
		[id, imageToMove, onImageMove, store]
	)

	return (
		<>
			<Folder
				name={name}
				images={images}
				onRenameClick={handleRenameClick}
				onImageMoveClick={handleImageMoveClick}
			/>
			<Dialog open={isFolderNameEditDialogOpen} onClose={handleCancelRename}>
				<DialogTitle>Rename Folder</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Enter a folder name..."
						type="text"
						fullWidth
						variant="standard"
						value={updatedName}
						onChange={e => setUpdatedName(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelRename}>Cancel</Button>
					<Button onClick={handleRename} disabled={!name}>
						Rename
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={isMoveToFolderDialogOpen} onClose={handleCancelMove}>
				<DialogTitle>Move Image</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Select a folder to move the image to.
					</DialogContentText>
					<List>
						{folders.map(folder => (
							<ListItem disablePadding key={folder.id}>
								<ListItemButton
									onClick={() => handleMoveToImageToFolderClick(folder.id)}
								>
									<ListItemIcon>
										<FolderOpenIcon />
									</ListItemIcon>
									<ListItemText primary={folder.name} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelMove}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default FolderContainer
