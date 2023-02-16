import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { initializeStore } from './store'

type LocalStoreContextType = {
	store: LocalForage | null
	defaultFolderId: string | null
}

export const LocalStoreContext = createContext<LocalStoreContextType>({
	store: null,
	defaultFolderId: null,
})

initializeStore().then(({ store, defaultFolderId }) => {
	ReactDOM.render(
		<React.StrictMode>
			<LocalStoreContext.Provider value={{ store, defaultFolderId }}>
				<App />
			</LocalStoreContext.Provider>
		</React.StrictMode>,
		document.getElementById('root')
	)
})
