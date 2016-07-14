import React from 'react'
import ReactDom from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'

export default class Login extends React.Component {
	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)

		this.state = {
			error: ''
		}
	}

	render() {
		let error = this.state.error
		return (
			<div>	
		<div>{error}</div>
		<form className="form-horizontal" role="form" onSubmit={this.handleSubmit}> 
		 <div className="form-group">
		 <label htmlFor="storename" className="col-sm-2 control-label">Store Name/Email</label> 
		 <div className="col-sm-3 col-lg-6">
		  <input type="text" className="form-control" placeholder="Enter Store Name or Email" ref="storename" /> </div> </div> 
		  <div className="form-group">
		  <label htmlFor="password" className="col-sm-2 control-label">Password</label> 
		  <div className="col-sm-3 col-lg-6">
		  <input type="password" className="form-control"  placeholder="Enter Password" ref="password" required /> </div> </div>
		  <div className="form-group"> <div className="col-sm-offset-2 col-sm-10"> <button type="submit" className="btn btn-primary">Login</button> </div> </div>
		   </form>
		  </div>
			)
	}

	handleSubmit(e) {
		e.preventDefault()
		const storename = ReactDom.findDOMNode(this.refs.storename).value.trim()
		const password = ReactDom.findDOMNode(this.refs.password).value.trim()

		if(!storename || !password) {
			return
		}

		Meteor.loginWithPassword(storename, password, err => {
			if(err) {
				this.setState({error: err.reason})
			}
			
			if (!err) {
				FlowRouter.go('/stockdairy')
				
			}

		})

		ReactDom.findDOMNode(this.refs.storename).value='';
		ReactDom.findDOMNode(this.refs.password).value='';
		
	

	}
}