import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material'
import { FC, useCallback, useState } from 'react'
import Images from './FolderImages'

export type Props = {
	name: string
	images: string[]
	onRenameClick: () => void
}

const Folder: FC<Props> = ({ name, images, onRenameClick }) => {
	const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
	const onViewImagesHandler = useCallback(() => {
		setIsImageDialogOpen(true)
	}, [])

	const imagesCount = images.length

	return (
		<>
			<Card sx={{ minWidth: 275 }}>
				<CardContent>
					<Typography variant="h5">{name}</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						{imagesCount} {imagesCount === 1 ? 'image' : 'images'}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" onClick={onViewImagesHandler}>
						View images
					</Button>
					<Button size="small" onClick={onRenameClick}>
						Rename
					</Button>
				</CardActions>
			</Card>
			{isImageDialogOpen && (
				<Images
					folderName={name}
					images={images}
					onClose={() => {
						setIsImageDialogOpen(false)
					}}
				/>
			)}
		</>
	)
}

export default Folder
