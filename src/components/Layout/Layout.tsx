import { Alert, Container, Spinner } from 'react-bootstrap'

import { FETCH_STATUS } from '../../app/fetchConfig'
import Header from '../Header/Header'
import Main from '../Main/Main'
import RepoInfo from '../../features/board/components/RepoInfo'
import { boardStateSelectors } from '../../features/board/boardSlice'
import { useAppSelector } from '../../app/hooks'

const Layout = () => {
	const { repoInfo, status, error } = useAppSelector(boardStateSelectors.board)

	return (
		<>
			{status === FETCH_STATUS.LOADING && (
				<div className='position-absolute top-0 start-0 z-3 w-100 h-100 bg-white bg-opacity-50 d-flex justify-content-center align-items-center'>
					<Spinner animation='border' role='status' variant='primary' data-testid='spinner'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</div>
			)}

			<Container className='p-3' fluid={'xxl'} data-testid='layout'>
				<Header />
				{status === FETCH_STATUS.FAILED && (
					<Alert variant='danger' data-testid='error-container'>
						{error}
					</Alert>
				)}
				<RepoInfo repoInfo={repoInfo} />
				<Main />
			</Container>
		</>
	)
}

export default Layout
