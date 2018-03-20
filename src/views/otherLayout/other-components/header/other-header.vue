/*
 * @Author: tarn.tianrun 
 * @Date: 2018-03-20 11:35:30 
 * @Last Modified by: tarn.tianrun
 * @Last Modified time: 2018-03-20 11:42:29
 */


<style scoped lang="less">
	@import "./other-header.less";
</style>
<style>
	.mintui {
		font-size: 20px;
	}
</style>
<template>
	<div v-if="isblessing">
		<mt-header :title="title">
			<mt-button icon="back" slot="left" @click="test2"></mt-button>
			<mt-button icon="more" v-if="isShowRight" slot="right" style="transform: rotate(-90deg);" @click="test"></mt-button>
			<mt-button v-if="isShowRightDetail" slot="right" @click="toDetail">查看明细</mt-button>
		</mt-header>
		<transition name="fade">
			<drop-Down v-if="show" @handleCancel="test3"></drop-Down>
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
			console.log(this.isblessing)
		},
		components: {
			dropDown
		},
		props: {
			title: String,
			isblessing: Boolean,
			isShowRight: Boolean,
			isShowRightDetail: Boolean,
		},
		methods: {
			test() {
				this.show = !this.show;
			},
			test3(param) {
				this.show = param;
			},
			test2() {
				if (this.$store.state.app.currentPageFromIos) {
					this.$bridge.callHandler('checkUrl', { 'url': `${this.$route.path}` }, (data) => {
						if (data == 1) {
							this.$router.go(-1)
						}
					})
				} else if (this.$store.state.app.currentPageFromAndroid) {
					android.callBack();
				} else {
					if (this.$route.name == 'blessingdetail') {
						this.$router.go(-1)
					} else if (this.$route.name == 'panoramicView') {
						this.$router.push({
							name: 'panoramic'
						});
					} else if (this.$route.name == 'information_view') {
						this.$router.go(-1)
					} else if (this.$route.name == 'information_comment') {
						this.$router.go(-1)
					}
				}
			},
			toDetail() {
				this.$router.push({
					name: 'detail_view'
				});
			}
		}
	}
</script>