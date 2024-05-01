import { TInitialState, TIssuesList, TServerIssues } from '../features/board/types'

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

export const prepareNewIssuesToState = (issues: TServerIssues): [string[], string[], TIssuesList] => {
	const issuesIds: string[] = []
	const assignedIssuesIds: string[] = []
	const newIssuesObj: TIssuesList = {}

	issues.forEach((issue) => {
		newIssuesObj[issue.id] = {
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

	return [issuesIds, assignedIssuesIds, newIssuesObj]
}

export const starsCountFormatter = (num: number): string => {
	if (num < 10000) {
		return String(num)
	}

	const arr: Array<string> = String(num).split('')

	arr.splice(-3, 3)

	return `${arr.join('')}K`
}
