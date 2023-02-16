import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material'
import { FC, useState } from 'react'

export type Props = {
	name: string
	numberOfImages: number
}

const Folder: FC<Props> = ({ name, numberOfImages }) => {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography variant="h5">{name}</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					{numberOfImages} {numberOfImages === 1 ? 'image' : 'images'}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">View images</Button>
				<Button size="small">Rename</Button>
			</CardActions>
		</Card>
	)
}

export default Folder
