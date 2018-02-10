/*
 * @Author: tarn.tianrun 
 * @Date: 2018-02-07 16:26:44 
 * @Last Modified by:   tarn.tianrun 
 * @Last Modified time: 2018-02-07 16:26:44 
 */

<style scoped lang="less">
	@import "./other-header.less";
</style>
<template>
	<div v-if="isblessing">
		<mt-header :title="title">
			<mt-button icon="back" slot="left" @click="test2"></mt-button>
			<mt-button icon="more" slot="right" style="transform: rotate(-90deg);" @click="test"></mt-button>
		</mt-header>
		<transition name="fade">
			<drop-Down v-if="show"></drop-Down>
		</transition>
	</div>
</template>
<script>
	import dropDown from '../header/dropdown.vue';

	export default {
		data() {
			return {
				show: false,
			}
		},
		mounted() {

		},
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
			test2() {
				console.log(this.$store.state.app.currentPageFromIos)
				if (this.$store.state.app.currentPageFromIos) {
					this.$bridge.callHandler('callBack', { 'key': 'closeNavbar' }, (data) => { })
				} else {
					this.$router.push({
						name: 'otherRouter'
					});
				}
			}
		}
	}
</script>