<style>
	@import './panoramic.less';
</style>
<template>
	<div class="scroll-list-wrap" :style="{height:viewHeight}" slot="demo">
		<scroll ref="scroll" :data="items" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj"
		 :startY="parseInt(startY)" @pullingDown="onPullingDown" @pullingUp="onPullingUp" @click="clickItem">
		</scroll>
	</div>
</template>
<script>
	import Scroll from '../scroll/scroll.vue'
	export default {
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
				pullUpLoadMoreTxt: '正在加载',
				pullUpLoadNoMoreTxt: '没有更多',
				startY: 0,
				scrollToX: 0,
				scrollToY: -200,
				scrollToTime: 700,
				scrollToEasing: 'bounce',
				scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
				items: [],
				itemIndex: 0
			}
		},
		created() {
			for (let i = 0; i < 2; i++) {
				this.items.push(this.tabType)
			}
		},
		watch: {
			tabType() {
				this.items = []
				for (let i = 0; i < 2; i++) {
					this.items.push(this.tabType)
				}
			},
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
				return (window.innerHeight - 140) + 'px'
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
			tabType: function () {
				return this.$store.state.app.currentPageName;
			}
		},
		methods: {
			onPullingDown() {
				// 模拟更新数据
				console.log('pulling down and load data')
				setTimeout(() => {
					if (this._isDestroyed) {
						return
					}
					if (Math.random() > 0.5) {
						// 如果有新数据
						this.items.unshift(new Date())
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
					if (Math.random() > 0.5) {
						// 如果有新数据
						let newPage = []
						for (let i = 0; i < 3; i++) {
							newPage.push(this.$store.state.app.currentPageName)
						}
						this.items = this.items.concat(newPage)
					} else {
						// 如果没有新数据
						this.$refs.scroll.forceUpdate()
					}
				}, 1500)
			},
			clickItem() {
				this.$router.push({
                        name: 'panoramic_view'
                    });
			},
		}
	}
</script>