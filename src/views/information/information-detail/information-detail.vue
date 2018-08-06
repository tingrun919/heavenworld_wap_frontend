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
		<div class="commit" :style="{ height: isHeight }">
			<div class="commit-top">
				<div class="c-t-inner">
					评论（{{ commitNum }}人）
				</div>
			</div>
			<!-- <scroll v-if="items.length > 0" :data="items"></scroll> -->
			<!-- <scroll-For-Information-Comment @pushComment="pushItem" :item='item' v-if="currentRoute == 'information_view'"></scroll-For-Information-Comment> -->
			<ul class="commit-detail">
				<li v-for="(item, index) in items" :key="index">
					<scroll-For-Information-Comment :item='item' :isShow="false" v-if="currentRoute == 'information_view'"></scroll-For-Information-Comment>
				</li>
			</ul>
			
			<div class="blessing-messages-list-nodata" v-if="items.length <= 0">
				<img src="../../../assets/nodata.png" :width="viewHeightImgNodata" :height="viewHeightImgNodata">
			</div>
			<div class="addCommit">
				<mt-button type="primary" size="small" @click="addCommit" style="width: 25%;border-radius: 50px;">立即评论</mt-button>
			</div>
		</div>
	</div>
	<!-- </scroll> -->
</template>

<script>
	import informationDetailService from './information-detail-service/information-detail-service.js'
	import Scroll from '../../index/scroll/scroll.vue'
	import scrollForInformationComment from '../../index/scroll/scroll-components/scroll-information-comment/scroll-information-comment.vue'
	import { Indicator } from 'mint-ui';
	import informationCommentService from '../service/informationCommentService.js'

	export default {
		mixins: [informationDetailService,informationCommentService],
		components: {
			//otherBottom
			Scroll,
			scrollForInformationComment
		},
		computed: {
			viewHeight: function () {
				return (window.innerHeight - 45) + 'px'
			},
			viewWidthVideo: function () {
				return (window.innerWidth) + 'px'
			},
			viewHeightImgNodata: function () {
				return window.innerHeight / 5
			},
			currentRoute() {
				return this.$route.name
			}
		},
		watch: {
			
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
				android.getToken2();
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
			this.$Lazyload.config({ error: '../../../../../../static/picture.png' });
			this.getInformationCommentList(this.$route.params.id).then(() => {
				let len = this.items.length;
				this.commitNum = len;
				if(len > 3) {
					let list = [];
					for(let i=2; i >= 0; i--){
						list.push(this.items[len-i-1]);
					}
					this.items = list;
					len = 3;
				}
				if(len !== 0) {
					for(let i=0; i < len; i++) {
						this.isHeight += 94;
					}
					this.isHeight += 'px';
				}else {
					// this.isHeight = '40%';
				}
				
			})
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
				token: '',
				items: [],
				commitNum: 0
				// isHeight: '35%'
			}
		},
		created() {
			window.changeFontSize = this.changeFontSize;
			window.giveToken = this.giveToken;
			window.giveToken2 = this.giveToken2;
		},
		methods: {
			giveToken(token) {
				if (token) {
					this.$store.commit('setUserToken', token);
				}
			},
			giveToken2(token) {
				if (token) {
					this.$store.commit('setUserToken', token);
					this.token = token
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
					MessageBox.confirm('此项功能为客户端专享，赶紧前往下载体验吧~').then(action => { window.location.href = "https://www.pgyer.com/Tpka" });
				}
			},
			addCommit () {
				this.$router.push(`/comment/${this.$route.params.id}?pageFrom=detailPages`)
			}
		}
	}
</script>