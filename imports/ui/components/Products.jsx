import React from 'react'
import ReactDom from 'react-dom'
import { Table } from 'react-bootstrap'

import Product from './Product.jsx'
import Loading from './Loading.jsx'

export default class Products extends React.Component {
	constructor(props) {
		super(props)
		this.addStock = this.addStock.bind(this)
		this.changeSelect = this.changeSelect.bind(this)
				
		this.state = {
			selectValue: '',
			errors: ''
		}
	}

	componentWillUnmount() {
		this.setState({selectValue: '', errors: ''})
	}


render() {
		const canShow = this.props.canShow
		const authInProcess = this.props.authInProcess
		const categories = this.props.categories	
		const errors = this.state.errors
		const created = this.state.created;

		if (authInProcess) {

			return <p>Loading ... </p>
		}

		if (canShow) {


 return (
			<div>
			{errors ? this.renderFailure(): ""}
			<Table striped bordered hover condensed>
			<caption className="alert alert-info">Total Current Stock Amount:=N= {this.renderTotalAmount()} as at {this.renderCurrentDate()}</caption>
			<thead>
			<tr>
			<th>Name</th><th>Batch No</th><th>Expiring Date</th><th>Price</th><th>Quantity</th>
			</tr>
			</thead>
			<tbody>
			{ this.renderProducts()}
			</tbody>
			</Table>
			{this.renderStockDairy()}
			</div>
		)

		}

		return (
			<div>
			<p>You are not authorized to view this page.</p>
			<p>Please <a href="/login">login</a> to view this page</p>
			</div>

			)

}

renderCurrentDate() {
		let date = new Date()
		let dateString = date.toDateString()  
		let timeString = date.toLocaleTimeString()
		return timeString   +" on "+  dateString
	}

renderProducts() {
		const products = this.props.products;
		const categories = this.props.categories
		
		return products.map(product => 
			<Product key={product._id} product={product} categories={categories}  />)
	
	}

renderTotalAmount() {
	const products = this.props.products
	let totalAmount = 0
	products.forEach(function(product) {
		 totalAmount = Number(totalAmount + (product.qty * product.price))
	})
	return totalAmount.toFixed(2)
	}

renderStockDairy() {
	
	const coptions = this.renderCategories()
	const selectValue = this.state.selectValue
		
		return (
			<Table>
			<tbody>
			<tr>
		<td><input className="form-control" type="text" id="name" placeholder="enter name" ref="name" /></td>
	<td><input className="form-control" type="text" id="batchno" placeholder="enter batch no" ref="batchno"/></td>
	<td><input className="form-control" type="text" id="expiringdate" placeholder="enter expiring date format year-month(2016-7)" ref="expiringdate"/></td>
	<td><input className="form-control" type="text" id="price" placeholder="enter price" ref="price"/></td>
	<td><input className="form-control" type="text" id="qty" placeholder="enter qunatity" ref="qty"/></td>
	<td><select className="form-control" onChange= {this.changeSelect} value={selectValue} id="category" ref="categoryid">
				{coptions}
			</select>
	</td>
	<td><button onClick={this.addStock} className="btn btn-primary">Add</button></td>
	</tr>
	</tbody>
	</Table>
		)

}

renderCategories() {
		return this.props.categories.map(category =>
			<option key={category._id} value={category._id}>{category.name}</option>
		);

	}

changeSelect(e) {
		let selectedOption = e.target.value;
		this.setState({selectValue: selectedOption})
		
	}

	addStock(e) {
		e.preventDefault()
		const name = ReactDom.findDOMNode(this.refs.name).value.trim()
		const categoryid = ReactDom.findDOMNode(this.refs.categoryid).value.trim()
		const qty = ReactDom.findDOMNode(this.refs.qty).value.trim()
		const price = ReactDom.findDOMNode(this.refs.price).value.trim()
		const batchno = ReactDom.findDOMNode(this.refs.batchno).value.trim()
		const expiringdate = ReactDom.findDOMNode(this.refs.expiringdate).value.trim()
		
		if(!name || !categoryid || !batchno || !price || !qty || !expiringdate){
			return
		}
			
		// send to server
		const stock = {
			name,
			categoryid,
			qty: Number(qty),
			price: Number(price),
			batchno,
			expiringdate: this.renderDateString(expiringdate)	
		}

		Meteor.call('stockinsert', stock, err => {
			if(err) {
				this.setState({errors: err.reason})
			}
			
		})

		ReactDom.findDOMNode(this.refs.name).value='';
		ReactDom.findDOMNode(this.refs.qty).value='';
		ReactDom.findDOMNode(this.refs.price).value='';
		ReactDom.findDOMNode(this.refs.batchno).value='';
		ReactDom.findDOMNode(this.refs.expiringdate).value='';

	}

	renderDateString(datestring) {
		let result = datestring.match(/\d/)
		if (result != null) {
			return new Date(datestring).toDateString()
		}
		return datestring
	}

	renderFailure() {
		return <div className="alert alert-danger">{this.state.errors}</div>
	}

}

