import React from 'react'
import { Table } from 'react-bootstrap'

import ReportProduct from '../components/ReportProduct.jsx'

export default class ReportsProducts extends React.Component {
	render() {
		let products = this.props.products
		return (
			<Table striped hover condensed>
			<caption className="alert alert-info">Total Current Stock Amount:=N= {this.renderTotalAmount()} as at {this.renderCurrentDate()}</caption>
			<thead>
			<tr>
			<th>Name</th><th>Batch No</th><th>Expiring Date</th><th>Price</th><th>Quantity</th>
			</tr>
			</thead>
			<tbody>
				{products.map(product => 
					<ReportProduct key={product._id} product={product} />)}
			</tbody>
			</Table>
			)
		}

	renderCurrentDate() {
		let date = new Date()
		let dateString = date.toDateString()  
		let timeString = date.toLocaleTimeString()
		return timeString   +" on "+  dateString
	}	

	renderTotalAmount() {
	const products = this.props.products
	let totalAmount = 0
	products.forEach(function(product) {
		 totalAmount = Number(totalAmount + (product.qty * product.price))
	})
	return totalAmount.toFixed(2)
	}
}
