import React from 'react';

import HeaderContainer from '../containers/HeaderContainer.jsx';

export default function AppLayout(props) {
	const {nav, content} = props

	const renderWithNav =() => {
		
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

	const renderWithoutNav =() => {
	
		return (
						
			<div className="container">
			{content}
			</div>
			
			)
	}
	
		return (
				<div >
			<HeaderContainer />
			{nav ? renderWithNav() : renderWithoutNav()}
			</div>

			)
	
}