/*
 * @Author: tarn.tianrun 
 * @Date: 2018-02-07 16:26:40 
 * @Last Modified by: tarn.tianrun
 * @Last Modified time: 2018-02-11 11:43:31
 */

<style scoped lang="less">
	@import './blessing-home.less';
</style>
<style>
	.mint-swipe-indicators {
		width: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		text-align: right;
		padding-right: 20px;
		bottom: 1px;
	}

	.mint-swipe-indicator {
		height: 6px;
		width: 6px;
		margin: 0 8px 6px 8px;
		background: #ffffff;
		opacity: 1;
		bottom: 1px;
	}

	.mint-swipe-indicator.is-active {
		background: #FF6600;
		opacity: 1;
	}
</style>
<template>
	<scroll ref="scroll" :scrollY="freeScroll" :scrollbar="scrollbar" :mouseWheel="mouseWheel">
		<mt-header class="headerActive">
			<img slot="left" src="../../../../assets/panoramic-img/panoramic-blessing-back.png" width="23" height="23" @click="aaa">
			<img slot="right" src="../../../../assets/panoramic-img/panoramic-blessing-more.png" width="20" height="20">
		</mt-header>
		<div class="blessing-home">
			<!-- <mt-button type="primary" @click="vue2Ios">VUE->IOS</mt-button>
		<p style="font-size:32px;margin-top:20px;">{{msgObj}}</p> -->
			<div class="page-swipe">
				<mt-swipe :auto="0">
					<mt-swipe-item class="slide1">1</mt-swipe-item>
					<mt-swipe-item class="slide2">2</mt-swipe-item>
					<mt-swipe-item class="slide3">3</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="blessing-bio">
				<span>场景名称——xxx省xxx市(限制一行一行一行)</span>
				<div class="blessing-subtitle">
					<span>场景名称——xxx省xxx市(限制一行一行一行一行一行一行一行一行一行一行一行一行一行一行一行一行一行一行一行一行一行)</span>
				</div>
			</div>
			<div class="blessing-map">
				<img src="../../../../assets/panoramic-img/panoramic-blessing-map.png" width="15" height="15">
				<span>地理位置 XXX省XXX市XXX区县XXXXX街道XX号111111111</span>
				<img src="../../../../assets/panoramic-img/panoramic-goto.png" width="15" height="15">
			</div>
			<div class="blessing-person">
				<div class="blessing-person-content">
					<div class="blessing-red-point"></div>
					<div class="blessing-person-title">
						<span>相关人物</span>
					</div>
				</div>
				<div class="blessing-swiper">
					<swiper :options="swiperOption">
						<swiper-slide v-for="(item,index) in dataSwipe" :key="item.id">
							<img src="../../../../assets/bottom-bar-icon/mine-in.png" width="50" height="50">
							<span>{{item.name}}</span>
						</swiper-slide>
					</swiper>
				</div>
			</div>
			<div class="blessing-scenes">
				<div class="blessing-person-content">
					<div class="blessing-red-point"></div>
					<div class="blessing-person-title">
						<span>场景介绍</span>
					</div>
				</div>
				<div class="free-scroll-container">
					<div class="blessing-content">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
							irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
							consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
							veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
							proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					</div>
				</div>
			</div>
			<div class="blessing-messages">
				<div class="blessing-person-content">
					<div class="blessing-red-point"></div>
					<div class="blessing-person-title">
						<span>用户留言</span>
					</div>
				</div>
				<div class="blessing-messages-list" v-for="item in messages">
					<div class="user-info">
						<div class="user-info-left">
							<img src="../../../../assets/mine-icon/mine-custom.png" width="25" height="25">
							<span>youku:</span>
						</div>
						<div class="user-info-right">
							<span>2017.10.11 10:22</span>
						</div>
					</div>
					<div class="message-detail">
						<span>
							Cras gravida vel ex at consectetur. Aliquam vel volutpat ante. Integer id tempor eros, at lobortis augue. Etiam ipsum mi,
							placerat eget urna at, placerat sodales lorem. Donec accumsan tempus justo at hendrerit. Donec varius venenatis molestie.
							Sed volutpat nunc lorem.
						</span>
					</div>
					<div class="message-reply">
						<span>回应</span>
					</div>
				</div>
				<div class="messages-loading-more">
					<span>加载更多留言</span>
				</div>
				<div class="messages-posted">
					<textarea name="" id="" cols="30" rows="10" placeholder="留言"></textarea>
					<div class="messages-action">
						<span>取消输入</span>
						<mt-button type="primary" size="small">发表</mt-button>
					</div>
				</div>
			</div>
		</div>
	</scroll>
</template>
<script>
	import Scroll from '../../scroll/scroll.vue'
	export default {
		data() {
			return {
				msgObj: '',
				swiperOption: {
					initialSlide: 0,
					slidesPerView: 5.3,
					spaceBetween: 5,
					freeMode: true,
				},
				dataSwipe: [
					{
						id: 1, name: 'Name'
					}, {
						id: 2, name: 'Name'
					}, {
						id: 3, name: 'Name'
					}, {
						id: 4, name: 'Name'
					}, {
						id: 5, name: 'Name'
					}, {
						id: 6, name: 'Name'
					}, {
						id: 7, name: 'Name'
					}, {
						id: 8, name: 'Name'
					}, {
						id: 9, name: 'Name'
					}, {
						id: 10, name: 'Name'
					}
				],
				freeScroll: true,
				scrollbar: {
					fade: true,
					interactive: false
				},
				mouseWheel: true,
				messages: [
					{
						id: 1, name: 'Name'
					}, {
						id: 2, name: 'Name'
					}, {
						id: 3, name: 'Name'
					}, {
						id: 4, name: 'Name'
					},
				]
			}
		},
		methods: {
			vue2Ios() {
				// window.webkit.messageHandlers.ShowName.postMessage({ body: 'login' });
				// bridge.callHandler('objc_fun1', { 'key': 'hello oc,I from JS' }, function responseCallback(responseData) {
				// 	this.msgObj = 'IOS点击'
				// })
				// this.$bridge.callhandler('ShowName', { 'key': 'hello oc,I from JS' }, (data) => {
				// 	this.msgObj = 'IOS点击'
				// })
				this.$bridge.callHandler('ShowName', { 'key': 'hello oc,I from JS' }, (data) => {
					this.msgObj = 'IOS点击'
				})
			},
			aaa() {
				this.$router.push({
					name: 'panoramicView',
				});
			}
		},
		created() {
			// android/ios 调用js 刷新界面
			// this.$bridge.registerHandler("JSECHO", (data) => {
			// 	this.msgObj = data
			// })

			// js 调用 android/ios 获取用户信息
			// this.$bridge.callHandler('ShowName', {}, function (data) {
			// 	this.msgObj = 'IOS点击'
			// })
		},
		components: {
			Scroll
		}

	}
</script>