import { Card } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'
import { TIssue } from '../types'
import TimeAgo from '../../../components/TimeAgo/TimeAgo'

type TIssueCardProps = {
	issue: TIssue
	index: number
}

const IssueCard = ({ issue, index }: TIssueCardProps) => {
	const { title, id, number, createdAt, userLogin, comments } = issue

	return (
		<Draggable draggableId={id} index={index}>
			{(provided, snapshot) => (
				<Card
					className={`rounded-0 mb-2 ${snapshot.isDragging && 'shadow-sm'}`}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					data-testid={id}>
					<Card.Body>
						<Card.Title>{title}</Card.Title>
						<Card.Text>
							<i>
								{`#${number} opened `}
								<TimeAgo time={createdAt} />
							</i>
						</Card.Text>
						<Card.Subtitle className='text-secondary fs-6'>
							{userLogin} | Comments: {comments}
						</Card.Subtitle>
					</Card.Body>
				</Card>
			)}
		</Draggable>
	)
}

export default IssueCard
