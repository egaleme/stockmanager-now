import React from 'react';
import {mount, withOptions} from 'react-mounter';
import {FlowRouter} from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor'


import  AppLayout  from '../../ui/layout/AppLayout.jsx';
import  CategoryContainer from '../../ui/containers/CategoryContainer.jsx';
import  ProductsContainer from '../../ui/containers/ProductsContainer.jsx';
import  ReportsContainer from '../../ui/containers/ReportsContainer.jsx';
import  Home from '../../ui/components/Home.jsx';
import  Register from '../../ui/components/Register.jsx';
import  Login from '../../ui/components/Login.jsx';
import  Menu from '../../ui/components/Menu.jsx';

const mount2 = withOptions({
    rootId: 'container',
    
}, mount);

function trackCreateCategoryRoute(context, redirect) {
	if(Meteor.user().username !== 'admin') {
		redirect('/')
	}
}

function trackStockRoute(context, redirect) {
	if(!Meteor.user() ) {
		redirect('/')
	}
}


FlowRouter.route('/', {
	action() {
		mount2(AppLayout, {content: <Home />});
	}
});

FlowRouter.route('/categories', {
	name: 'categories',
	action(){
		mount2(AppLayout, {content: <CategoryContainer />, nav: <Menu />});
	}
});

FlowRouter.route('/register', {
	name: 'register',
	action(){
		mount2(AppLayout, {content: <Register />});
	}
});

FlowRouter.route('/login', {
	name: 'login',
	action(){
		mount2(AppLayout, {content: <Login />});
	}
});

FlowRouter.route('/products', {
	name: 'products',
	action(){
		mount2(AppLayout, {content: <ProductsContainer />, nav: <Menu />});
	}
});

FlowRouter.route('/reports', {
	name: 'reports',
	action(){
		mount2(AppLayout, {content: <ReportsContainer />, nav: <Menu />});
	}
});

