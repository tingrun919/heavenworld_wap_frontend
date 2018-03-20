<style scoped lang="less">
	@import './information-comment.less';
</style>
<template>
	<div class="scroll-list-wrap" :style="{height:viewHeight}" slot="demo">
		<scroll ref="scroll" :data="items" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj"
		 :startY="parseInt(startY)" @push="clickItem" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
		</scroll>
		<img class="img-comment" @click="handleComment" src="../../../assets/panoramic-img/panoramic-action-edit.png" width="50" height="50">
		<mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
			<div class="detail-comment" contenteditable ref="divContent">
			</div>
			<div class="detail-btn">
				<mt-button type="default" size="small" @click.native="popupVisible = false">取消</mt-button>
				<mt-button type="primary" size="small" @click.native="handleCommentApi">评论</mt-button>
			</div>
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
				popupVisible:false,
				commentId:'',
				commentType:'',
			}
		},
		created() {
			// this.items = this.tabType
		},
		beforeMount() {
			this.getInformationCommentList(this.$route.params.id)
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
			}
		},
		computed: {
			viewHeight: function () {
				return (window.innerHeight - 41) + 'px'
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
			// tabType: function () {
			// 	var resultList = []
			// 	for (var i = 1; i < 4; i++) {
			// 		var item = {
			// 			isPic: i,
			// 			bavbar: this.$store.state.app.currentPageName,
			// 		}
			// 		resultList.push(item);
			// 	}
			// 	return resultList;
			// }
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
				if(param[0] == 'name'){

				}else{
					this.popupVisible = true
					this.commentId = param[1]
					this.commentType = 1
				}
			},
			handleComment(){
				this.popupVisible = true
				this.commentId = 0
				this.commentType = 0
			},
			handleCommentApi(){
				this.addComment('21232f297a57a5a743894a0e4a801fc55', this.$route.params.id, this.commentType == 1 ? this.commentId : 0, this.$refs.divContent.innerHTML, this.commentType).then(res => {
					this.popupVisible = false
					MessageBox.alert('提示', res.data.code == 100000 ? '评论成功!' : '评论失败!请联系系统管理员!').then(() => {
						this.getInformationCommentList(this.$route.params.id)
					})
				})
			}
		}
	}
</script>