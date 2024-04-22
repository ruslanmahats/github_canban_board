import { Button, Col, Row } from 'react-bootstrap'

import { TRepoInfo } from '../types'

export type TRepoInfoProps = {
	repoInfo: TRepoInfo
}

const RepoInfo = ({ repoInfo }: TRepoInfoProps) => {
	const { repoName, repoUrl, repoOwner, repoOwnerUrl, stargazersCount } = repoInfo

	const countFormatter = (value: string | number): string => {
		const arr: Array<string> = String(value).split('')

		arr.splice(-3, 3)

		return `${arr.join('')}K`
	}

	const stars_count = stargazersCount && stargazersCount > 9999 ? countFormatter(stargazersCount) : stargazersCount

	return (
		<Row className='mb-3'>
			<Col className='d-flex align-items-center'>
				{repoUrl ? (
					<>
						<Button variant='link' href={repoUrl} className='text-capitalize'>
							{repoName}
						</Button>
						<div className='text-primary'>{'>'}</div>
						<Button variant='link' href={repoOwnerUrl} className='text-capitalize'>
							{repoOwner}
						</Button>
						<div>⭐&nbsp;</div>
						<div className='text-secondary'>{stars_count} stars</div>
					</>
				) : null}
			</Col>
		</Row>
	)
}

export default RepoInfo
