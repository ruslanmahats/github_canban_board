import axios from 'axios'

export enum FETCH_STATUS {
	IDLE = 'IDLE',
	LOADING = 'LOADING',
	SUCCEEDED = 'SUCCEEDED',
	FAILED = 'FAILED',
}

export const fetchData = axios.create({
	baseURL: 'https://api.github.com/repos/',
})
