<style scoped lang="less">
	@import './dropup.less';
</style>
<template>
	<div class="popover popper-dropdown" style="position: absolute;  bottom: 57px; right: 2px;">
		<div class="popover-content dropdown-content">
			<ul class="menu-list collapse">
				<li class="" @click="call" v-for="item in resultList">
					<span>
						<a href="#/" class="" v-if="item.fun_type == 1">
							<img  src="../../../../assets/panoramic-img/panoramic-phone.png" width="20" height="20">电话
						</a>
						<a href="#/" class="" v-if="item.fun_type == 2">
							<img  src="../../../../assets/panoramic-img/panoramic-navigation.png" width="20" height="20">导航
						</a>
						<a href="#/" class="" v-if="item.fun_type == 3">
							<img  src="../../../../assets/panoramic-img/panoramic-reserve.png" width="20" height="20">网页
						</a>
						<a href="#/" class="" v-if="item.fun_type == 4">
							<img  src="../../../../assets/panoramic-img/panoramic-reserve.png" width="20" height="20">文本信息
						</a>
					</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';

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
			type () {
				for (let i = 0; i < this.resultList.length; i++) {
					const element = this.resultList[i];
					switch (element.fun_type) {
						case 1:
							return '电话'
							break;
						case 2:
							return '导航'
							break;
						case 3:
							return '网址'
							break;
						case 4:
							return '文本'
							break;
					}
				}
			},
			call() {
				if (this.$store.state.app.currentPageFromIos) {
					this.$bridge.callHandler('call', { 'phone': '11111111111' }, (data) => { })
				} else if (this.$store.state.app.currentPageFromAndroid) {
					android.call("11111111111");
				} else {
					Toast('此项功能为客户端专享，赶紧前往下载体验吧~');
				}
			},
			map() {
				if (this.$store.state.app.currentPageFromIos) {
					this.$bridge.callHandler('navigation', { 'title': this.panoramic.panoAddress, 'longitude': this.panoramic.panoLongitude, 'dimension': this.panoramic.panoDimension }, (data) => { })
				} else if (this.$store.state.app.currentPageFromAndroid) {
					android.navigation(this.panoramic.panoAddress, this.panoramic.panoLongitude, this.panoramic.panoDimension);
				} else {
					Toast('此项功能为客户端专享，赶紧前往下载体验吧~');
				}
			}
		},
	}
</script>