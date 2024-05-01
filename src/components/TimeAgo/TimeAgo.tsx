import { formatDistanceToNow, parseISO } from 'date-fns'

type TTimeAgoProps = {
	time: string
}

const TimeAgo = ({ time }: TTimeAgoProps) => {
	let timeAgo = ''

	if (time) {
		const date = parseISO(time)
		const timePeriod = formatDistanceToNow(date)
		timeAgo = `${timePeriod} ago`
	}

	return (
		<span title='timestamp' data-testid='time-ago'>
			<i>{timeAgo}</i>
		</span>
	)
}

export default TimeAgo
