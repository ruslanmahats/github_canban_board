import { render, screen } from '@testing-library/react'

import TimeAgo from './TimeAgo'

describe('TimeAgo component', () => {
	it('renders on page', () => {
		render(<TimeAgo time='2000-10-31T01:30:00.000-05:00' />)
		expect(screen.getByTestId('time-ago')).toBeInTheDocument()
	})
})
