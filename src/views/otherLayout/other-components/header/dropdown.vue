<style scoped lang="less">
	@import './dropdown.less';
</style>
<template>
	<div class="popover popper-dropdown" style="position: absolute;  top: 42px; right: 2px;">
		<div class="popover-content dropdown-content">
			<ul class="menu-list collapse">
				<li class="" @click="share">
					<span>
						<a  class="">
									<img src="../../../../assets/panoramic-img/panoramic-share.png" width="20" height="20" > 分享
								</a>
					</span>
				</li>
				<li class="">
					<span>
						<a href="#/" class="">
									<img src="../../../../assets/panoramic-img/panoramic-refresh.png" width="20" height="20"> 刷新
								</a>
					</span>
				</li>
				<li class="">
					<span>
						<a href="#/" class="">
									<img src="../../../../assets/panoramic-img/panoramic-collection.png" width="20" height="20"> 收藏
								</a>
					</span>
				</li>
				<li class="">
					<span>
						<a href="#/" class="">
									<img src="../../../../assets/panoramic-img/panoramic-music.png" width="20" height="20">	音乐列表
								</a>
					</span>
				</li>
				<li class="">
					<span>
						<a href="#/" class="">
									<img src="../../../../assets/panoramic-img/panoramic-fate.png" width="20" height="20">结缘榜
								</a>
					</span>
				</li>
				<li class="">
					<span>
						<a href="#/" class="">
										<img src="../../../../assets/panoramic-img/panoramic-cancel.png" width="20" height="20">取消
									</a>
					</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			share() {
				this.$bridge.callHandler('appShare', { 'title': '标题', 'description': '测试简介', 'url': 'http://192.168.10.72:8080/panoramicView' }, (data) => { })
			}
		},


	}
</script>