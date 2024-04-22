import { Card } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'
import { TIssue } from '../types'

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
					className={`rounded-0 ${snapshot.isDragging && 'opacity-75'}`}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}>
					<Card.Body>
						<Card.Title>{`${id}: ${title}`}</Card.Title>
						<Card.Text>
							#{number} {String(createdAt)}
						</Card.Text>
						<Card.Text className='text-secondary fs-6'>
							{userLogin} | Comments: {comments}
						</Card.Text>
					</Card.Body>
				</Card>
			)}
		</Draggable>
	)
}

export default IssueCard
