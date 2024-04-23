import { TInitialState, TServerIssues } from '../features/board/types'

export const appLocalStorage = () => {
	const getItemFromLocalStorage = (localStorageKey: string): TInitialState | null => {
		const data: string | null = localStorage.getItem(localStorageKey)

		return data ? JSON.parse(data) : null
	}

	const setItemToLocalStorage = (localStorageKey: string, value: TInitialState): void => {
		localStorage.setItem(localStorageKey, JSON.stringify(value))
	}

	return { getItemFromLocalStorage, setItemToLocalStorage }
}

export const addNewIssuesToState = <T extends TInitialState>(issues: TServerIssues, state: T): [string[], string[]] => {
	const issuesIds: string[] = []
	const assignedIssuesIds: string[] = []

	issues.forEach((issue) => {
		state.issuesList[issue.id] = {
			title: issue.title,
			id: String(issue.id),
			number: issue.number,
			createdAt: issue.created_at,
			userLogin: issue.user.login,
			comments: issue.comments,
		}

		if (!issue.assignee) {
			issuesIds.push(String(issue.id))
		} else {
			assignedIssuesIds.push(String(issue.id))
		}
	})

	return [issuesIds, assignedIssuesIds]
}

export const countFormatter = (value: string | number): string => {
	const arr: Array<string> = String(value).split('')

	arr.splice(-3, 3)

	return `${arr.join('')}K`
}
