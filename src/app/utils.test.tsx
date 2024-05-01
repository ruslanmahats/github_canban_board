import { TIssuesList, TServerIssues } from '../features/board/types'
import { appLocalStorage, prepareNewIssuesToState, starsCountFormatter } from './utils'

import { initialState } from '../features/board/boardSlice'

describe('Testing starsCountFormatter function', () => {
	it('In 50000 expect 50K', () => {
		expect(starsCountFormatter(50000)).toBe('50K')
	})

	it('In 10001 expect 10K', () => {
		expect(starsCountFormatter(10001)).toBe('10K')
	})

	it('In 10000 expect 10K', () => {
		expect(starsCountFormatter(10000)).toBe('10K')
	})

	it('In 9999 expect 9999', () => {
		expect(starsCountFormatter(9999)).toBe('9999')
	})

	it('In 0 expect 0', () => {
		expect(starsCountFormatter(0)).toBe('0')
	})
})

const inputIssues: TServerIssues = [
	{
		title: 'New Issue 1',
		id: 98562476,
		number: 888888,
		created_at: '2000-10-31T01:30:00.000-05:00',
		user: { login: 'Test User' },
		comments: 20,
		assignee: {},
	},
	{
		title: 'New Issue 2',
		id: 55445544,
		number: 888999,
		created_at: '2000-10-31T01:30:00.000-05:00',
		user: { login: 'Test User' },
		comments: 20,
		assignee: null,
	},
]

const outputTuple: [string[], string[], TIssuesList] = [
	['55445544'],
	['98562476'],
	{
		'98562476': {
			title: 'New Issue 1',
			id: '98562476',
			number: 888888,
			createdAt: '2000-10-31T01:30:00.000-05:00',
			userLogin: 'Test User',
			comments: 20,
		},
		'55445544': {
			title: 'New Issue 2',
			id: '55445544',
			number: 888999,
			createdAt: '2000-10-31T01:30:00.000-05:00',
			userLogin: 'Test User',
			comments: 20,
		},
	},
]

describe('Testing addNewIssuesToState function', () => {
	it('Comparing input and output data arrays', () => {
		expect(prepareNewIssuesToState(inputIssues)).toEqual(outputTuple)
	})
})

describe('Testing appLocalStorage function', () => {
	const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
	const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

	const { getItemFromLocalStorage, setItemToLocalStorage } = appLocalStorage()

	const storageValue = initialState
	const storageKey = 'myData'

	afterEach(() => {
		localStorage.clear()
		getItemSpy.mockClear()
		setItemSpy.mockClear()
	})

	it('should call local storage setItem method', () => {
		setItemToLocalStorage(storageKey, storageValue)

		expect(setItemSpy).toHaveBeenCalledTimes(1)
		expect(setItemSpy).toHaveBeenCalledWith(storageKey, JSON.stringify(storageValue))
	})

	it('should call local storage getItem method', () => {
		setItemToLocalStorage(storageKey, storageValue)
		getItemFromLocalStorage(storageKey)

		expect(getItemSpy).toHaveBeenCalledTimes(1)
		expect(getItemSpy).toHaveBeenCalledWith(storageKey)
	})

	it('should return null, when no such key in local storage', () => {
		expect(getItemFromLocalStorage(storageKey)).toBe(null)
	})

	it('should return equal data', () => {
		setItemToLocalStorage(storageKey, storageValue)

		expect(getItemFromLocalStorage(storageKey)).toEqual(storageValue)
	})
})
