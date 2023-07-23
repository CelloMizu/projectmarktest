import axios from 'axios'
import env from '../../config/helpers/env'
import { LocalStorage } from 'quasar'
import store from '../store'

export default ({ Vue, app }) => {
	Vue.prototype.$axios = axios

	let url = env('API_EXCE')

	axios.defaults.baseURL = url
	axios.defaults.timeout = 5000000


	axios.interceptors.request.use((req) => {

		let headers = {
			'content-type': 'application/json',
			Authorization: app.store.getters.getUserToken ? `Bearer ${app.store.getters.getUserToken}` : null,
		};

		if (!headers.Authorization) {
			delete headers.Authorization;
		}

		var urlOnPremisses = env('URL_ONPREMISSES');

		if(req.url.includes(urlOnPremisses))
		{
			delete headers.Authorization;

			var apiKeyAws = env('API_KEY_AWS');

			headers = {
				'content-type': 'application/json',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin',
				authapi: app.store.getters.getUserToken ? `Bearer ${app.store.getters.getUserToken}` : null,
				'x-api-key': apiKeyAws,
				'Access-Control-Allow-Origin': '*',
			};

			if(req.url.includes("busca-contrato-sgo") || req.url.includes("clonar-contrato-sgo"))
				headers = {
					'content-type': 'application/json',
					//'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
					//'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, authapi, x-api-key',
					//'authapi': app.store.getters.getUserToken ? `Bearer ${app.store.getters.getUserToken}` : null,
					//'x-api-key': apiKeyAws,
					}
		}

		req.headers = headers;

		return req;
	}, (err) => {
		Loading.hide();
		app.store.dispatch('SET_LOADING', true);
		Promise.reject(err);
	  });


	axios.interceptors.response.use(req => {
		if (req.data.Message && req.data.Show) {
			store.dispatch('SET_GLOBAL_MESSAGE', [false, '', '']);
			store.dispatch('SET_GLOBAL_MESSAGE', [true, 'Mensagem', req.data.Message]);
		}

		return req;

	}, err => {
		console.log(err);
		if (err.response.status === 401) {
			store.dispatch('SET_USER_DATA', ['', ''])
			LocalStorage.remove('user_token')
			LocalStorage.remove('user_id')
			app.router.replace({ name: 'login' })
		}
		else if (err.response.status === 500) {
			store.dispatch('SET_GLOBAL_MESSAGE', [true, 'Erro Interno', err.response.data])
		}

		return Promise.reject(err.response)
	})
}
