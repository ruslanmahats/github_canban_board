import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'

import { AppDispatch } from '../../../app/store'
import { fetchBoardInfo } from '../boardSlice'
import { useAppDispatch } from '../../../app/hooks'
import { useState } from 'react'

const SearchForm = () => {
	const [url, setUrl] = useState('')
	const dispatch = useAppDispatch<AppDispatch>()

	const urlHandle = (e: React.SyntheticEvent): void => {
		e.preventDefault()
		dispatch(fetchBoardInfo(url))
	}

	return (
		<Row>
			<Col>
				<Form onSubmit={(e) => urlHandle(e)} data-testid='repo-link-input'>
					<InputGroup className='mb-3'>
						<InputGroup.Text id='inputGroup-sizing-default'>Repo URL:</InputGroup.Text>
						<Form.Control
							placeholder='e.g.: https://github.com/facebook/react'
							aria-label='Insert repo url: '
							aria-describedby='basic-addon2'
							value={url}
							onChange={(e) => setUrl(e.target.value)}
						/>
						<Button variant='primary' id='button-addon2' type='submit'>
							Load Issues
						</Button>
					</InputGroup>
				</Form>
			</Col>
		</Row>
	)
}

export default SearchForm
