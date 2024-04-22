import { DragDropContext } from 'react-beautiful-dnd'
import IssuesList from '../features/board/components/IssueList'
import { Row } from 'react-bootstrap'
import { boardStateSelectors } from '../features/board/boardSlice'
import { useSelector } from 'react-redux'

const Main = () => {
	const { boardColumns, columnOrder, issuesList } = useSelector(boardStateSelectors.board)

	const onDragEnd = () => {}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Row>
				{columnOrder.map((columnId) => {
					const column = boardColumns[columnId]
					const listIssues = column.issueIds.map((issueId) => issuesList[issueId])

					return <IssuesList key={column.id} title={column.title} id={column.id} issues={listIssues} />
				})}
			</Row>
		</DragDropContext>
	)
}

export default Main
