<template>
	<div class="container">
		<div class="access-code-container" v-if="showAccessCode">
			<div id="accessCode">
				<el-input placeholder="Please enter your name" v-model="name"
						  @change="activateButton()" style="width: 40%;float: left"></el-input>

				<el-input placeholder="Please enter room you want to join" v-model="room"
						  @change="activateButton()" style="width: 40%;float: left"></el-input>


				<el-alert v-if="showError"
						  :title="errorMessage"
						  type="error"
						  show-icon @close="showError=false">
				</el-alert>

			</div>

			<div >
				<el-button class="button-without-radius" :class="{'disable-button':activateButton()}" type="primary"
						   :loading="loadingButton"
						   @click="joinChannel()">Submit
				</el-button>
			</div>

		</div>



	</div>
</template>

<script>
	import commonController from '@/controllers/commonController'

	export default {

		name: 'homePage',
		data() {
			return {
				name: '',
				loadingButton: false,
				showAccessCode: true,
				errorMessage: '',
				showError: false,
				room: '',

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

			}

		},
		mounted() {
			localStorage.clear()
		},
		methods: {
			 joinChannel() {
				// Send the "pingServer" event to the server.
				console.log("joining channel "+this.room)
				this.$socket.emit('join', {room:this.room,name:this.name})
				localStorage.setItem('name', this.name);
				localStorage.setItem('room', this.room);
				 console.log("getting room")
				 let obj = {
					 'room': this.room
				 }
				 commonController.getChatRoom(obj)
					 .then(response => {
						 console.log("setting room")
						 localStorage.setItem('roomId', response.data.room._id)
						 this.$router.push('chat')

					 })
					 .catch(e => {
						console.log(e)
					 })




			 },
			activateButton() {
				if (this.name.length > 1 && this.room.length>1) {
					return false;
				}
				return true
			},
			displayError(message) {
				console.log('displaying error')
				this.errorMessage = message
				this.showError = true

			},
			enterPersonalInfo() {
				console.log("sending personal info ")
				this.loadingButton = false
				let userObject = {
					"app_id": 1,
					"external_id": "external_id_TEST",
					"name": this.name,
					"email": this.email,
					"phone": this.phone
				}
				commonController.registerUser(userObject)
					.then(response => {
						localStorage.setItem('participantId', response.data.payload.participant_id);
						this.$router.push('quiz')
					})
					.catch(e => {
						this.errors.push(e)
					})

			},
			resetForm() {
				this.name = ''
				this.email = ''
				this.phone = ''
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	#accessCode {
		width: 80%;
		float: left;
		flex-shrink: 1;
	}

	.image {
		width: 60%;
		margin-bottom: 30px;

	}

	#accessCode .el-input__inner {
		background-color: #fff;
		background-image: none;
		border-radius: 0px !important;
		border: 1px solid #bfcbd9;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		color: #1f2d3d;
		font-size: inherit;
		height: 36px;
		line-height: 1;
		outline: 0;
		padding: 3px 10px;
	}

	.button-without-radius {
		border-radius: 0px !important;
	}

	.el-input-group__append, .el-input-group__prepend {
		width: 60px;
	}

</style>

<style scoped>
	.disable-button {
		pointer-events: none;
	}

	h1 {
		margin: 10px 0px 40px 0px;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	.container {
		width: 95%;
		height: 100%;
		margin: 0 auto;
	}

	.access-code-container {
		margin-top: 40vh;
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;

	}

	.form-container {
		margin-top: 30vh;
		height: 100%;
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

	.input-wrapper {
		margin: 15px;
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
		bottom: 20px;
		width: 100%;
		text-align: center
	}

	.disable-button {
		pointer-events: none;
		background: #84BDF8 !important;
		border: #84BDF8 1px solid !important;

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

		.image {
			width: 80%;
		}

		.form-container {
			margin-top: 15vh;
			height: 100%;
		}

	}

</style>
