/* * @Author: tarn.tianrun * @Date: 2018-03-21 13:53:50 * @Last Modified by: tarn.tianrun * @Last Modified time: 2018-06-28
20:46:01 */

<style scoped lang="less">
	@import './information-comment.less';
</style>
<style>
	.mint-cell-value>textarea {
		/* background-color: rgba(213, 213, 213, .6); */
	}

	.mint-field.is-textarea .mint-cell-value {
		margin-bottom: 10px;
		padding: 5px;
		border: 1px solid #888888;
		border-radius: 4px;
	}
</style>
<template>
	<div class="scroll-list-wrap" :style="{height:viewHeight}" slot="demo">
		<scroll ref="scroll" v-if="items.length > 0" :data="items" :scrollbar="scrollbarObj" :startY="parseInt(startY)" @push="clickItem">
		</scroll>
		<div class="blessing-messages-list-nodata" v-if="items.length <= 0">
			<img src="../../../assets/nodata.png" :width="viewHeightImgNodata" :height="viewHeightImgNodata">
		</div>
		<img class="img-comment" @click="handleComment" src="../../../assets/panoramic-img/panoramic-action-edit.png" width="50"
		 height="50">
		<mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
			<div class="detail-btn">
				<mt-button type="default" size="small" @click.native="handleCancelComment">取消</mt-button>
				<mt-button type="primary" size="small" @click.native="handleHastoken">评论</mt-button>
			</div>
			<mt-field placeholder="请输入评论内容" type="textarea" :attr="{ maxlength: 140 }" rows="6" v-model="introduction"></mt-field>
		</mt-popup>
	</div>
</template>
<script>
	import Scroll from '../../index/scroll/scroll.vue'
	import informationCommentService from '../service/informationCommentService.js'
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		mixins: [informationCommentService],
		components: {
			Scroll,
		},
		data() {
			return {
				scrollbar: true,
				scrollbarFade: true,
				pullDownRefresh: true,
				pullDownRefreshThreshold: 90,
				pullDownRefreshStop: 40,
				pullUpLoad: true,
				pullUpLoadThreshold: 0,
				pullUpLoadMoreTxt: '加载更多',
				pullUpLoadNoMoreTxt: '没有更多数据了',
				startY: 0,
				scrollToX: 0,
				scrollToY: -200,
				scrollToTime: 700,
				scrollToEasing: 'bounce',
				scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
				items: [],
				itemIndex: 0,
				popupVisible: false,
				commentId: '',
				commentType: '',
				introduction: '',
				token: '',
				from: '',
			}
		},
		created() {
			// this.items = this.tabType
			window.giveToken = this.giveToken;

			var from = this.$route.params.pageFrom;
			let id = this.$route.params.id;
			if (from === "detailPages") {
				this.popupVisible = true
				this.commentId = id
				this.commentType = 1
			}
		},
		beforeMount() {
			this.from = this.$route.params.from
			this.getInformationCommentList(this.$route.params.id)
			this.$bridge.registerHandler("giveToken", (data) => {
				this.giveToken1(data)
			})
		},
		watch: {
			// tabType() {
			// 	this.items = this.tabType
			// },
			scrollbarObj: {
				handler() {
					this.rebuildScroll()
				},
				deep: true
			},
			pullDownRefreshObj: {
				handler() {
					this.rebuildScroll()
				},
				deep: true
			},
			pullUpLoadObj: {
				handler() {
					this.rebuildScroll()
				},
				deep: true
			},
			startY() {
				this.rebuildScroll()
			},
			popupVisible() {
				if (this.popupVisible == false) {
					this.introduction = ''
				}
			}
		},
		computed: {
			viewHeight: function () {
				return (window.innerHeight) + 'px'
			},
			scrollbarObj: function () {
				return this.scrollbar ? { fade: this.scrollbarFade } : false
			},
			pullDownRefreshObj: function () {
				return this.pullDownRefresh ? {
					threshold: parseInt(this.pullDownRefreshThreshold),
					stop: parseInt(this.pullDownRefreshStop)
				} : false
			},
			pullUpLoadObj: function () {
				return this.pullUpLoad ? {
					threshold: parseInt(this.pullUpLoadThreshold),
					txt: { more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt }
				} : false
			},
			viewHeightImgNodata: function () {
				return window.innerHeight / 3
			},
		},
		methods: {
			onPullingDown() {
				// 模拟更新数据
				console.log('pulling down and load data')
				setTimeout(() => {
					if (this._isDestroyed) {
						return
					}
					var random = Math.random();
					console.log(random, 'random data')
					if (random > 0.5) {
						// 如果有新数据
						for (let i = 0; i < 3; i++) {
							var item = {
								isPic: i,
								bavbar: this.$store.state.app.currentPageName,
							}
							this.items.unshift(item);
						}
					} else {
						// 如果没有新数据
						this.$refs.scroll.forceUpdate()
					}
				}, 2000)
			},
			onPullingUp() {
				// 更新数据
				console.log('pulling up and load data')
				setTimeout(() => {
					if (this._isDestroyed) {
						return
					}
					var random = Math.random();
					console.log(random, 'random data')
					if (random > 0.5) {
						// 如果有新数据
						this.items = this.items.concat(this.tabType)
					} else {
						// 如果没有新数据
						this.$refs.scroll.forceUpdate()
					}
				}, 1500)
			},
			//type：1 -> 评论
			//type：2 -> 回复
			clickItem(param) {
				if (param[0] == 'name') {
					this.handlePush(param[1])
				} else if (param[0] == 'name1') {
					this.handlePush(param[1])
				} else {
					this.popupVisible = true
					this.commentId = param[1]
					this.commentType = 1
				}
			},
			//取消评论，清空model
			handleCancelComment() {
				this.popupVisible = false
			},
			handleHastoken() {
				if (this.from == 'ios') {
					this.$bridge.callHandler('getToken', {}, (data) => { })
				} else if (this.from == 'android') {
					android.getToken();
				} else {
				}
			},
			giveToken(token) {
				if (token) {
					this.token = token
					this.handleCommentApi()
				}
			},
			giveToken1(token) {
				if (token.token) {
					this.token = token.token
					this.handleCommentApi()
				}
			},
			handleComment() {
				this.popupVisible = true
				this.commentId = 0
				this.commentType = 0
			},
			handlePush(id) {
				if (this.$store.state.app.currentPageFromIos) {
					this.$bridge.callHandler('handlePush', { 'to': 'otherUserCenter', 'id': `${id}` }, (data) => { })
				} else if (this.$store.state.app.currentPageFromAndroid) {
					android.otherUserCenter(`${id}`);
				} else {
					MessageBox.confirm('此项功能为客户端专享，赶紧前往下载体验吧~').then(action => { window.location.href = "https://www.pgyer.com/Tpka" });
				}
			},
			URLencode(sStr) {
				return sStr.replace(/\+/g, '%2B');
			},
			handleCommentApi() {
				var s = this.URLencode(this.introduction)
				if (s.length <= 0) {
					MessageBox.alert('提示', '请输入评论内容！')
				} else {
					this.addComment(this.token, this.$route.params.id, this.commentType == 1 ? this.commentId : 0, s, this.commentType).then(res => {
						this.handleCancelComment()
						MessageBox.alert('提示', res.data.code == 100000 ? '评论成功!' : '评论失败!请联系系统管理员!').then(() => {
							this.getInformationCommentList(this.$route.params.id)
						})
					})
				}
			}
		}
	}
</script>