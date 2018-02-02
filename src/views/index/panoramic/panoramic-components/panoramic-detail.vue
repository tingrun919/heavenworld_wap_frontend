<template>
	<div id="wrapper">
		<div id="pano"></div>
	</div>
</template>

<script>
	export default {
		name: 'vtour',
		data() {
			return {
				show: false
			}
		},
		mounted() {
			embedpano({ swf: "../../../../static/vtour/tour.swf", xml: "../../../../static/vtour/tour.xml", target: "pano", html5: "auto", mobilescale: 1.0, passQueryParameters: true });
		},
		beforeMount() {
		},
		methods: {
			getorder(msg) {
				this.show = msg
			},

		},
	}
</script>

<style scoped>
	#wrapper {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	#pano {
		width: 100%;
		height: 100%;
	}

	.img_btn {
		width: 60px;
		height: 60px;
		position: absolute;
		top: 10px;
		right: 6px;
		z-index: 4010;
	}

	.showUp {
		animation: showup 0.4s ease-in;
	}

	.hideDown {
		animation: hidedown 0.4s ease-out;
	}

	@keyframes showup {
		from {
			transform: translateY(110%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes hidedown {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(110%);
		}
	}

	.vrshow_comment {
		position: absolute;
		bottom: 10%;
		left: 50%;
		margin-left: -200px;
		width: 400px;
		min-height: 100px;
		background-color: rgba(51, 51, 51, 0.8);
		z-index: 4300;
		color: #fff;
		border-radius: 5px;
		display: none;
	}

	@media screen and (max-width: 767px) {
		.vrshow_comment {
			width: 250px;
			margin-left: -125px;
		}
	}
</style>