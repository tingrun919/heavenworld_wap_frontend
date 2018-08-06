<style scoped lang="less">
	@import './scroll-information-comment.less';
	/* @import '../../../panoramic/panoramic-components/blessing-detail.less'; */
</style>
<template>
	<div class="blessing-detail-comment">
		<div class="blessing-messages-list">
			<div class="user-info">
				<div class="user-info-left">
					<img :src="item.staffPortrait" @click="handlePush('name',item.comUserid)" width="25" height="25">
					<span>{{item.staffNickname}}:
						<span v-if="item.comPcomid" style="color:#3d3d3d;">回应</span>
						<span v-if="item.comPcomid" @click="handlePush('name',item.pStaffid)">{{item.staffNickname1}}</span>
					</span>
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
				<span @click="handlePush('comment',item.comId)" v-if="isShow">回应</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			item: {
				type: Object,
			},
			isShow: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			handlePush(arg1, arg2) {
				var param = [arg1, arg2]
				this.$emit('pushComment', param)
			}
		},
		created() {
			
			var from = this.$route.query.pageFrom;
			console.log(from);
			if(from === "detailPages") {
				this.handlePush('comment', this.item.comId);
			}
		}
	}
</script>