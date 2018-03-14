<style scoped lang="less">
	@import './information-detail.less';
</style>
<style>
	.information-content {
		padding: 0 12px;
	}

	.information-content img {
		width: 100%;
		height: auto;
	}
</style>
<template>
	<scroll ref="scroll" :scrollY="freeScroll" :scrollbar="scrollbar" :mouseWheel="mouseWheel" :style="{height:viewHeight}">
		<div class="information-detail-main">
			<div class="info-infomation">
				<div class="user-info">
					<div class="info-left">
						<img v-lazy="resultData.staffPortrait" width="20" height="20">
						<!-- <img src="../../../assets/mine-icon/mine-custom.png" width="20" height="20"> -->
						<span>{{resultData.staffNickname}} ({{resultData.staffType}})</span>
					</div>
					<div class="info-right">
						<span>发表于{{resultData.infoCreatdate | moment}}</span>
					</div>
				</div>
				<div class="info-title">
					<p>{{resultData.infoTitle}}</p>
				</div>
				<div class="info-subtitle info-font">
					<span>{{resultData.infoSubtitle}}</span>
				</div>
			</div>
			<!-- <li v-for="n in 140">
				{{n}}
			</li> -->
			<div class="content-infomation">
				<div v-html="resultData.infoContent" class="information-content"></div>
				<div class="content-icon">
					<img src="../../../assets/information-img/read.png" width="20" height="20">
				</div>
				<div class="content-read">
					<span>{{resultData.infoReadnum}}
						<span v-if="resultData.infoReadnum > 1000">+</span>阅读</span>
				</div>
			</div>
		</div>
	</scroll>
</template>

<script>
	import informationDetailService from './information-detail-service/information-detail-service.js'
	import Scroll from '../../index/scroll/scroll.vue'

	export default {
		mixins: [informationDetailService],
		components: {
			//otherBottom
			Scroll
		},
		computed: {
			viewHeight: function () {
				return (window.innerHeight - 95) + 'px'
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
				})
			} else if (from == 'android') {
				this.$store.commit('setCurrentPageFromAndroid', true);
				this.$store.commit('setCurrentPageFromIos', false);
			} else {
				this.$store.commit('setCurrentPageFromAndroid', false);
				this.$store.commit('setCurrentPageFromIos', false);
			}
		},
		beforeMount() {
			this.getInformationDetail(this.$route.params.id, this.$store.state.app.userToken,).then(() => {
				this.$store.commit('setInformation', this.resultData);
			})
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
			}
		},

	}
</script>