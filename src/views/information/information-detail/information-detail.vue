<style scoped lang="less">
	@import './information-detail.less';
</style>
<template>
	<div class="information-detail-main">
		<div class="info-infomation">
			<div class="user-info">
				<div class="info-left">
					<img src="../../../assets/mine-icon/mine-custom.png" width="20" height="20">
					<span>NAME (官方/合作机构/大师)</span>
				</div>
				<div class="info-right">
					<span>发表于2017.10.29</span>
				</div>
			</div>
			<div class="info-title">
				<p>话题标题，显示完整。话题标题，显示完整。话题标题，显示完整。</p>
			</div>
			<div class="info-subtitle info-font">
				<span>文章副标题文章副标题文章副标题文章副标题文章副标题文章副标题文章副标题文章副标题文章副标题文章副标题</span>
			</div>
		</div>
		<div class="content-infomation">
			content
			<div class="content-icon">
				<img src="../../../assets/information-img/read.png" width="20" height="20">
			</div>
			<div class="content-read">
				<span>100000+阅读</span>
			</div>
		</div>
		<!-- <div class="information-navbar">
			<other-Bottom></other-Bottom>
		</div> -->
	</div>
</template>

<script>
	// import otherBottom from '../../otherLayout/other-components/bottom/other-bottom.vue';

	export default {
		components: {
			//otherBottom
		},
		data() {
			return {

			}
		},

	}
</script>