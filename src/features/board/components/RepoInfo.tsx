import { Button, Col, Row } from 'react-bootstrap'

import { TRepoInfo } from '../types'
import { starsCountFormatter } from '../../../app/utils'

export type TRepoInfoProps = {
	repoInfo: TRepoInfo
}

const RepoInfo = ({ repoInfo }: TRepoInfoProps) => {
	const { repoName, repoUrl, repoOwner, repoOwnerUrl, stargazersCount } = repoInfo

	return (
		<Row className='mb-3'>
			<Col className='d-flex align-items-center'>
				{repoUrl ? (
					<>
						<Button variant='link' href={repoOwnerUrl} className='text-capitalize'>
							{repoOwner}
						</Button>
						<div className='text-primary'>{'>'}</div>
						<Button variant='link' href={repoUrl} className='text-capitalize'>
							{repoName}
						</Button>
						<div>⭐&nbsp;</div>
						<div className='text-secondary'>{starsCountFormatter(stargazersCount)} stars</div>
					</>
				) : null}
			</Col>
		</Row>
	)
}

export default RepoInfo
