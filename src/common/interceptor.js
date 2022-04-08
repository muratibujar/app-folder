import Axios from 'axios'
import * as Security from './security_manager'
import Vue from 'vue'

Axios.defaults.headers.common.Accept = 'application/json';

// Add a response interceptor
// Axios.interceptors.response.use((response) => {
// 	// Do something with response data
// 	// Vue.$log.info("Response ", response)
//
// 	return response;
// }, function (error) {
// 	// Do something with response error
// 	const response = error.response;
// 	Vue.$log.error("Response Error ", response)
//
// 	if (response.status === 403) {
// 		Security.logout()
// 	}
//
// 	return Promise.reject(error);
// });
//
// // Add a request interceptor
// Axios.interceptors.request.use((config) => {
// 	// Do something before request is sent
//
// 	const tokenObj = Security.getTokenObject();
//
// 	config.withCredentials = false;
// 	config.headers = {
// 		'hk-token': tokenObj.token,
// 		'hk-info': tokenObj.info,
// 	};
//
// 	// Vue.$log.info("Request Config ", config)
//
// 	return config;
// }, function (error) {
// 	// Do something with request error
// 	Vue.$log.error("Response Error ", error);
//
// 	return Promise.reject(error);
// });
