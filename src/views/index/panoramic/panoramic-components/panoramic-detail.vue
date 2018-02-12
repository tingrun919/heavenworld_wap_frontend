<style scoped lang="less">
	@import './panoramic-detail.less';
</style>
<template>
	<div class="other-main">
		<div class="v-shadow" v-if="showVideos">
			<img src="../../../../assets/panoramic-img/panoramic-blessing-close.png" @click="closeVideo" width="20" height="20">
		</div>
		<div class="other-header">
			<header-child-Comp :title="title" :isblessing="true"></header-child-Comp>
		</div>
		<div class="other-content">
			<div id="wrapper">
				<div id="pano"></div>
			</div>
		</div>
		<div class="v-video" v-show="showVideos">
			<video playsinline webkit-playsinline ref="videoTag" controls="controls" :poster="icon" autoplay="autoplay" :width="viewWidthVideo">
				<source :src="path" type="video/mp4" />
			</video>
		</div>
		<div class="v-video">
			<audio :src="path" ref="audioTag"></audio>
		</div>
		<transition name="slide-fade">
			<div class="blessing-display" v-if="handleBlessingAction">
				<div class="blessing-btn">
					<div>
						<img src="../../../../assets/panoramic-img/panoramic-cancel.png" @click="getPanoramicAction('blessing')" width="30" height="30">
					</div>
					<div>
						<img src="../../../../assets/panoramic-img/panoramic-blessing-confirm.png" @click="getPanoramicAction('blessing')" width="30"
						 height="30">
					</div>
				</div>
				<div class="blessing-text" v-bind:style="{backgroundImage: 'url(' + dataSwipe[chioseImg].img + ')'}">
					<div contenteditable class="blessing-text-enter" @focus="handleEdit"></div>
					<div class="blessing-other">
						<div class="blessing-other-info" :style="{width:viewWidth}" v-show="showOtherAudio" @click="playAudio">
							<img src="../../../../assets/panoramic-img/panoramic-blessing-radio.png" width="20" height="20">
							<span>{{duration}}秒</span>
							<div class="bg" v-bind:class="{ voicePlay : playAudioAnimation }"></div>
						</div>
						<div class="blessing-other-info" :style="{width:viewWidth}" v-show="showOtherVideo" @click="playVideo">
							<img src="../../../../assets/panoramic-img/panoramic-blessing-video.png" width="20" height="20">
							<span>{{duration}}秒</span>
						</div>
						<div class="red blessing-other-info" :style="{width:viewWidth}" v-show="showOtherRed">
							<img src="../../../../assets/panoramic-img/panoramic-blessing-gift.png" width="20" height="20">
							<span>手气红包</span>
						</div>
					</div>
				</div>
				<div class="blessing-action">
					<div><img src="../../../../assets/panoramic-img/panoramic-action-edit.png" @click="playVideo" width="45" height="45"></div>
					<div><img src="../../../../assets/panoramic-img/panoramic-action-more.png" @click="changeModel" width="45" height="45"></div>
					<div><img src="../../../../assets/panoramic-img/panoramic-action-redprice.png" @click="changeRedenvelope" width="45" height="45"></div>
					<div><img src="../../../../assets/panoramic-img/panoramic-action-voice.png" @click="changeAudio" width="45" height="45"></div>
					<div><img src="../../../../assets/panoramic-img/panoramic-action-video.png" @click="changeVideo" width="45" height="45"></div>
				</div>
				<transition name="slide-fade">
					<div class="blessing-model" v-if="showModel">
						<swiper :options="swiperOption">
							<swiper-slide v-for="(item,index) in dataSwipe" :key="item.id" @click.native="choiseModel(index)">
								<img v-bind:class="{ ischiose : index == chioseImg }" :src="item.img" width="100" height="100">
								<span>{{item.name}}</span>
							</swiper-slide>
						</swiper>
					</div>
				</transition>
				<transition name="slide-fade">
					<div class="blessing-red-envelope" v-if="showRedenvelope">
						<div class="red-info">
							<div class="red-info-main">
								<span>红包个数</span>
								<span>红包金额</span>
							</div>
							<div class="red-info-submain">
								<mt-field></mt-field>
								<mt-field></mt-field>
							</div>
							<div class="red-info-balance">
								<img src="../../../../assets/panoramic-img/panoramic-balance.png" width="25" height="25">
								<span>账户余额:222.24</span>
							</div>
							<div class="red-info-btn">
								<mt-button type="danger">塞进红包</mt-button>
							</div>
						</div>
					</div>
				</transition>
			</div>
		</transition>
		<div class="other-navbar" v-if="!handleBlessingAction">
			<other-Panoramic @handleBlessing="getPanoramicAction"></other-Panoramic>
		</div>
	</div>
</template>

