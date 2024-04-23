import { Card, Col } from 'react-bootstrap'

import { Droppable } from 'react-beautiful-dnd'
import IssueCard from './IssueCard'
import { TIssue } from '../types'

type TIssuesListProps = { title: string; id: string; issues: TIssue[] }

const IssuesList = ({ title, id, issues }: TIssuesListProps) => {
	const bgColorBodyClass =
		id === 'column-1' ? 'bg-danger-subtle' : id === 'column-2' ? 'bg-warning-subtle' : 'bg-success-subtle'

	const bgColorHeaderClass = id === 'column-1' ? 'bg-danger' : id === 'column-2' ? 'bg-warning' : 'bg-success'

	return (
		<Col className='col-4 d-flex flex-column'>
			<Card
				className={`rounded-0 flex-grow-1 d-flex flex-column ${bgColorBodyClass}`}
				style={{ minHeight: '300px' }}>
				<Card.Header className={`fs-2 fw-medium text-light rounded-0 border-0  ${bgColorHeaderClass}`}>
					{title}
				</Card.Header>
				<Droppable droppableId={id}>
					{(provided, snapshot) => (
						<Card.Body
							className={`flex-grow-1 d-flex flex-column ${snapshot.isDraggingOver && 'shadow-sm'}`}
							ref={provided.innerRef}
							{...provided.droppableProps}>
							{issues.map((issue, index) => {
								return <IssueCard key={issue.id} index={index} issue={issue} />
							})}
							{provided.placeholder}
						</Card.Body>
					)}
				</Droppable>
			</Card>
		</Col>
	)
}

export default IssuesList
