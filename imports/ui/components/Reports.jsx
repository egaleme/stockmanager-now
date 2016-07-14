import React from 'react'
import ReactDom from 'react-dom'
import { Table } from 'react-bootstrap'

import ReportsProductsContainer from '../containers/ReportsProductsContainer.jsx'

export default class Reports extends React.Component {
	constructor(props) {
		super(props)

		this.handelChange = this.handelChange.bind(this)
		this.handelBatchnoChange = this.handelBatchnoChange.bind(this)
				
		this.state = { 
			batchno: '',
			selectValue: ''
		}
	}

	render() {
		let batchno = this.state.batchno
		let selectValue = this.state.selectValue
		const canShow = this.props.canShow
		const authInProcess = this.props.authInProcess
		const coptions = this.renderCategories()

		if (authInProcess) {
			return <p>Loading ... </p>
		}

		if (canShow) {
		return (
			<div>
			<Table>
			<caption>Enter batch no or Select a category</caption>
			<tbody>
			<tr>
			<td><input type="text" id="batchno" className="form-control" value={batchno} onChange = {this.handelBatchnoChange} ref="batchno" placeholder="Search by batch no" /></td>
			<td><label><select className="form-control" onChange= {this.handelChange} value={selectValue} id="category" ref="categoryid">
				{coptions}
			</select>Search by category</label>
			</td>
			</tr>
			</tbody>
			</Table>
			<div>{''}</div>
			{this.renderSearchResult()}
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

	renderCategories() {
		return this.props.categories.map(category =>
			<option key={category._id} value={category._id}>{category.name}</option>
		)

	}

	
	handelChange(e) {
		this.setState({selectValue: e.target.value})
	}

	handelBatchnoChange(e) {
		this.setState({batchno: e.target.value})
	}

	renderSearchResult() {
		if(this.state.batchno) {
			return <ReportsProductsContainer batchno = {this.state.batchno} />
		}

		if(this.state.selectValue) {
			return <ReportsProductsContainer categoryid = {this.state.selectValue} />
		}
		return <ReportsProductsContainer />
	}

}