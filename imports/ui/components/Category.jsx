import React from 'react'
import { Table } from 'react-bootstrap'
import ReactDom from 'react-dom'
import { Meteor } from 'meteor/meteor'

export default class Category extends React.Component {
	constructor(props) {
		super(props)

		this.handleEditing = this.handleEditing.bind(this)
		this.removeCategory = this.removeCategory.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.saveEdit = this.saveEdit.bind(this)
		this.cancelEdit = this.cancelEdit.bind(this)


		this.state = {
			editing: false,
			errors: '',
			created: false,
			name: this.props.category.name,
		}
	}

	render() {
		let editing = this.state.editing
		{this.state.errors ? this.renderFailure() : ""}
		if (editing) {
		return this.renderEditing()
		}

		return this.renderCategory()

	}

	renderCategory() {
		const category = this.props.category
		return (
		<tr>
		<td onClick={this.handleEditing}>{category.name}</td>
		<td><button className="btn btn-danger " onClick={this.removeCategory}>Remove</button></td>
    	</tr>
    	)
	}

	renderEditing() {
		const category = this.props.category
		const name = this.state.name
		return (
		<tr>
		<td><input className="form-control" type="text" id="name" value={name} onChange={this.handleChange} ref="name" /></td>
		<td><button className="btn  btn-info" onClick={this.saveEdit}>Edit</button></td>
    	<td><button className="btn btn-success " onClick={this.cancelEdit}>Cancel</button></td>
    	</tr>
    	)
	}

	handleEditing() {
		this.setState({editing: true})
	}

	handleChange(e) {
		this.setState({name: e.target.value})
	}

	cancelEdit() {
		this.setState({editing: false})
	}

	saveEdit(e) {
		e.preventDefault()
		const category = this.props.category
		const name = ReactDom.findDOMNode(this.refs.name).value.trim()
			
		if(!name){
			return
		}
			
		// send to server
		const cat = {
			id: category._id,
			name
				
		}

		Meteor.call('categoryupdate', cat, err => {
			if(!err) {
				this.setState({updated: true, editing: false})
				return
			}
			if(err) {
				this.setState({errors: err.reason})
			}
			
		})

	}

	removeCategory() {
		let categoryId = this.props.category._id
		Meteor.call('categoryremove', categoryId, err => {
			if(err) {
				this.setState({errors: err.reason})
			}
		})
	}
	
	renderSuccess() {
 		return <div className="alert alert-success">Success! Well done category created.</div>
		
	}
}