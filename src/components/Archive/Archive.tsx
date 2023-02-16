import { Button } from '@mui/material'
import { FC } from 'react'
import styled from 'styled-components'
import Folder from '../Folder'

interface FolderData {
	id: string
	name: string
	images: string[]
}

type Props = {
	folders: FolderData[]
	onNewFolderClick: () => void
}

const FoldersContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
`

const Archive: FC<Props> = ({ folders, onNewFolderClick }) => (
	<div>
		<h1>Archive</h1>
		<Button variant="outlined" onClick={onNewFolderClick}>
			New folder
		</Button>
		<FoldersContainer>
			{folders.map(folder => (
				<Folder
					key={folder.id}
					name={folder.name}
					numberOfImages={folder.images.length}
				/>
			))}
		</FoldersContainer>
	</div>
)

export default Archive
