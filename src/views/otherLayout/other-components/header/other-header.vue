<style scoped lang="less">
	@import "./other-header.less";
</style>
<template>
	<div v-if="isblessing">
		<mt-header :title="title">
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
			<mt-button icon="more" slot="right" style="transform: rotate(-90deg);" @click="test"></mt-button>
		</mt-header>
		<transition name="fade">
			<drop-Down v-if="show"></drop-Down>
		</transition>
	</div>
	<!-- <div v-else>
		<mt-header :title="title" v-bind:class="{ headerActive: !isblessing }">
			<img slot="left" src="../../../../assets/panoramic-img/panoramic-blessing-back.png" width="23" height="23" @click="aaa">
			<img slot="right" src="../../../../assets/panoramic-img/panoramic-blessing-more.png" width="20" height="20">
		</mt-header>
	</div> -->
</template>
<script>
	import dropDown from '../header/dropdown.vue';

	export default {
		data() {
			return {
				show: false
			}
		},
		// mounted() {
		// 	document.addEventListener('click', (e) => {
		// 		console.log(e.target,'22222')
		// 		if (!this.$el.contains(e.target)) this.show = false
		// 	})
		// },
		components: {
			dropDown
		},
		props: {
			title: String,
			isblessing: Boolean,
		},
		methods: {
			test() {
				this.show = !this.show;
			},
		}
	}
</script>