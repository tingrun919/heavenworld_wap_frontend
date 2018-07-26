<style scoped lang="less">
	@import './information-detail.less';
</style>
<style>
	.information-content {
		padding: 0 12px;
		line-height: 2;
	}

	.information-content img {
		width: 100%;
		height: auto;
	}
</style>
<template>
	<!-- <scroll ref="scroll" :scrollY="freeScroll" :scrollbar="scrollbar" :mouseWheel="mouseWheel" :style="{height:viewHeight}"> -->
	<div class="information-detail-main" :style="{height:viewHeight}">
		<div class="v-video" v-if="showVideos">
			<video playsinline webkit-playsinline ref="videoTag" controls="controls" :poster="resultData.infoMainpic" autoplay="autoplay"
			 :width="viewWidthVideo">
				<source :src="resultData.infoVideo" type="video/mp4" />
			</video>
		</div>
		<div class="info-infomation">
			<div class="user-info">
				<div class="info-left">
					<!-- <img v-lazy="resultData.staffPortrait" width="40" height="40"> -->
					<div v-if="resultData.staffPortrait" @click="handlePush(resultData.infoStaffId)" class="info-header-img" v-bind:style="{backgroundImage: 'url(' + resultData.staffPortrait + ')'}"></div>
					<div v-else class="info-header-img info-default"></div>
					<!-- <img src="../../../assets/mine-icon/mine-custom.png" width="20" height="20"> -->
					<span>{{resultData.staffNickname}}</span>
				</div>
				<div class="info-right">
					<span>发表于{{resultData.infoCreatdate | moment}}</span>
				</div>
			</div>
			<div class="info-title">
				<p v-bind:style="{fontSize: fontSize + 'px'}">{{resultData.infoTitle}}</p>
			</div>
			<div class="info-subtitle info-font" v-bind:style="{fontSize: fontSize-2 + 'px'}">
				<span>{{resultData.infoSubtitle}}</span>
			</div>
		</div>
		<div class="content-infomation">
			<div v-html="resultData.infoContent" class="information-content" v-bind:style="{fontSize: fontSize + 'px'}"></div>
			<div class="content-icon">
				<img src="../../../assets/information-img/read.png" width="20" height="20">
			</div>
			<div class="content-read">
				<span>{{resultData.infoReadnum}}
					<span v-if="resultData.infoReadnum > 1000">+</span>阅读</span>
			</div>
		</div>
	</div>
	<!-- </scroll> -->
</template>

<script>
	import informationDetailService from './information-detail-service/information-detail-service.js'
	import Scroll from '../../index/scroll/scroll.vue'
	import { Indicator } from 'mint-ui';

	export default {
		mixins: [informationDetailService],
		components: {
			//otherBottom
			Scroll
		},
		computed: {
			viewHeight: function () {
				return (window.innerHeight - 45) + 'px'
			},
			viewWidthVideo: function () {
				return (window.innerWidth) + 'px'
			},
		},
		mounted() {
			let from = this.$route.query.from
			if (from == 'ios') {
				this.$store.commit('setCurrentPageFromIos', true);
				this.$store.commit('setCurrentPageFromAndroid', false);
				this.$bridge.callHandler('hasToken', {}, (data) => {
					this.$store.commit('setUserToken', data.token);
					this.$store.commit('setUserId', data.userId);
					this.fontSize = data.fontSize
					this.token = data.token
				})
			} else if (from == 'android') {
				this.$store.commit('setCurrentPageFromAndroid', true);
				this.$store.commit('setCurrentPageFromIos', false);
				android.getToken();
			} else {
				this.$store.commit('setCurrentPageFromAndroid', false);
				this.$store.commit('setCurrentPageFromIos', false);
			}
		},
		beforeMount() {
			Indicator.open('加载中...');
			setTimeout(() => {
				this.getInformationDetail(this.$route.params.id, this.token).then(() => {
					this.$store.commit('setInformation', this.resultData);
					this.$store.commit('setStatusI', this.resultData.collectState);
					if (this.resultData.infoVideo) {
						this.resultData.infoVideo.length > 0 ? this.showVideos = true : this.showVideos = false
					}
					Indicator.close();
				})
			}, 500)
			this.$Lazyload.config({ error: '../../../../../../static/picture.png' })
		},
		data() {
			return {
				resultData: [],
				freeScroll: true,
				mouseWheel: true,
				scrollbar: {
					fade: true,
					interactive: false
				},
				showVideos: false,
				fontSize: 18,
				token: ''
			}
		},
		created() {
			window.changeFontSize = this.changeFontSize;
			window.giveToken = this.giveToken;
		},
		methods: {
			giveToken(token) {
				if (token) {
					this.$store.commit('setUserToken', token);
				}
			},
			changeFontSize(font) {
				this.fontSize = font
			},
			//跳转到个人中心
			handlePush(id) {
				if (this.$store.state.app.currentPageFromIos) {
					this.$bridge.callHandler('handlePush', { 'to': 'otherUserCenter', 'id': `${id}` }, (data) => { })
				} else if (this.$store.state.app.currentPageFromAndroid) {
					android.otherUserCenter(`${id}`);
				} else {
					Toast('此项功能为客户端专享，赶紧前往下载体验吧~');
				}
			}
		}
	}
</script>