<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App',
		beforeCreate(){
			localStorage.clear()
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
	@media only screen and (max-width: 768px) {
		.powered-by {
			position: relative;
			left: 50%;
			transform: translateX(-50%);
			bottom: 0;
			margin-top: 20px;
			width: 70%;
		}
		#app{
			margin-top: 20px;

		}
		.el-progress-circle{
			height: 80px;
			width: 80px;
		}
	}

</style>
