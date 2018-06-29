<style scoped lang="less">
	@import './affiliation-less.less';
</style>
<template>
	<div class="affiliation-list-main" :style="{height:viewHeight}">
		<!-- <div class="other-header">
			<header-child-Comp :title="title1" :isblessing="true" :isShowRight="false" :isShowRightMore="false"></header-child-Comp>
		</div> -->
		<scroll ref="scroll" :scrollY="freeScroll" :scrollbar="scrollbar" :mouseWheel="mouseWheel">
			<div class="advertising-img" @click="toAdvertising" v-bind:style="{backgroundImage: 'url(' + resultValue[0].no_mainpic + ')',height:viewHeightAdvertising}">
				<!-- <p>广告位文本限制一行</p> -->
			</div>
			<div class="score-main" v-for="(item,index) in resultData" :key="index">
				<div class="score-main-left">
					<span>{{item.rowno}}</span>
					<img :src="item.staffPortrait" width="25" height="25">
					<span>{{item.staffNickname}}</span>
				</div>
				<div class="score-main-right">
					<span>{{item.inIntegral}}</span>
					<div class="score-main-right-title">
						<span>{{item.staffType}}</span>
						<img src="../../../../assets/score-img/heart-in.png" width="15" height="15" @click="handledz(item.inUserid)">
					</div>
				</div>
			</div>
		</scroll>
	</div>
</template>
<script>
	import Scroll from '../../../index/scroll/scroll.vue'
	import headerChildComp from '../../../otherLayout/other-components/header/other-header.vue';
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import img2 from '../../../../assets/view/timg8.jpg'
	import affiliationIndexService from './scrvice/affiliation-index-service.js'

	export default {
		mixins:[affiliationIndexService],
		components: {
			Scroll,
			headerChildComp,
		},
		computed: {
			viewHeight: function () {
				return (window.innerHeight) + 'px'
			},
			viewHeightAdvertising: function () {
				// return (window.innerHeight / 5) + 'px'
				return 200 + 'px'
			},
		},
		mounted() {

		},
		beforeMount() {
			this.getSingleAffiliation(this.$route.params.id, this.$store.state.app.userToken)
			this.getPanoNotice()
		},
		watch: {

		},
		data() {
			return {
				freeScroll: true,
				scrollbar: {
					fade: true,
					interactive: false
				},
				mouseWheel: true,
				title1: '我的结缘榜',
				img: img2,
				resultData:[],
				resultValue:[],
			}
		},
		methods: {
			toAdvertising(){
				this.$router.push({
					name: 'advertising_view'
				});
			},
			handledz(userId){
				this.dzApi(userId).then(res => {
					if(res.code == 100000){
						Toast('点赞成功！')
						this.getSingleAffiliation(this.$route.params.id, this.$store.state.app.userToken)
					}
				})
			}
		}
	}
</script>