import * as hooks from '../../app/hooks'

import { render, screen } from '@testing-library/react'

import { FETCH_STATUS } from '../../app/fetchConfig'
import Layout from './Layout'
import { TInitialState } from '../../features/board/types'

const initialState: TInitialState = {
	repoInfo: {
		id: '',
		repoName: '',
		repoUrl: '',
		repoOwner: '',
		repoOwnerUrl: '',
		stargazersCount: 0,
	},

	issuesList: {},
	boardColumns: {
		'column-1': {
			id: 'column-1',
			title: 'To Do',
			issueIds: [],
		},
		'column-2': {
			id: 'column-2',
			title: 'In Progress',
			issueIds: [],
		},
		'column-3': {
			id: 'column-3',
			title: 'Done',
			issueIds: [],
		},
	},
	columnOrder: ['column-1', 'column-2', 'column-3'],

	status: FETCH_STATUS.IDLE,
	error: null,
}

describe('Layout component', () => {
	const mockedUseAppSelector = vi.spyOn(hooks, 'useAppSelector')
	const mockedUseAppDispatch = vi.spyOn(hooks, 'useAppDispatch')

	beforeEach(() => {
		mockedUseAppSelector.mockClear()
		mockedUseAppDispatch.mockClear()
	})

	it('renders elements on page when initial state', () => {
		const dummyDispatch = vi.fn()
		mockedUseAppDispatch.mockReturnValue(dummyDispatch)

		mockedUseAppSelector.mockReturnValue({
			...initialState,
			status: FETCH_STATUS.IDLE,
			error: null,
		})

		render(<Layout />)

		expect(screen.getByTestId('layout')).toBeInTheDocument()
		expect(screen.getByTestId('repo-link-input')).toBeInTheDocument()
		expect(screen.getByTestId('board')).toBeInTheDocument()
		expect(screen.queryByTestId('error-container')).not.toBeInTheDocument()
		expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
	})

	it('renders "spinner" when status=loading', () => {
		const dummyDispatch = vi.fn()
		mockedUseAppDispatch.mockReturnValue(dummyDispatch)

		mockedUseAppSelector.mockReturnValue({
			...initialState,
			status: FETCH_STATUS.LOADING,
			error: null,
		})

		render(<Layout />)

		expect(screen.getByTestId('spinner')).toBeInTheDocument()

		expect(screen.getByTestId('layout')).toBeInTheDocument()
		expect(screen.getByTestId('repo-link-input')).toBeInTheDocument()
		expect(screen.getByTestId('board')).toBeInTheDocument()
	})

	it('renders "error-container" with error massage "Something went wrong" when status=error', () => {
		const dummyDispatch = vi.fn()
		mockedUseAppDispatch.mockReturnValue(dummyDispatch)

		mockedUseAppSelector.mockReturnValue({
			...initialState,
			status: FETCH_STATUS.FAILED,
			error: 'Something went wrong',
		})

		render(<Layout />)

		const errorContainer = screen.getByTestId('error-container')

		expect(errorContainer).toBeInTheDocument()
		expect(errorContainer).toHaveTextContent('Something went wrong')

		expect(screen.getByTestId('layout')).toBeInTheDocument()
		expect(screen.getByTestId('repo-link-input')).toBeInTheDocument()
		expect(screen.getByTestId('board')).toBeInTheDocument()
	})
})
