import { FETCH_STATUS } from '../../app/fetchConfig'

export type TIssue = {
	title: string
	id: string
	number: number
	createdAt: string
	userLogin: string
	comments: number
}

export type TRepoInfo = {
	id: string
	repoName: string
	repoUrl: string
	repoOwner: string
	repoOwnerUrl: string
	stargazersCount: number
}

export type TIssuesList = {
	[key: string]: TIssue
}

type TBoardColumn = {
	id: string
	title: string
	issueIds: string[]
}

type TBoardColumns = {
	[key: string]: TBoardColumn
}

export type TInitialState = {
	repoInfo: TRepoInfo
	issuesList: TIssuesList
	boardColumns: TBoardColumns
	columnOrder: string[]
	status: FETCH_STATUS
	error: null | string
}

type TServerRepoInfo = {
	id: number
	created_at: Date
	name: string
	html_url: string
	owner: { login: string; html_url: string }
	stargazers_count: number
}

type TServerIssue = {
	assignee: null | { [key: string]: unknown }
	title: string
	id: number
	number: number
	created_at: string
	user: { login: string }
	comments: number
}

export type TServerIssues = TServerIssue[]

export type TReturnData = { serverRepoInfo: TServerRepoInfo; serverIssues: TServerIssues }
