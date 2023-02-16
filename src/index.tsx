import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { initializeStore } from './store'

const { store, defaultFolderId } = await initializeStore()
export const LocalStoreContext = createContext({ store, defaultFolderId })

ReactDOM.render(
	<React.StrictMode>
		<LocalStoreContext.Provider value={{ store, defaultFolderId }}>
			<App />
		</LocalStoreContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
