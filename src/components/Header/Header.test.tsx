import Header from './Header'
import { renderWithStoreProvider } from '../../tests/test-utils'
import { screen } from '@testing-library/react'

describe('Header component', () => {
	it('renders on page with form', () => {
		renderWithStoreProvider(<Header />)
		expect(screen.getByTestId('repo-link-input')).toBeInTheDocument()
	})
})
