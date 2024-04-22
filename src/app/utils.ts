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

export const addNewIssuesToState = <T extends TInitialState>(issues: TServerIssues, state: T): string[] => {
	return issues.map((issue) => {
		state.issuesList[issue.id] = {
			title: issue.title,
			id: String(issue.id),
			number: issue.number,
			createdAt: issue.created_at,
			userLogin: issue.user.login,
			comments: issue.comments,
		}

		return String(issue.id)
	})
}
