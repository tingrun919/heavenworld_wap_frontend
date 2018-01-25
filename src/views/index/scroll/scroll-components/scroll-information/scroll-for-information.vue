<style scoped lang="less">
	@import './scroll-for-information.less';
</style>
<template>
	<div class="scroll-information-img">
		<img src="../../../../../assets/mine-icon/mine-custom.png" width="40" height="40">
		<span>测试用户{{item.bavbar}}</span>
		<div class="information-title">标题限制一行标题限制一行标题限制一行标题限制一行标题限制一行标题限制一行标题限制一行标题限制一行</div>
		<div class="information-subtitle" v-if="item.isPic == 1">副标题限制两行副标题限制两行副标题限制两行副标题限制两行副标题限制两行副
											标题限制两行副标题限制两行副标题限制两行副标题限制两行
		</div>
		<div v-if="item.isPic == 2">
			<img src="../../../../../assets/test-img/fo1.jpg" :style="{height:viewHeight,width:viewHeight}">
			<img src="../../../../../assets/test-img/fo2.jpg" :style="{height:viewHeight,width:viewHeight}">
			<img src="../../../../../assets/test-img/fo3.jpg" :style="{height:viewHeight,width:viewHeight}">
		</div>
		<div v-if="item.isPic == 3">
			<img src="../../../../../assets/test-img/allfo.jpg" :style="{height:oneImgviewHeight,width:oneImgviewHeight}">
		</div>
		<div class="information-comment">
			<span>123赞</span>
			<span>123评论</span>
			<div class="information-comment-right">
					<span>板块名</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		computed:{
			viewHeight(){
				return (window.innerWidth / 3) - 15 + 'px'
			},
			oneImgviewHeight(){
				return window.innerWidth - 20 + 'px'
			}
		},
		props: {
			item: {
				isPic: Object,
			},
		}
	}
</script>