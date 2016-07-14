import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'

export default () => (
	<Jumbotron>
	<h1>StockDiary App</h1>
	<p>Welcome to StockDiary App. A robust inventory and expiring date tracker for your stores. </p>
	<Button bsStyle="primary" bsSize="large" href="/register">Get Started</Button>
	</Jumbotron>
	)