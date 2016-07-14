import React from 'react'

export default class Product extends React.Component {
		
	expireClassName() {
	const product = this.props.product
	let today = new Date()
	let expiringdate = this.checkExpiringDateFormat(product.expiringdate)
	
	if (expiringdate != null) {
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

	expireTrackerColumn() {
		const product = this.props.product
	let today = new Date()
	let expiringdate = this.checkExpiringDateFormat(product.expiringdate)
	
	if (expiringdate != null) {
	if (today > expiringdate) {
		let difference = today.getTime() - expiringdate.getTime()
		difference = Math.floor(difference/(1000*60*60*24))
		return <td className="alert alert-danger">{"expired "+ difference + " days ago" }</td>
		
	}

		let difference = expiringdate.getTime() - today.getTime()
		difference = Math.floor(difference/(1000*60*60*24))
		if (difference <= 30) {
			return <td className="alert alert-warning">{"only "+ difference + " days left to expire" }</td>
			
		}
	} else {
		return <td></td>
	}
}

	checkExpiringDateFormat(datestring) {
	let result = datestring.match(/\d/)
	if (result !=null) {
		return new Date(datestring)
	}
	return null

}

	render() {

	const product = this.props.product
		
	return  (
	<tr className= {this.expireClassName()}> 
	<td>{product.name}</td>
    <td>{product.batchno}</td> 
    <td>{product.expiringdate}</td> 
    <td>{product.price}</td>
    <td>{product.qty}</td> 
    {this.expireTrackerColumn()}
    </tr>

	)
	}

}

