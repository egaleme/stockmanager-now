import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'

export default class Menu extends React.Component {
	constructor(props) {
		super(props)

	}

	render() {
		return (
			<Nav bsStyle="pills" stacked activeKey={1}>
			<NavItem eventKey={1} href="/categories">Add Categories</NavItem>
			<NavItem eventKey={2} href="/products">Add Products</NavItem>
			<NavItem eventKey={3} href="/reports">Reports</NavItem>
			</Nav>
			)
	}
}