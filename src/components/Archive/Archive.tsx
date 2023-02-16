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
	margin: 16px -16px;
`

const FolderWrapper = styled.div`
	padding: 16px;
`

const Archive: FC<Props> = ({ folders, onNewFolderClick }) => (
	<div>
		<h1>Archive</h1>
		<Button variant="outlined" onClick={onNewFolderClick}>
			New folder
		</Button>
		<FoldersContainer>
			{folders.map(folder => (
				<FolderWrapper key={folder.id}>
					<Folder name={folder.name} images={folder.images} />
				</FolderWrapper>
			))}
		</FoldersContainer>
	</div>
)

export default Archive
