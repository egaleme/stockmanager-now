import React from 'react'
import ReactDom from 'react-dom'
import { Accounts } from 'meteor/accounts-base'
import { FlowRouter } from 'meteor/kadira:flow-router'

export default class Register extends React.Component {
	constructor(props) {
		super(props)

		
		this.handleSubmit = this.handleSubmit.bind(this)

		this.state = {
			registered: false,
			error: null,
		}

	}

	componentWillUnmount() {
		this.setState({register: false})
	}

	render() {
		const registered = this.state.registered
		const error = this.state.error
		return (
		<div>	
		<div>{error}</div>
		{registered ? this.renderRegistered() : this.renderNotRegistered()}
		<form className="form-horizontal" role="form" onSubmit={this.handleSubmit}> 
		 <div className="form-group">
		 <label htmlFor="firstname" className="col-sm-2 control-label">First Name</label> 
		 <div className="col-sm-10">
		  <input type="text" className="form-control" placeholder="Enter First Name" ref="firstname" /> </div> </div> 
		  <div className="form-group">
		  <label htmlFor="lastname" className="col-sm-2 control-label">Last Name</label>
		  <div className="col-sm-10">
		  <input type="text" className="form-control" placeholder="Enter Last Name" ref="lastname" /> </div> </div>
		  <div className="form-group">
		 <label htmlFor="storename" className="col-sm-2 control-label">Store Name</label> 
		 <div className="col-sm-10">
		  <input type="text" className="form-control" placeholder="Enter Store Name" ref="storename" required/> </div> </div> 
		  
		   <div className="form-group">
		  <label htmlFor="email" className="col-sm-2 control-label">Email</label>
		  <div className="col-sm-10">
		  <input type="text" className="form-control" placeholder="Enter Your Emal" ref="email"  required/> </div> </div>
		  <div className="form-group">
		  <label htmlFor="password" className="col-sm-2 control-label">Password</label> 
		  <div className="col-sm-10">
		  <input type="password" className="form-control"  placeholder="Enter Password" ref="password" required /> </div> </div>
		  <div className="form-group"> <div className="col-sm-offset-2 col-sm-10"> <button type="submit" className="btn btn-default">Register</button> </div> </div>
		   </form>
		  </div>
			)
	}

	handleSubmit(e) {
		e.preventDefault()
		const email = ReactDom.findDOMNode(this.refs.email).value.trim()
		const password = ReactDom.findDOMNode(this.refs.password).value.trim()
		const firstname = ReactDom.findDOMNode(this.refs.firstname).value.trim()
		const lastname = ReactDom.findDOMNode(this.refs.lastname).value.trim()
		const storename = ReactDom.findDOMNode(this.refs.storename).value.trim()
		
		if(!password || !email || !firstname || !lastname || !storename){
			return
		}

		Accounts.createUser({
      email,
      password,
      username: storename,
      profile: {firstname: firstname, lastname: lastname, storename: storename},
      }, err => {
      	if(err) {
      		this.setState({error: err.reason})
      	}

      	this.setState({error: null})
      	FlowRouter.go('/products')
      }
    );

	ReactDom.findDOMNode(this.refs.email).value=''
	ReactDom.findDOMNode(this.refs.password).value=''
	ReactDom.findDOMNode(this.refs.firstname).value=''
	ReactDom.findDOMNode(this.refs.lastname).value=''
	ReactDom.findDOMNode(this.refs.storename).value=''
		
	//this.setState({registered: true})
	}

	renderRegistered() {
		return <div className="alert alert-success">Success! Well done you are now registered.</div>

	}

	renderNotRegistered() {
		return <div> </div>
	}
}