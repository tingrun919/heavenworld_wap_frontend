/* * @Author: tarn.tianrun * @Date: 2018-04-13 11:10:15 * @Last Modified by: tarn.tianrun * @Last Modified time: 2018-06-28
15:47:48 */


<style scoped lang="less">
	@import "./other-blessing.less";
</style>
<template>
	<div style="position:fixed;bottom:0;width:100%;z-index:2000;">
		<mt-tabbar v-model="selected">
			<mt-tab-item id="blessing" @click.native="toIndex">
				<img slot="icon" src="../../../../assets/bottom-bar-icon/panoramic-no.png">
				<!-- <img slot="icon" v-if="selected === 'blessing'" src="../../../../assets/panoramic-img/panoramic-blessing.png">  -->
				全景
			</mt-tab-item>
			<!-- <mt-tab-item id="index" @click.native="handleBottombar('index')">
				<img slot="icon" src="../../../../assets/panoramic-img/panoramic-mall.png">
				<img slot="icon" v-if="selected === 'index'" src="../../../../assets/panoramic-img/panoramic-home.png"> 
				福商城
			</mt-tab-item> -->
			<mt-tab-item id="scenes" @click.native="toAffiliation">
				<img slot="icon" src="../../../../assets/panoramic-img/panoramic-blessing-no.png">
				<!-- <img slot="icon" v-if="selected === 'scenes'" src="../../../../assets/panoramic-img/panoramic-scenes.png">  -->
				结缘榜
			</mt-tab-item>
			<mt-tab-item id="more" @click.native="showMore">
				<img slot="icon" v-if="selectColl" src="../../../../assets/panoramic-img/panoramic-blessing-collection.png">
				<img slot="icon" v-if="!selectColl" src="../../../../assets/panoramic-img/panoramic-collection-no.png"> 收藏
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>
<script>
	import otherService from './service/other-blessing-service.js'
	export default {
		mixins: [otherService],
		components: {
		},
		data() {
			return {
				selected: 'blessing',
				selectColl: false,
				show: false,
			}
		},
		beforeMount() {
			setTimeout(() => {
				let status = this.$store.state.app.status
				if (status == 1) {
					this.selectColl = true
				} else {
					this.selectColl = false
				}
			},900)

			// this.selected = this.$route.name
			// this.$emit("handleBottombar",this.selected)
		},
		methods: {
			handleBottombar(bottombar) {
				// this.$emit("handleBottombar",bottombar) rgba(250,250,250,0.8)
			},
			showMore() {
				let token = this.$store.state.app.userToken
				this.handleAddCollect(token, this.$route.params.id, 1, this.selectColl ? 0 : 1).then(() => {
					this.selectColl = !this.selectColl
					this.$store.commit('setStatus', this.selectColl ? 0 : 1);
				})
				// this.$emit("handleColl",this.selectColl)
				// this.show = !this.show
			},
			toIndex() {
				if (this.$store.state.app.currentPageFromIos) {
					// this.$bridge.callHandler('checkUrl', { 'url': `${this.$route.path}` }, (data) => {
						// if (data == 1) {
							this.$router.go(-1)
						// }
					// })
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
					} else if (this.$route.name == 'affiliation_view') {
						this.$router.go(-1)
					} else if (this.$route.name == 'blessing_view') {
						this.$router.go(-1)
					}
				}
			},
			toAffiliation() {
				let argu = { id: this.$route.params.id };
				this.$router.push({
					name: 'affiliation_view',
					params: argu,
				});
			}
		}
	}
</script>