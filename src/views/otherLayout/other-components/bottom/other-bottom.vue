<style scoped lang="less">
	@import "./other-bottom.less";
</style>
<template>
	<mt-tabbar v-model="selected">
		<mt-tab-item id="panoramic" @click.native="handlePraise">
			<img slot="icon" v-if="selectP" src="../../../../assets/information-img/like-in.png">{{count}}人点赞
			<img slot="icon" v-if="!selectP" src="../../../../assets/information-img/like.png"> 
		</mt-tab-item>
		<mt-tab-item id="information" @click.native="share">
			<img slot="icon" src="../../../../assets/information-img/share.png"> 分享
		</mt-tab-item>
		<mt-tab-item id="find" @click.native="handleBottombar">
			<img slot="icon" v-if="!selectColl" src="../../../../assets/information-img/collection.png">
			<img slot="icon" v-if="selectColl" src="../../../../assets/information-img/collection-in.png"> 收藏
		</mt-tab-item>
		<mt-tab-item id="mine" @click.native="handleCommentList">
			<img slot="icon" src="../../../../assets/information-img/comment.png">{{commentCount}}人评论
		</mt-tab-item>
	</mt-tabbar>
</template>
<script>
	import { Toast } from 'mint-ui';
	import otherBottomService from './service/other-bottom-service.js'
	export default {
		mixins: [otherBottomService],
		data() {
			return {
				selected: '',
				resultData: [],
				selectColl:false,
				selectP: false,
				count:0,
			}
		},
		computed: {
			commentCount() {
				return this.$store.state.app.information.commentCount
			}
		},
		beforeMount() {
			setTimeout(() => {
				this.count = this.$store.state.app.information.praiseCount
				this.selectP = this.$store.state.app.information.praiseState == 1 ? true : false
				let setStatusI = this.$store.state.app.statusI
				if (setStatusI == 1) {
					this.selectColl = true
				} else {
					this.selectColl = false
				}
			},900)
		},
		methods: {
			handleBottombar(bottombar) {
				let token = this.$store.state.app.userToken
				this.handleAddCollect(token, this.$route.params.id, 2, this.selectColl ? 0 : 1).then(() => {
					this.selectColl = !this.selectColl
					this.$store.commit('setStatusI', this.selectColl ? 0 : 1);
				})
			},
			//跳转到评论列表
			handleCommentList() {
				let from = this.$route.query.from
				let argu = { id: this.$route.params.id ,from:from};
				this.$router.push({
					name: 'information_comment',
					params: argu
				})
			},
			share() {
				if (this.$store.state.app.currentPageFromIos) {
					this.$bridge.callHandler('appShare', { 'title': this.$store.state.app.information.infoTitle, 'description': this.$store.state.app.information.infoSubtitle, 'url': `http://www.tiantangshijie.com${this.$route.path}` }, (data) => { })
				} else if (this.$store.state.app.currentPageFromAndroid) {
					android.doShare(this.$store.state.app.information.infoTitle, this.$store.state.app.information.infoSubtitle, `http://www.tiantangshijie.com${this.$route.path}`);
				} else {
					Toast('此项功能为客户端专享，赶紧前往下载体验吧~');
				}
			},
			handlePraise() {
				this.resultData = this.$store.state.app.information
				if (this.resultData.praiseState == 0) {
					if (this.$store.state.app.userToken && this.$store.state.app.userId) {
						this.handlePraiseNetWork(this.$store.state.app.userToken, this.resultData.infoId, this.$store.state.app.userId).then(() => {
							this.selectP = true
							this.count =  new Number(this.count + 1)
							this.resultData.praiseState = 1
						})
					} else {
						Toast('请先登录！');
					}
				} else {
					Toast('您已经点过赞啦～');
				}
			}
		}
	}
</script>