<script>
	import otherPanoramic from '../../../otherLayout/other-components/bottom/other-panoramic.vue';
	import headerChildComp from '../../../otherLayout/other-components/header/other-header.vue';
	import * as panoramic from '../../../../../static/vtour/panoramic.js'
	import img1 from '../../../../assets/view/timg0.jpeg'
	import img2 from '../../../../assets/view/timg2.jpeg'
	import img3 from '../../../../assets/view/timg3.jpeg'
	import img4 from '../../../../assets/view/timg4.jpeg'
	import img5 from '../../../../assets/view/timg5.jpeg'
	import img6 from '../../../../assets/view/timg6.jpeg'
	import img7 from '../../../../assets/view/timg7.jpeg'
	import { Toast } from 'mint-ui';

	export default {
		name: 'vtour',
		data() {
			return {
				show: false,
				title: '全景',
				handleBlessingAction: false,
				showModel: false,
				showRedenvelope: false,
				showOtherAudio: false,
				showOtherVideo: false,
				showOtherRed: false,
				showVideos: false,
				swiperOption: {
					initialSlide: 0,
					slidesPerView: 3.3,
					spaceBetween: 5,
					freeMode: true,
				},
				path: '',
				icon: '',
				duration: '',
				playAudioAnimation: false,
				chioseImg: 1,
				dataSwipe: [
					{
						id: 1, name: '祈福模版', img: img1
					}, {
						id: 2, name: '祈福模版', img: img2
					}, {
						id: 3, name: '祈福模版', img: img3
					}, {
						id: 4, name: '祈福模版', img: img4
					}, {
						id: 5, name: '祈福模版', img: img5
					}, {
						id: 6, name: '祈福模版', img: img6
					}, {
						id: 7, name: '祈福模版', img: img7
					}
				],
			}
		},
		computed: {
			viewHeight: function () {
				return (window.innerHeight / 3) + 'px'
			},
			viewWidth: function () {
				return (window.innerWidth / 3 - 30) + 'px'
			},
			viewWidthVideo: function () {
				return (window.innerWidth) + 'px'
			},
			// player() {
			// 	return this.$refs.videoPlayer.player
			// },
		},
		mounted() {
			console.log('this is current player instance object', this.player)
			let from = this.$route.query.from
			if (from !== undefined) {
				this.$store.commit('setCurrentPageFromIos', true);
			}
			this.$bridge.registerHandler("resultData", (data) => {
				if (data.type == 'video') {
					this.path = data.path
					this.icon = data.icon
					this.duration = data.duration
					this.showOtherVideo = true
				} else if (data.type == 'voice') {
					this.path = data.path
					this.duration = data.duration
					this.showOtherAudio = true
				}
				// this.showVideos = true;
			})
			embedpano({ swf: "../../../../static/vtour/tour.swf", xml: "../../../../static/vtour/tour.xml", target: "pano", html5: "auto", mobilescale: 1.0, passQueryParameters: true });
		},
		beforeMount() {
			// console.log(this.$route.query.preid, '11111')
		},
		methods: {
			getPanoramicAction(param) {
				//点击祈福
				if (param == 'blessing') {
					this.handleBlessingAction = !this.handleBlessingAction
					this.showRedenvelope = false;
					this.showModel = false;
				}
			},
			handleEdit() {
				panoramic.show_comment();
			},
			changeModel() {
				this.showModel = !this.showModel
				this.showRedenvelope = false;
			},
			changeRedenvelope() {
				this.showRedenvelope = !this.showRedenvelope
				this.showModel = false;
			},
			choiseModel(index) {
				this.chioseImg = index;
			},
			changeAudio() {
				if (this.$store.state.app.currentPageFromIos) {
					this.$bridge.callHandler('showAudit', {}, (data) => { })
				} else {
					Toast('此项功能为客户端专享，赶紧前往下载体验吧~');
				}
			},
			changeVideo() {
				if (this.$store.state.app.currentPageFromIos) {
					this.$bridge.callHandler('showVideo', {}, (data) => { })
				} else {
					Toast('此项功能为客户端专享，赶紧前往下载体验吧~');
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
			playAudio() {
				if (this.$refs.audioTag.paused) {
					this.playAudioAnimation = true
					this.$refs.audioTag.load()
					this.$refs.audioTag.play()
					setTimeout(() => {
						this.playAudioAnimation = false
					}, this.duration * 1000);
				} else {
					this.playAudioAnimation = false
					this.$refs.audioTag.pause()
				}
			}
		},
		components: {
			headerChildComp,
			otherPanoramic
		}
	}
</script>

<style scoped>
	#wrapper {
		width: 100%;
		height: 94.3%;
		position: absolute;
		/* border: 1px solid red; */
	}

	#pano {
		width: 100%;
		height: 100%;
	}

	.img_btn {
		width: 60px;
		height: 60px;
		position: absolute;
		top: 10px;
		right: 6px;
		z-index: 4010;
	}

	.showUp {
		animation: showup 0.4s ease-in;
	}

	.hideDown {
		animation: hidedown 0.4s ease-out;
	}

	@keyframes showup {
		from {
			transform: translateY(110%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes hidedown {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(110%);
		}
	}

	.vrshow_comment {
		position: absolute;
		bottom: 10%;
		left: 50%;
		margin-left: -200px;
		width: 400px;
		min-height: 100px;
		background-color: rgba(51, 51, 51, 0.8);
		z-index: 4300;
		color: #fff;
		border-radius: 5px;
		display: none;
	}

	@media screen and (max-width: 767px) {
		.vrshow_comment {
			width: 250px;
			margin-left: -125px;
		}
	}
</style>