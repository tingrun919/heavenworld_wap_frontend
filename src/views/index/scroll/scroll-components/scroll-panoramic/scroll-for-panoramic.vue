/*
 * @Author: tarn.tianrun 
 * @Date: 2018-02-07 16:26:21 
 * @Last Modified by:   tarn.tianrun 
 * @Last Modified time: 2018-02-07 16:26:21 
 */

<style scoped lang="less">
	@import './scroll-for-panoramic.less';
</style>
<template>
	<div class="scroll-content-img">
		<img src="../../../../../../static/vtour/panos/hongkong.tiles/thumb.jpg" width="100" height="100">
		<div class="scroll-content-info">
			<p>{{item.bavbar}}普陀山</p>
			<div class="scroll-content-info-span">
				<span>海南省·三亚市</span>
			</div>
			<div class="scroll-content-info-span">
				<span>888人祈福</span>
			</div>
		</div>
		<div class="scroll-content-right">
			<span>全景</span>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			item: {
				type: Object,
			},
		}
	}
</script>