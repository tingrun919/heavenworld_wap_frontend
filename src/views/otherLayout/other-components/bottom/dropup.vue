<style scoped lang="less">
	@import './dropup.less';
</style>
<template>
	<div class="popover popper-dropdown" style="position: absolute;  bottom: 57px; right: 2px;">
		<div class="popover-content dropdown-content">
			<ul class="menu-list collapse">
				<li class="" @click="callHandlerBtn(item)" v-for="item in resultList">
					<span>
						<a href="#/" class="" v-if="item.fun_type == 1">
							<img  src="../../../../assets/panoramic-img/panoramic-phone.png" width="20" height="20">电话
						</a>
						<a href="#/" class="" v-if="item.fun_type == 2">
							<img  src="../../../../assets/panoramic-img/panoramic-navigation.png" width="20" height="20">导航
						</a>
						<a :href="item.fun_desc" class="" v-if="item.fun_type == 3">
							<img  src="../../../../assets/panoramic-img/panoramic-int.png" width="20" height="20">网页
						</a>
						<a href="#/" class="" v-if="item.fun_type == 4">
							<img  src="../../../../assets/panoramic-img/panoramic-text.png" width="20" height="20">文本信息
						</a>
					</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				resultList: []
			}
		},
		computed: {

		},
		beforeMount() {
			this.resultList = this.list
		},
		props: ['panoramic', 'list'],
		methods: {
			callHandlerBtn(item) {
				if (item.fun_type == 1) {
					if (this.$store.state.app.currentPageFromIos) {
						this.$bridge.callHandler('call', { 'phone': item.fun_desc }, (data) => { })
					} else if (this.$store.state.app.currentPageFromAndroid) {
						android.call(item.fun_desc);
					} else {
						MessageBox.confirm('此项功能为客户端专享，赶紧前往下载体验吧~').then(action => { window.location.href = "https://www.pgyer.com/Tpka" });
					}
				} else if (item.fun_type == 2) {
					if (this.$store.state.app.currentPageFromIos) {
						this.$bridge.callHandler('navigation', { 'title': this.panoramic.panoAddress, 'longitude': this.panoramic.panoLongitude, 'dimension': this.panoramic.panoDimension }, (data) => { })
					} else if (this.$store.state.app.currentPageFromAndroid) {
						android.navigation(this.panoramic.panoAddress, this.panoramic.panoLongitude, this.panoramic.panoDimension);
					} else {
						MessageBox.confirm('此项功能为客户端专享，赶紧前往下载体验吧~').then(action => { window.location.href = "https://www.pgyer.com/Tpka" });
					}
				} else if (item.fun_type == 4) {
					Toast(item.fun_desc)
				}
			},
		},
	}
</script>