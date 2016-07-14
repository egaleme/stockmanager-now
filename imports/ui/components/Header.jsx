import React from 'react'
import { Meteor } from 'meteor/meteor'
import ReactDom  from 'react-dom'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Navbar, Button, Nav, NavItem } from 'react-bootstrap'

export default class Header extends React.Component {
	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
		this.logout = this.logout.bind(this)
		

		this.state = {
			error: null,
		}
	}

	componentWillUnmount() {
		this.setState({error: null})
	}

	render() {
		const user = this.props.user
		const error = this.state.error
		
		return (
			<header>
			{user ? this.renderAuth() : this.renderGuest()}
			<div>{error}</div>
			</header>
			)
	}

	handleSubmit(e) {
		e.preventDefault()
		const email = ReactDom.findDOMNode(this.refs.email).value.trim()
		const password = ReactDom.findDOMNode(this.refs.password).value.trim()

		if(!email || !password) {
			return
		}

		Meteor.loginWithPassword(email, password, err => {
			if(err) {
				this.setState({error: err.reason})
			}
			
			if (!err) {
				FlowRouter.go('/products')
				this.setState({error: ''})
			}

		})

		ReactDom.findDOMNode(this.refs.email).value='';
		ReactDom.findDOMNode(this.refs.password).value='';
		
	

	}

	logout() {
		Meteor.logout()
		//FlowRouter.go('/')
	}

	renderGuest() {
		return(
			
 <Navbar inverse>
 	<Navbar.Header>
 		<Navbar.Brand>
 			<a href="/">StockDiary</a>
 		</Navbar.Brand>
 		<Navbar.Toggle />
 	</Navbar.Header>
 	<Navbar.Collapse>
 		<Navbar.Text pullRight>
 			<Navbar.Link href="/register">Register</Navbar.Link>
 		</Navbar.Text>
 		
 			<form onSubmit = {this.handleSubmit} className="navbar-form navbar-right" role="search"> <div className="form-group"> <input type="text" className="form-control" placeholder="your email or store name"  ref="email"/> </div> <div className="form-group"> <input type="password" className="form-control" placeholder="your password"  ref="password"/> </div> <button className="btn btn-primary">Login</button>  </form>
 		
 	</Navbar.Collapse>
 </Navbar>


			)
	}

	renderAuth() {
		const user = this.props.user
		return(
				
<Navbar inverse>
	<Navbar.Header>
		<Navbar.Brand>
		  StockDiary
		</Navbar.Brand>
		<Navbar.Toggle />
	</Navbar.Header>
	<Navbar.Collapse>
		
		<Nav bsStyle="pills" activeKey={1} pullRight>
			<Navbar.Text >
				 Welcome : {user.profile.storename}
			</Navbar.Text>
				{this.renderPostCategory()}
			<NavItem eventKey={2} onClick={this.logout}>Logout</NavItem>
		</Nav>
	</Navbar.Collapse>
</Navbar>


			)
	}

	renderPostCategory() {
			const username = this.props.user.username
		if (username === "admin") {
			return <NavItem eventKey={1} href="/categories">Add Categories</NavItem>
		}
		return ""
	}
}