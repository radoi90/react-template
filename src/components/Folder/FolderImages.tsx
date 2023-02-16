import { Dialog, DialogTitle } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove'
import { FC } from 'react'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'

type Props = {
	folderName: string
	images: string[]
	onClose: () => void
}

const Images: FC<Props> = ({ images, folderName, onClose }) => (
	<Dialog open onClose={onClose}>
		<DialogTitle>{folderName}</DialogTitle>
		<DialogContent>
			{images.length > 0 && (
				<ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
					{images.map(image => (
						<ImageListItem key={image}>
							<img
								src={image}
								alt="Background removed with PhotoRoom"
								loading="lazy"
							/>
							<ImageListItemBar
								actionIcon={
									<IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
										<DriveFileMoveIcon />
									</IconButton>
								}
							/>
						</ImageListItem>
					))}
				</ImageList>
			)}
			{images.length === 0 && <p>No images in this folder</p>}
		</DialogContent>
		<DialogActions>
			<Button onClick={onClose}>Close</Button>
		</DialogActions>
	</Dialog>
)

export default Images
