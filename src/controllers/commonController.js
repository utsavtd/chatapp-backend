import axios from 'axios'
import env from '@/env'

export default {
	getChatRoom(obj) {
		return axios({
			method: 'POST',
			url: env.apiUrl+'room/find',
			headers: env.publicHeader,
			data: obj
		})
	},

	getMessages(room) {
		return axios({
			method: 'GET',
			url: env.apiUrl + 'room/'+room+'/messages',
			headers: env.publicHeader,
		})
	},
	sendMessage(obj) {
		return axios({
			method: 'POST',
			url: env.apiUrl + 'room/createMessage',
			headers: env.publicHeader,
			data: obj
		})
	},


}
