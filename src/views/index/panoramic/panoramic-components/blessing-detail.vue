<style scoped lang="less">
	@import "./blessing-detail.less";
</style>
<style>
	.mint-cell-value > textarea{
		background-color: rgba(213, 213, 213, .6);
	}
	.mint-field.is-textarea .mint-cell-value{
		padding: 10px 0;
	}
</style>
<template>
	<div>
		<div class="blessing-detail-main" :style="{height:viewHeight}">
			<div class="other-header">
				<header-child-Comp :title="resultData.staffNickname+'的祈福'" :isblessing="true" :isShowRight="false"></header-child-Comp>
			</div>
			<div class="v-shadow" v-if="showVideos">
				<img src="../../../../assets/panoramic-img/panoramic-blessing-close.png" @click="closeVideo" width="20" height="20">
			</div>
			<div class="v-video" v-show="showVideos">
				<video playsinline webkit-playsinline id="videoPlay" ref="videoTag" controls="controls" :poster="icon" autoplay="autoplay"
				 :width="viewWidthVideo">
					<!-- <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4" /> -->
					<source :src="resultData.prayVideo" type="video/mp4" />
				</video>
			</div>
			<div class="v-video">
				<audio :src="resultData.prayVoice" ref="audioTag"></audio>
			</div>
			<scroll ref="scroll" :scrollY="freeScroll" :scrollbar="scrollbar" :mouseWheel="mouseWheel">
				<div class="blesssing-detail-info">
					<div class="info-main">
						<!-- <img :src="src" class="info-main-img" :height="viewHeightImg"> -->
						<div class="info-main-img" v-bind:style="{height: viewHeightImg}"></div>
						<div class="info-content" v-bind:style="{backgroundImage: 'url(' + src + ')',height: viewHeightContent}">
							<span class="pray-content1">{{resultData.prayContent}}</span>
							<!-- <div class="pray-content">{{resultData.prayContent}}</div> -->
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
							<div class="info-user-left">
								<img v-lazy="resultData.staffPortrait" width="25" height="25" @click="handlePush(resultData.prayStaffid)">
								<span @click="handlePush(resultData.prayStaffid)">{{resultData.staffNickname}}（作者）</span>
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
						<div @click="handleReplyComment(0, 1)">
							<img src="../../../../assets/panoramic-img/panoramic-action-edit.png" width="18" height="18">
							<span>写评论</span>
						</div>
					</div>
					<div class="blessing-messages-list-nodata" v-if="commentList.length <= 0">
						<img src="../../../../assets/nodata.png" :width="viewHeightImgNodata" :height="viewHeightImgNodata">
					</div>
					<div class="blessing-messages-list" v-for="item in commentList" v-else>
						<div class="user-info">
							<div class="user-info-left">
								<img v-lazy="item.staffPortrait1" width="25" height="25" @click="handlePush(item.cStaffid)">
								<span @click="handlePush(item.cStaffid)">{{item.staffNickname}}:</span>
							</div>
							<div class="user-info-right">
								<span>{{item.cTime | moment}}</span>
							</div>
						</div>
						<div class="message-detail">
							<span v-if="item.pId" style="color:#3399FF;">@</span>
							<span v-if="item.pId" style="color:#3399FF;" @click="handlePush(item.pStaffid)">{{item.staffNickname1}}:</span>
							<span>
								{{item.cContent}}
							</span>
						</div>
						<div class="message-reply">
							<span @click="handleReplyComment(item.cId, 2)">回应</span>
						</div>
					</div>
					<div class="messages-loading-more" v-if="commentList.length > 0">
						<span @click="handleMoreComment">加载更多留言</span>
					</div>
				</div>
			</scroll>
			<mt-popup v-model="popupVisible" position="top" class="mint-popup">
				<mt-field placeholder="请输入评论内容" type="textarea" :attr="{ maxlength: 140 }" rows="6" v-model="introduction"></mt-field>
				<div class="detail-btn">
					<mt-button type="default" size="small" @click.native="handleCancelComment">取消</mt-button>
					<mt-button type="primary" size="small" @click.native="handleComment">评论</mt-button>
				</div>
			</mt-popup>
		</div>
	</div>
</template>
<script>
	import Scroll from '../../../index/scroll/scroll.vue'
	import headerChildComp from '../../../otherLayout/other-components/header/other-header.vue';
	import img1 from '../../../../assets/view/timg5.jpeg'
	import { MessageBox } from 'mint-ui';
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
				return (window.innerWidth / 2) + 'px'
			},
			viewHeightContent: function () {
				return ((window.innerWidth - 60) / 5 * 4) + 'px'
			},
			viewHeightUser: function () {
				return "padding:" + (window.innerHeight / 5.5) + 'px' + " 20px" + " 10px" + " 20px"
			},
			viewWidth: function () {
				return (window.innerWidth / 3 - 30) + 'px'
			},
			viewWidthVideo: function () {
				return (window.innerWidth) + 'px'
			},
			viewHeightImgNodata: function () {
				return window.innerHeight / 3
			},
		},
		mounted(){
			let from = this.$route.query.from
			if (from == 'ios') {
				this.$store.commit('setCurrentPageFromIos', true);
				this.$store.commit('setCurrentPageFromAndroid', false);
			} else if (from == 'android') {
				this.$store.commit('setCurrentPageFromAndroid', true);
				this.$store.commit('setCurrentPageFromIos', false);
			} else {
				this.$store.commit('setCurrentPageFromAndroid', false);
				this.$store.commit('setCurrentPageFromIos', false);
			}
		},
		beforeMount() {
			this.getBlessingOne(this.$route.params.id)
			this.getCommentList(this.$route.params.id, 5)
			this.$Lazyload.config({ error: '../../../../../static/userIcon2@3x.png' })
		},
		watch: {
			popupVisible() {
				if (this.popupVisible == false) {
					this.introduction = ''
				}
			}
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
				title: '',
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
				commentList: [],
				introduction: '',
				commentType: 1,
				commentId: '',
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
			},
			//打开评论窗口
			//type：1 -> 评论
			//type：2 -> 回复
			handleReplyComment(id, type) {
				this.popupVisible = true
				this.commentId = id
				this.commentType = type
			},
			//添加评论，回复评论
			handleComment() {
				this.addComment('21232f297a57a5a743894a0e4a801fc55', this.resultData.prayPanoid, this.commentId, this.introduction, this.commentType, this.resultData.prayId).then(res => {
					this.handleCancelComment()
					MessageBox.alert('提示', res.data.code == 100000 ? '评论成功!' : '评论失败!请联系系统管理员!').then(() => {
						this.getCommentList(this.$route.params.id, 1000)
					})
				})
			},
			//取消评论，清空model
			handleCancelComment() {
				this.popupVisible = false
			},
			//加载更多评论
			handleMoreComment() {
				this.getMoreComment(this.resultData.prayId, this.commentList[this.commentList.length - 1].cId, 5).then(res => {
					if (res.data.data.length > 0) {
						res.data.data.forEach(item => {
							this.commentList.push(item)
						});
					} else {
						MessageBox('提示', '已经显示所有的评论啦！')
					}
				})
			},
		}
	}
</script>