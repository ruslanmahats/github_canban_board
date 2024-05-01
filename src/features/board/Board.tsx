import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { boardStateSelectors, moveIssue } from './boardSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

import IssuesList from './components/IssueList'
import { Row } from 'react-bootstrap'

const Board = () => {
	const { boardColumns, columnOrder, issuesList } = useAppSelector(boardStateSelectors.board)
	const dispatch = useAppDispatch()

	const onDragEnd = (result: DropResult) => {
		dispatch(moveIssue(result))
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Row data-testid='board'>
				{columnOrder.map((columnId) => {
					const column = boardColumns[columnId]
					const listIssues = column.issueIds.map((issueId) => issuesList[issueId])

					return <IssuesList key={column.id} title={column.title} id={column.id} issues={listIssues} />
				})}
			</Row>
		</DragDropContext>
	)
}

export default Board
