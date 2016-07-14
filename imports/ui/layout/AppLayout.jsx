import React from 'react';

import HeaderContainer from '../containers/HeaderContainer.jsx'

export default class AppLayout extends React.Component {
	constructor(props) {
		super(props)

		this.renderWithNav = this.renderWithNav.bind(this)
		this.renderWithoutNav = this.renderWithoutNav.bind(this)
	}

	render() {
		const nav = this.props.nav
		const content = this.props.content
		return (
				<div >
			<HeaderContainer />
			{nav ? this.renderWithNav() : this.renderWithoutNav()}
			</div>

			)
	}

	renderWithNav() {
		const nav = this.props.nav
		const content = this.props.content

		return (
			<div className="container">
			<div className="col-md-2">
			{nav}
			</div>
			<div className="col-md-10">
			{content}
			</div>
			</div>

			)

	}

	renderWithoutNav() {
		const content = this.props.content

		return (
						
			<div className="container">
			{content}
			</div>
			
			)
	}
}