import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useCallback, useContext } from 'react'
import { FC, useState } from 'react'
import { LocalStoreContext } from '../..'
import Folder from '../../components/Folder'
import { renameFolder } from '../../store'

interface FolderData {
	id: string
	name: string
	images: string[]
	onRename: () => void
}

type Props = FolderData

const FolderContainer: FC<Props> = ({ id, name, images, onRename }) => {
	const [isFolderNameEditDialogOpen, setIsFolderNameEditDialogOpen] =
		useState(false)
	const { store } = useContext(LocalStoreContext)
	const [updatedName, setUpdatedName] = useState(name)

	const handleCancel = useCallback(() => {
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

	return (
		<>
			<Folder name={name} images={images} onRenameClick={handleRenameClick} />
			<Dialog open={isFolderNameEditDialogOpen} onClose={handleCancel}>
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
					<Button onClick={handleCancel}>Cancel</Button>
					<Button onClick={handleRename} disabled={!name}>
						Rename
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default FolderContainer
