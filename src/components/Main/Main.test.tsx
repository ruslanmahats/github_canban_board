import Main from './Main'
import { renderWithStoreProvider } from '../../tests/test-utils'
import { screen } from '@testing-library/react'

describe('Header component', () => {
	it('renders on page with form', () => {
		renderWithStoreProvider(<Main />)
		expect(screen.getByTestId('board')).toBeInTheDocument()
	})
})
