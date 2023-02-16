import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { FC, useCallback, useContext, useState } from 'react'
import { LocalStoreContext } from '../..'
import { createFolder } from '../../store'

type Props = {
	open: boolean
	onFlowEnd: (created: boolean) => void
}

const NewFolderContainer: FC<Props> = ({ open, onFlowEnd }) => {
	const { store } = useContext(LocalStoreContext)
	const [name, setName] = useState('')
	const handleCancel = useCallback(() => {
		onFlowEnd(false)
	}, [onFlowEnd])

	const handleOnCreate = useCallback(async () => {
		if (store) {
			await createFolder(store, name)
			onFlowEnd(true)
		}
	}, [name, onFlowEnd, store])

	return (
		<Dialog open={open} onClose={handleCancel}>
			<DialogTitle>New Folder</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Create a new folder to store your processed images in.
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Enter a folder name..."
					type="text"
					fullWidth
					variant="standard"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCancel}>Cancel</Button>
				<Button onClick={handleOnCreate} disabled={!name}>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default NewFolderContainer
