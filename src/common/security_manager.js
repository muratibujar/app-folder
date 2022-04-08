import * as CryptoJS from 'crypto-js'
import {getCookie} from '@/common/utilities.service'
import state from '@/store/state'
import moment from 'moment'

export function SecurityManagerService() {

	let SecurityManager = {
		username: null,
		key: null,
		app_id: "ADMIN",
		app_version: "4.2.1",
		geography: null,
		country: null,
		state: null,
		city: null,
		ip: null
	};

	let token = '';
	let info = '';

	let service = {
		setCredentialsWithHashedPassword: function (username, hashed_password) {
			SecurityManager.username = username;
			SecurityManager.key = hashed_password;
		},

		generate: function () {
			// Set the username.
			let hash, timestamp, message, plain;

			timestamp = moment().valueOf();

			// Construct the hash body by concatenating the userAgent, username, app_id, app_version.
			message = [
				navigator.userAgent.replaceAll(":", ""),
				SecurityManager.app_id,
				SecurityManager.app_version,
				SecurityManager.username,
				timestamp].join(':');

			// Hash the message, using the key.
			hash = CryptoJS.HmacSHA256(message, SecurityManager.key);

			// Base64-encode the hash to get the resulting token.
			token = CryptoJS.enc.Base64.stringify(hash);

			plain = [
				navigator.userAgent.replaceAll(":", ""),
				SecurityManager.app_id,
				SecurityManager.app_version,
				SecurityManager.username,
				timestamp,
				SecurityManager.geography,
				SecurityManager.country,
				SecurityManager.state,
				SecurityManager.city
			].join(':');

			info = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(plain));

			return {
				token: token,
				info: info,
				message: message,
				plain: plain,
				hashed_password: SecurityManager.key
			};
		},

	};

	return service;
}

export function getTokenObject() {

	const digest = new SecurityManagerService();

	digest.setCredentialsWithHashedPassword(state.initial_data.username, state.initial_data.hashed_password);
	let tokenOb = digest.generate();

	let finalToken = tokenOb.token;

	let comingTokenFromHome = getCookie('hk_token');

	if (comingTokenFromHome.includes("GOOGLE")) {
		finalToken = comingTokenFromHome;
	}

	return {
		"token": finalToken,
		"info": tokenOb.info,
		"hashed_password": tokenOb.hashed_password
	}
}

export function logout() {
	window.location.href = `${state.initial_data.home_url}#/logout`
}
