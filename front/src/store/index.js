import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage } from 'quasar'

Vue.use(Vuex)

var store = new Vuex.Store({
	state: {
		menuOpen: false,
		data: "",
		data_old: "",
		station_cover: false,
		user_token: LocalStorage.getItem('user_token'),
		user_id: LocalStorage.getItem('user_id'),
		player_id: LocalStorage.getItem('player_id'),
		user_name: LocalStorage.getItem('user_name'),
		user_profile: LocalStorage.getItem('user_profile'),
		access_level: LocalStorage.getItem('access_level'),
		changed_value: false,
		connected: false,
		error: '',
		message: '',
		global_message: '',
		global_title: '',
		global_dialog: false,
		enableButtonSave: false
	},

	actions: {
		SET_MENU_OPEN(context, menuOpen) {
			context.commit('SAVE_MENU_OPEN', menuOpen)
		},
		SET_USER_DATA(context, [user_token, user_id, user_profile, user_name, access_level]) {
			context.commit('SAVE_USER_DATA', [user_token, user_id, user_profile, user_name, access_level])
		},

		SET_PLAYER_ID(context, player_id) {
			context.commit('SAVE_PLAYER_ID', player_id)
		},

		SET_GLOBAL_MESSAGE(context, [global_dialog, global_title, global_message]) {
			context.commit('SAVE_GLOBAL_MESSAGE', [global_dialog, global_title, global_message])
		},

		SET_DATA(context, data) {
			context.commit('SAVE_DATA', data)
		},

		SET_DATA_OLD(context, data) {
			context.commit('SAVE_DATA_OLD', data)
		},

	},

	mutations: {
		SAVE_MENU_OPEN: (state, menuOpen) => {
			Vue.set(state, 'menuOpen', menuOpen)
		},
		SAVE_DATA: (state, data) => {
			Vue.set(state, 'data', data)
		},
		SAVE_DATA_OLD: (state, data) => {
			Vue.set(state, 'data_old', data)
		},
		SAVE_USER_DATA: (state, [user_token, user_id, user_profile, user_name, access_level]) => {
			Vue.set(state, 'user_token', user_token)
			Vue.set(state, 'user_id', user_id)
			Vue.set(state, 'user_profile', user_profile)
			Vue.set(state, 'user_name', user_name)
			Vue.set(state, 'access_level', access_level)

			LocalStorage.set('user_token', user_token)
			LocalStorage.set('user_id', user_id)
			LocalStorage.set('user_profile', user_profile)
			LocalStorage.set('user_name', user_name)
			LocalStorage.set('access_level', access_level)
		},

		SOCKET_CONNECT(state) {
			state.connected = true
		},

		SOCKET_DISCONNECT(state) {
			state.connected = false
		},

		SOCKET_MESSAGE(state, message) {
			state.message = message
		},

		SOCKET_HELLO_WORLD(state, message) {
			state.message = message
		},

		SOCKET_ERROR(state, message) {
			state.error = message.error
		},

		SAVE_GLOBAL_MESSAGE(state, [global_dialog, global_title, global_message]) {
			Vue.set(state, 'global_dialog', global_dialog)
			Vue.set(state, 'global_title', global_title)
			Vue.set(state, 'global_message', global_message)
		},

		SAVE_ENABLE_BUTTON_SAVE(state, value) {
			Vue.set(state, 'enableButtonSave', value)
			LocalStorage.set('enableButtonSave', value)
		},
	},

	getters: {
		getMenuOpen: state => {
			return state.menuOpen
		},
		getData: state => {
			return state.data
		},
		getDataOld: state => {
			return state.data_old
		},
		getUserToken: state => {
			return state.user_token
		},

		getUserId: state => {
			return state.user_id
		},

		getPlayerId: state => {
			return state.player_id
		},

		getUserProfile: state => {
			return state.user_profile
		},

		getUserName: state => {
			return state.user_name
		},

		getAccessLevel: state => {
			return state.access_level
		},

		getGlobalDialog: state => {
			return state.global_dialog
		},

		getGlobalTitle: state => {
			return state.global_title
		},
		getGlobalMessage: state => {
			return state.global_message
		},
		getEnableButtonSave: state => {
			return state.enableButtonSave
		},
	}
})

export default store
