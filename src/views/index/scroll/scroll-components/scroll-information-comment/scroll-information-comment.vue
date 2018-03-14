<style scoped lang="less">
	@import './scroll-information-comment.less';
	/* @import '../../../panoramic/panoramic-components/blessing-detail.less'; */
</style>
<template>
	<div class="blessing-detail-comment">
		<div class="blessing-messages-list">
			<div class="user-info">
				<div class="user-info-left" @click="handlePush(item.cStaffid)">
					<img src="../../../../../assets/mine-icon/mine-custom.png" width="25" height="25">
					<span>{{item.staffNickname}}:</span>
				</div>
				<div class="user-info-right">
					<span>{{item.comDate | moment}}</span>
				</div>
			</div>
			<div class="message-detail">
				<span>
					{{item.comContent}}
				</span>
			</div>
			<div class="message-reply">
				<span @click="popupVisible = true">回应</span>
			</div>
		</div>
		<!-- <div class="messages-loading-more">
					<span>加载更多留言</span>
				</div>
				<div class="messages-posted">
					<textarea name="" id="" cols="30" rows="10" placeholder="留言"></textarea>
					<div class="messages-action">
						<span>取消输入</span>
						<mt-button type="primary" size="small">发表</mt-button>
					</div>
				</div> -->
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