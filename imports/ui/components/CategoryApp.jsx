import React from 'react';
import { Table } from 'react-bootstrap'
import ReactDom from 'react-dom'
import { Meteor } from 'meteor/meteor'

import Category from './Category.jsx';
import  Loading  from './Loading.jsx'

export default class CategoryApp extends React.Component {
	constructor(props) {
	super(props);

		this.addCategory = this.addCategory.bind(this)

		this.state = {
			created: false,
		}
	}

	render() {
			const categories = this.props.categories;
			const loading = this.props.loading;
			const canShow = this.props.canShow
			const authInProcess = this.props.authInProcess

			if (authInProcess) {
			return <p>loading ... </p>
			}

			if (canShow) {

			return (
			<div>
			<Table striped bordered hover condensed>
			<caption className="alert alert-info">All Categories</caption>
			<thead>
			<tr>
			<th>Name</th>
			</tr>
			</thead>
			<tbody>
			{categories.map(category => <Category key={category._id} category= {category} />)}
			</tbody>
			</Table>
			{this.renderCreateCategory()}
			</div>
			);
			}

			return (
			<div>
			<p>You are not authorized to view this page.</p>
			<p>Please <a href="/login">login</a> to view this page</p>
			</div>

			)

			
	}

	renderCreateCategory() {
			
		return (
			<Table>
			<tbody>
			<tr>
	<td><input className="form-control" type="text" id="name" placeholder="enter name" ref="name" /></td>
	<td><button onClick={this.addCategory} className="btn btn-primary">Add</button></td>
	</tr>
	</tbody>
	</Table>
		)
	
	}

	addCategory(e) {
		e.preventDefault()
		const name = ReactDom.findDOMNode(this.refs.name).value.trim();
		if(!name){
			return
		}
//		call server

		
		Meteor.call('categoryinsert', name, err => {
			if (!err) {
				this.setState({created: true})
			}
		})
				
		ReactDom.findDOMNode(this.refs.name).value='';
	}

	
}