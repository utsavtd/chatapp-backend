<template>
	<div style="text-align: center;
    margin: 0 auto;
    width: 60%;">

		<div class="before-question-container">
			<h3>Hi  {{name}} Welcome to {{room}}</h3>
			<div style="min-height: 20px; max-height: 300px; overflow-y: scroll;">
				chat messages
				<div style=" margin: 5px;padding: 3px;float: left;
width: 100%; text-align: left;
"  v-for="message in messages">
					<span style="font-weight: bold;">{{message.sender}}</span> :

					<span style="font-style: italic">{{message.message}}</span>



				</div>
			</div>
			<div >

				<el-input placeholder="Please enter your name" v-model="chatMessage"
						  @change="activateButton()" style="width: 54%;float: left"></el-input>

				<el-button class="button-without-radius" :class="{'disable-button':activateButton()}" type="primary"
						   :loading="loadingButton"
						   @click="sendChat()">Chat
				</el-button>
			</div>
		</div>


		</div>
</template>

<script>
	import commonController from '@/controllers/commonController'

	export default {
		data() {
			return {

				name:'',
				room:'',
				chatMessage:'',
				messages:[],
				loadingButton:false


			}
		},
		sockets: {
			connect() {
				// Fired when the socket connects.
				this.isConnected = true;
				console.log('connected')
			},

			disconnect() {
				this.isConnected = false;
				console.log('disconnected')

			},

			// Fired when the server sends something on the "msg of questions room".
			msg(data) {
				console.log('receiving data from questions')
				let number_of_records = data
				console.log(data)
				this.messages.push(data)

			}
		},
		mounted() {
			console.log('local', localStorage.getItem('name'))

			if (localStorage.getItem('name') === null
				|| localStorage.getItem('room')==null
				||localStorage.getItem('roomId')==null) {
				this.$router.push('/')
			}
			this.name=localStorage.getItem('name')
			this.room=localStorage.getItem('room')
			commonController.getMessages(localStorage.getItem('room')).then(response => {
				this.messages=response.data.payload
			})
				.catch(e => {
					this.errors.push(e)
				})

		},
		methods: {
			sendChat() {
				// Send the "pingServer" event to the server.
				let obj={
					sender:this.name,
					room:this.room,
					message:this.chatMessage
				}
				loadingButton:true
				commonController.sendMessage(obj).then(response => {
					//this.messages=response.data.payload
					loadingButton:false
					this.chatMessage=""
				})
					.catch(e => {
						loadingButton:false
						console.log(e)
					})
			},

			activateButton() {
				if (this.chatMessage.length>1) {
					return false;
				}
				return true
			},



		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1 {
		margin: 10px 0px 40px 0px;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}
	.image {
		width: 60%;
		margin-bottom: 30px;

	}

	li {
		background-color: #fff; /* Green */
		border: #d6d2d2 1px solid;
		padding: 15px 32px;
		width: 400px;
		text-align: center;
		text-decoration: none;
		font-size: 16px;
		font-weight: bold;
		margin: 0 auto;
		cursor: pointer;
		border-radius: 25px;
		margin-bottom: 20px;
	}

	a {
		color: #42b983;
	}

	.button-container {
		width: 100%;
		margin: 0 auto;
	}

	.button {
		background-color: #fff; /* Green */
		border: #d6d2d2 1px solid;
		padding: 15px 32px;
		width: 400px;
		text-align: center;
		text-decoration: none;
		font-size: 16px;
		font-weight: bold;
		margin: 0 auto;
		cursor: pointer;
		border-radius: 25px;
		margin-bottom: 20px;
	}

	.button:hover {
		background: #56C895;
		color: #fff;
	}

	.buttonSelected {
		background: #56C895;
		color: #fff;

	}

	.bottom-text {
		position: absolute;
		bottom: 5px;
		width: 100%;
		text-align: center
	}

	.disable-button {
		pointer-events: none;
	}

	.el-alert {
		width: 30%;
		position: absolute;
		top: 45%;
		left: 35%;
		padding: 11px 18px;
		border-radius: 25px;

	}

	.el-alert__title {
		font-size: 16px !important;
		line-height: 18px !important;
		font-weight: bold !important;
	}

	.el-alert__closebtn {
		font-size: 12px;
		color: #fff;
		opacity: 1;
		top: 15px;
		right: 15px;
		position: absolute;
		cursor: pointer;
	}

	@media only screen and (max-width: 768px) {
		.button {
			width: 85%;
		}

		.el-alert {
			width: 70%;
			position: absolute;
			top: 45%;
			left: 15%;
		}

	}

</style>
