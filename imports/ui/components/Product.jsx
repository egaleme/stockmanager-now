import React from 'react'
import ReactDom from 'react-dom'
import { Meteor } from 'meteor/meteor'

export default class Product extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			errors: '',
			editing: false,
			updated: false,
			selectValue: this.props.product.categoryid,
			batchno: this.props.product.batchno,
			name: this.props.product.name,
			expiringdate: this.props.product.expiringdate,
			price: this.props.product.price,
			qty: this.props.product.qty,
		}

		this.saveEdit = this.saveEdit.bind(this)
		this.removeStock = this.removeStock.bind(this)
		this.cancelEdit = this.cancelEdit.bind(this)
		this.handleEditing = this.handleEditing.bind(this)
		this.changeSelect = this.changeSelect.bind(this)
		this.changeName = this.changeName.bind(this)
		this.changeBatchno = this.changeBatchno.bind(this)
		this.changeExpiringdate = this.changeExpiringdate.bind(this)
		this.changePrice = this.changePrice.bind(this)
		this.changeQty = this.changeQty.bind(this)

	}

	render() {
	let editing = this.state.editing;
	
	if (editing) {
		return this.renderEdit()
	}

	return this.renderProduct()
	
	}

	handleEditing() {
		this.setState({editing: true})
	//	ProductsActions.createForm(false)

	}


	expireTracker() {
	const product = this.props.product
	let today = new Date()
	let expiringdate = this.checkExpiringDateFormat(product.expiringdate)

	if (expiringdate !=null) {
	if (today > expiringdate) {
		let difference = today.getTime() - expiringdate.getTime()
		difference = Math.floor(difference/(1000*60*60*24))
		return "alert alert-danger"

	}

		let difference = expiringdate.getTime() - today.getTime()
		difference = Math.floor(difference/(1000*60*60*24))
		if (difference <= 30) {
			return "alert alert-warning"
		}
	} else {
		return ''
	}

}

checkExpiringDateFormat(datestring) {
	let result = datestring.match(/\d/)
	if (result !=null) {
		return new Date(datestring)
	}
	return null

}

renderProduct() {
	const product = this.props.product
	//const expiringdate = product.expiringdate
	
	return  (
	<tr className= {this.expireTracker()}> 
	<td>{product.name}</td>
    <td>{product.batchno}</td> 
    <td>{product.expiringdate}</td> 
    <td>{product.price}</td>
    <td>{product.qty}</td> 
    <td><button className="btn btn-xs btn-info" onClick={this.handleEditing}>Edit</button></td>
    <td><button className="btn btn-danger btn-xs" onClick={this.removeStock}>Remove</button></td>
    </tr>

	)
}

renderEdit() {
	const product = this.props.product
	const categories = this.props.categories
	const coptions = this.renderCategories()
	const name = this.state.name
	const batchno = this.state.batchno
	const expiringdate = this.state.expiringdate
	const price = this.state.price
	const qty = this.state.qty
	const selectValue = this.state.selectValue
	const updated = this.state.updated
	return (
	<tr>
	<td><input type="text" id="name" value={name} onChange={this.changeName} ref="name" /></td>
	<td><input type="text" id="batchno" value={batchno} onChange={this.changeBatchno} ref="batchno"/></td>
	<td><input type="text" id="expiringdate" value={expiringdate} onChange={this.changeExpiringdate} ref="expiringdate"/></td>
	<td><input type="text" id="price" value={price} onChange={this.changePrice} ref="price"/></td>
	<td><input type="text" id="qty" value={qty} onChange={this.changeQty} ref="qty"/></td>
	<td><select  onChange= {this.changeSelect} value={selectValue} id="category" ref="categoryid">
				{coptions}
			</select>
	</td>
	<td><button onClick={this.saveEdit} className="btn btn-primary btn-xs">Update</button></td>
	<td><button onClick={this.cancelEdit} className="btn btn-info btn-xs">Cancel</button></td>
	</tr>
	)

}

renderCategories() {
		return this.props.categories.map(category =>
			<option key={category._id} value={category._id}>{category.name}</option>
		);

	}


	changeSelect(e) {
		let selectedOption = e.target.value;
		this.setState({selectValue: selectedOption});
	}

	changeName(e) {
		this.setState({name: e.target.value})
	}

	changeBatchno(e) {
		this.setState({batchno: e.target.value})
	}

	changeExpiringdate(e) {
		this.setState({expiringdate: e.target.value})
	}

	changePrice(e) {
		this.setState({price: e.target.value})
	}

	changeQty(e) {
		this.setState({qty: e.target.value})
	}

	saveEdit(e) {
		e.preventDefault()
		const product = this.props.product
		const name = ReactDom.findDOMNode(this.refs.name).value.trim()
		const categoryid = ReactDom.findDOMNode(this.refs.categoryid).value.trim()
		const qty = ReactDom.findDOMNode(this.refs.qty).value.trim()
		const price = ReactDom.findDOMNode(this.refs.price).value.trim()
		const batchno = ReactDom.findDOMNode(this.refs.batchno).value.trim()
		const expiringdate = ReactDom.findDOMNode(this.refs.expiringdate).value.trim()
		
		if(!name || !categoryid || !batchno || !price || !expiringdate || !qty){
			return
		}
			
		// send to server
		const stock = {
			id: product._id,
			name,
			categoryid,
			qty: Number(qty),
			price: Number(price),
			batchno,
			expiringdate: this.renderDateString(expiringdate)	
		}

		Meteor.call('stockupdate', stock, err => {
			if(!err) {
				this.setState({updated: true, editing: false})
				//ProductsActions.createForm(true)
				return
			}
			if(err) {
				//ProductsActions.errors(err.reason)
				this.setState({errors: err.reason})
			}
			
		})

	}

	renderDateString(datestring) {
		let result = datestring.match(/\d/)
		if (result != null) {
			return new Date(datestring).toDateString()
		}
		return datestring
	}

	cancelEdit() {
		this.setState({editing: false})
		//ProductsActions.createForm(true)
	}

	removeStock() {
		let productId = this.props.product._id
		Meteor.call('stockremove', productId, err => {
			if(err) {
				//ProductsActions.errors(err.reason)
				this.setState({errors: err.reason})
			}
		})
	}

	
}

