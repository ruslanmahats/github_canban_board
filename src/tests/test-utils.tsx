import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { store } from '../app/store'

export const renderWithStoreProvider = (component: JSX.Element) => {
	return render(<Provider store={store}>{component}</Provider>)
}
