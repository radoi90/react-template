import { Button } from '@mui/material'
import { FC } from 'react'
import styled from 'styled-components'
import Folder, { FolderProps } from '../Folder'

type Props = {
	folders: FolderProps[]
}

const FoldersContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
`

const Archive: FC<Props> = ({ folders }) => (
	<div>
		<h1>Archive</h1>
		<Button variant="outlined">New folder</Button>
		<FoldersContainer>
			{folders.map(folderProps => (
				<Folder key={folderProps.name} {...folderProps} />
			))}
		</FoldersContainer>
	</div>
)

export default Archive
