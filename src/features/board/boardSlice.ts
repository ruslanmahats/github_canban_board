import { FETCH_STATUS, fetchData } from '../../app/fetchConfig'
import { TInitialState, TReturnData } from './types'
import { addNewIssuesToState, appLocalStorage } from '../../app/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'

const { getItemFromLocalStorage, setItemToLocalStorage } = appLocalStorage()

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

export const fetchBoardInfo = createAsyncThunk('board/fetchIssues', async (url: string) => {
	const [repoUserName, repoName] = url
		.trim()
		.split('/')
		.filter((item) => item !== '')
		.slice(2)

	const fetchRepoUrlIssues = `${repoUserName}/${repoName}/issues`
	const fetchRepoUrl = `${repoUserName}/${repoName}`

	const repoResponse = await fetchData.get(fetchRepoUrl)
	const issuesResponse = await fetchData.get(fetchRepoUrlIssues)

	const [serverRepoInfo, serverIssues] = await Promise.all([repoResponse, issuesResponse])

	const returnData: TReturnData = { serverRepoInfo: serverRepoInfo.data, serverIssues: serverIssues.data }

	return returnData
})

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		moveIssue: (state) => {
			console.log(state)
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchBoardInfo.pending, (state) => {
				state.status = FETCH_STATUS.LOADING
			})

			.addCase(fetchBoardInfo.fulfilled, (state, action) => {
				const { serverRepoInfo, serverIssues } = action.payload

				const localStorageState = getItemFromLocalStorage(String(serverRepoInfo.id))

				if (localStorageState) {
					state.repoInfo = localStorageState.repoInfo
					state.issuesList = localStorageState.issuesList

					const issuesListIds = Object.keys(state.issuesList)

					const newIssues = serverIssues.filter((issue) => !issuesListIds.includes(String(issue.id)))

					const newIssuesIds = addNewIssuesToState(newIssues, state)

					state.boardColumns['column-1'].issueIds = [
						...newIssuesIds,
						...localStorageState.boardColumns['column-1'].issueIds,
					]
					state.boardColumns['column-2'].issueIds = localStorageState.boardColumns['column-2'].issueIds
					state.boardColumns['column-3'].issueIds = localStorageState.boardColumns['column-3'].issueIds
				} else {
					state.repoInfo.id = String(serverRepoInfo.id)
					state.repoInfo.repoName = serverRepoInfo.name
					state.repoInfo.repoUrl = serverRepoInfo.html_url
					state.repoInfo.repoOwner = serverRepoInfo.owner.login
					state.repoInfo.repoOwnerUrl = serverRepoInfo.owner.html_url
					state.repoInfo.stargazersCount = serverRepoInfo.stargazers_count

					state.issuesList = {}
					state.boardColumns['column-1'].issueIds = []

					const newIssuesIds = addNewIssuesToState(serverIssues, state)

					state.boardColumns['column-1'].issueIds = [...newIssuesIds]
				}

				setItemToLocalStorage(state.repoInfo.id, state)

				state.status = FETCH_STATUS.SUCCEEDED
				state.error = null
			})

			.addCase(fetchBoardInfo.rejected, (state, action) => {
				state.status = FETCH_STATUS.FAILED
				state.error = action.error.message ? action.error.message : null
			})
	},
})

export const boardStateSelectors = {
	board: (state: RootState) => state.board,
	repoInfo: (state: RootState) => state.board.repoInfo,
	status: (state: RootState) => state.board.status,
	error: (state: RootState) => state.board.error,
}

export const { moveIssue } = boardSlice.actions

export const boardReducer = boardSlice.reducer
