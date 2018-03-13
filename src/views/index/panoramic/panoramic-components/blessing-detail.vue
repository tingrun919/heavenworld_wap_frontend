<style scoped lang="less">
	@import "./blessing-detail.less";
</style>
<template>
	<div>
		<div class="blessing-detail-main" :style="{height:viewHeight}">
			<div class="other-header">
				<header-child-Comp :title="title" :isblessing="true" :isShowRight="false"></header-child-Comp>
			</div>
			<div class="v-shadow" v-if="showVideos">
				<img src="../../../../assets/panoramic-img/panoramic-blessing-close.png" @click="closeVideo" width="20" height="20">
			</div>
			<div class="v-video" v-show="showVideos">
				<video playsinline webkit-playsinline id="videoPlay" ref="videoTag" controls="controls" :poster="icon" autoplay="autoplay"
				 :width="viewWidthVideo">
					<source :src="resultData.prayVideo" type="video/mp4" />
				</video>
			</div>
			<div class="v-video">
				<audio :src="resultData.prayVoice" ref="audioTag"></audio>
			</div>
			<scroll ref="scroll" :scrollY="freeScroll" :scrollbar="scrollbar" :mouseWheel="mouseWheel">
				<div class="blesssing-detail-info">
					<div class="info-main">
						<img :src="src" class="info-main-img" :height="viewHeightImg">
						<div class="info-content" :style="viewHeightContent">
							<span>{{resultData.prayContent}}</span>
							<div class="blessing-other">
								<div class="blessing-other-info" :style="{width:viewWidth}" v-show="showOtherAudio" @click="playAudio">
									<img src="../../../../assets/panoramic-img/panoramic-blessing-radio.png" width="20" height="20">
									<span>{{resultData.prayVoicetime}}秒</span>
									<div class="bg" v-bind:class="{ voicePlay : playAudioAnimation }"></div>
								</div>
								<div class="blessing-other-info" :style="{width:viewWidth}" v-show="showOtherVideo" @click="playVideo">
									<img src="../../../../assets/panoramic-img/panoramic-blessing-video.png" width="20" height="20">
									<span>{{resultData.prayVideotime}}秒</span>
								</div>
								<div class="red blessing-other-info" :style="{width:viewWidth}" v-show="showOtherRed">
									<img src="../../../../assets/panoramic-img/panoramic-blessing-gift.png" width="20" height="20">
									<span>手气红包</span>
								</div>
							</div>
						</div>
						<div class="info-user" :style="viewHeightUser">
							<div class="info-user-left" @click="handlePush">
								<img src="../../../../assets/mine-icon/mine-custom.png" width="25" height="25">
								<span>{{resultData.staffName}}（作者）</span>
							</div>
							<div class="info-user-right">
								<span>{{resultData.prayTime}} 发表</span>
							</div>
						</div>
					</div>
				</div>
				<div class="blessing-detail-comment">
					<div class="blessing-person-content">
						<div class="blessing-person-title">
							<div class="blessing-red-point"></div>
							<span>用户留言</span>
						</div>
						<div @click="popupVisible = true">
							<img src="../../../../assets/panoramic-img/panoramic-action-edit.png" width="18" height="18">
							<span>写评论</span>
						</div>
					</div>
					<div class="blessing-messages-list" v-for="item in commentList">
						<div class="user-info">
							<div class="user-info-left" @click="handlePush(item.cStaffid)">
								<img src="../../../../assets/mine-icon/mine-custom.png" width="25" height="25">
								<span>{{item.staffName}}:</span>
							</div>
							<div class="user-info-right">
								<span>{{item.cTime}}</span>
							</div>
						</div>
						<div class="message-detail">
							<span>
								{{item.cContent}}
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
			</scroll>
			<mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
				<div class="detail-comment" contenteditable>
				</div>
				<div class="detail-btn">
					<mt-button type="default" size="small" @click.native="popupVisible = false">取消</mt-button>
					<mt-button type="primary" size="small" @click.native="popupVisible = false">评论</mt-button>
				</div>
			</mt-popup>
		</div>
	</div>
</template>
<script>
	import Scroll from '../../../index/scroll/scroll.vue'
	import headerChildComp from '../../../otherLayout/other-components/header/other-header.vue';
	import img1 from '../../../../assets/view/timg5.jpeg'
	import { Toast } from 'mint-ui';
	
	import blessingService from './scrvice/blessing-detail-service.js'

	export default {
		mixins: [blessingService],
		components: {
			Scroll,
			headerChildComp,
		},
		computed: {
			viewHeight: function () {
				return (window.innerHeight - 42) + 'px'
			},
			viewHeightImg: function () {
				return (window.innerHeight / 2) + 'px'
			},
			viewHeightContent: function () {
				return "height:" + (window.innerHeight / 7 * 4) + 'px'
			},
			viewHeightUser: function () {
				return "padding:" + (window.innerHeight / 6) + 'px' + " 20px" + " 10px" + " 20px"
			},
			viewWidth: function () {
				return (window.innerWidth / 3 - 30) + 'px'
			},
			viewWidthVideo: function () {
				return (window.innerWidth) + 'px'
			},
		},
		watch: {

		},
		beforeMount() {
			this.getBlessingOne(this.$route.params.id)
			this.getCommentList(this.$route.params.id, 1000)
		},
		data() {
			return {
				freeScroll: true,
				mouseWheel: true,
				scrollbar: {
					fade: true,
					interactive: false
				},
				src: img1,
				title: '测试用户的祈福',
				showOtherAudio: false,
				showOtherVideo: false,
				showVideos: false,
				icon: '',
				showOtherRed: false,
				playAudioAnimation: false,
				audioDuration: '',
				// videoDuration: '',
				popupVisible: false,
				resultData: [],
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
				],
				commentList:[],
			}
		},
		methods: {
			playAudio() {
				if (this.$refs.audioTag.paused) {
					this.playAudioAnimation = true
					this.$refs.audioTag.load()
					this.$refs.audioTag.play()
					setTimeout(() => {
						this.playAudioAnimation = false
					}, this.resultData.prayVoicetime * 1000);
				} else {
					this.playAudioAnimation = false
					this.$refs.audioTag.pause()
				}
			},
			playVideo() {
				this.$refs.videoTag.play()
				this.showVideos = true;
			},
			closeVideo() {
				this.$refs.videoTag.currentTime = 0;
				this.$refs.videoTag.pause()
				this.showVideos = false;
			},
			handlePush(id) {
				if (this.$store.state.app.currentPageFromIos) {
					this.$bridge.callHandler('handlePush', { 'to': 'otherUserCenter', 'id': `${id}` }, (data) => { })
				} else if (this.$store.state.app.currentPageFromAndroid) {
					android.showVideo();
				} else {
					Toast('此项功能为客户端专享，赶紧前往下载体验吧~');
				}
			}
		}
	}
</script>