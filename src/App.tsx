import 'bootstrap/dist/css/bootstrap.min.css'

import Layout from './components/Layout'
import { Provider } from 'react-redux'
import { store } from './app/store'

function App() {
	return (
		<Provider store={store}>
			<Layout />
		</Provider>
	)
}

export default App
