import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'

export default class Menu extends React.Component {
	constructor(props) {
		super(props)

	}

	render() {
		return (
			<Nav bsStyle="pills" stacked activeKey={1}>
			<NavItem eventKey={1} href="/products">Products</NavItem>
			<NavItem eventKey={2} href="/reports">Reports</NavItem>
			</Nav>
			)
	}
}