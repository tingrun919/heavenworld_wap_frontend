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
	import { MessageBox } from 'mint-ui';
	import otherBottomService from './service/other-bottom-service.js'
	import informationDetailService from '../../../information/information-detail/information-detail-service/information-detail-service.js'

	export default {
		mixins: [otherBottomService, informationDetailService],
		data() {
			return {
				selected: '',
				resultValue: [],
				resultData: [],
				selectColl: false,
				selectP: false,
				count: 0,
				token: '',
			}
		},
		created() {
			window.giveToken = this.giveToken;
		},
		computed: {
			commentCount() {
				return this.$store.state.app.information.commentCount
			}
		},
		mounted() {
			setTimeout(() => {
				let from = this.$route.query.from
				if (from == 'ios') {
					this.$store.commit('setCurrentPageFromIos', true);
					this.$store.commit('setCurrentPageFromAndroid', false);
					this.$bridge.callHandler('hasToken', {}, (data) => {
						this.token = data.token
						this.getInformationDetail(this.$route.params.id, data.token).then(() => {
							this.count = this.resultData.praiseCount
							this.selectP = this.resultData.praiseState == 1 ? true : false
							let setStatusI = this.resultData.collectState
							if (setStatusI == 1) {
								this.selectColl = true
							} else {
								this.selectColl = false
							}
						})
					})
				} else if (from == 'android') {
					this.$store.commit('setCurrentPageFromAndroid', true);
					this.$store.commit('setCurrentPageFromIos', false);
					android.getToken2();
				} else {
					this.$store.commit('setCurrentPageFromAndroid', false);
					this.$store.commit('setCurrentPageFromIos', false);
				}
			}, 500)
		},
		beforeMount() {
			// setTimeout(() => {
			// 	this.count = this.$store.state.app.information.praiseCount
			// 	alert(this.count)
			// 	this.selectP = this.$store.state.app.information.praiseState == 1 ? true : false
			// 	let setStatusI = this.$store.state.app.statusI
			// 	if (setStatusI == 1) {
			// 		this.selectColl = true
			// 	} else {
			// 		this.selectColl = false
			// 	}
			// }, 1000)
			let from = this.$route.query.from
			if (from == 'android') {
				setTimeout(() => {
					let token = this.$store.state.app.userToken
					this.getInformationDetail(this.$route.params.id, token).then(() => {
						this.count = this.resultData.praiseCount
						this.selectP = this.resultData.praiseState == 1 ? true : false
						let setStatusI = this.resultData.collectState
						if (setStatusI == 1) {
							this.selectColl = true
						} else {
							this.selectColl = false
						}
					})
				}, 600)
			}
		},
		methods: {
			handleBottombar(bottombar) {
				let token = this.$store.state.app.userToken
				if (token) {
					this.handleAddCollect(token, this.$route.params.id, 2, this.selectColl ? 0 : 1).then(() => {
						this.selectColl = !this.selectColl
						this.$store.commit('setStatusI', this.selectColl ? 0 : 1);
					})
				} else {
					let from = this.$route.query.from
					if (from == 'ios') {
						this.$store.commit('setCurrentPageFromIos', true);							this.$bridge.callHandler('clickZan', {}, (data) => {
							})
						this.$store.commit('setCurrentPageFromAndroid', false);

					} else if (from == 'android') {
						this.$store.commit('setCurrentPageFromAndroid', true);
						this.$store.commit('setCurrentPageFromIos', false);
						android.getToken()
					} else {
						this.$store.commit('setCurrentPageFromAndroid', false);
						this.$store.commit('setCurrentPageFromIos', false);
						MessageBox.confirm('此项功能为客户端专享，赶紧前往下载体验吧~').then(action => { window.location.href = "https://www.pgyer.com/Tpka" });
					}
				}
			},
			//跳转到评论列表
			handleCommentList() {
				let from = this.$route.query.from
				if (from == 'ios') {
					let argu = { id: this.$route.params.id, from: from };
					this.$router.push({
						name: 'information_comment',
						params: argu
					})
				} else if (from == 'android') {
					let argu = { id: this.$route.params.id, from: from };
					this.$router.push({
						name: 'information_comment',
						params: argu
					})
				}else {
					MessageBox.confirm('此项功能为客户端专享，赶紧前往下载体验吧~').then(action => { window.location.href = "https://www.pgyer.com/Tpka" });
				}
			},
			share() {
				if (this.$store.state.app.currentPageFromIos) {
					this.$bridge.callHandler('appShare', { 'title': this.$store.state.app.information.infoTitle, 'description': this.$store.state.app.information.infoSubtitle, 'url': `http://www.tiantangshijie.com${this.$route.path}` }, (data) => { })
				} else if (this.$store.state.app.currentPageFromAndroid) {
					android.doShare(this.$store.state.app.information.infoTitle, this.$store.state.app.information.infoSubtitle == null ? '' : this.$store.state.app.information.infoSubtitle, `http://www.tiantangshijie.com${this.$route.path}`);
				} else {
					MessageBox.confirm('此项功能为客户端专享，赶紧前往下载体验吧~').then(action => { window.location.href = "https://www.pgyer.com/Tpka" });
				}
			},
			giveToken(token) {
				if (token) {
					this.$store.commit('setUserToken', token);
				}
			},
			handlePraise() {
				this.resultValue = this.$store.state.app.information
				if (this.resultValue.praiseState == 0) {
					if (this.$store.state.app.userToken) {
						this.handlePraiseNetWork(this.$store.state.app.userToken, this.resultValue.infoId, this.$store.state.app.userId).then(() => {
							this.selectP = true
							this.count = Number(this.count) + 1
							this.resultValue.praiseState = 1
						})
					} else {
						let from = this.$route.query.from
						if (from == 'ios') {
							this.$store.commit('setCurrentPageFromIos', true);
							this.$store.commit('setCurrentPageFromAndroid', false);
							this.$bridge.callHandler('clickZan', {}, (data) => {
							})
						} else if (from == 'android') {
							this.$store.commit('setCurrentPageFromAndroid', true);
							this.$store.commit('setCurrentPageFromIos', false);
							android.getToken()
						} else {
							this.$store.commit('setCurrentPageFromAndroid', false);
							this.$store.commit('setCurrentPageFromIos', false);
							MessageBox.confirm('此项功能为客户端专享，赶紧前往下载体验吧~').then(action => { window.location.href = "https://www.pgyer.com/Tpka" });
						}
					}
				} else {
					Toast('您已经点过赞啦～');
				}
			}
		}
	}
</script>