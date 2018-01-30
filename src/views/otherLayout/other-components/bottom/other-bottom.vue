<style scoped lang="less">
	@import "./other-bottom.less";
</style>
<template>
	<mt-tabbar v-model="selected">
		<mt-tab-item id="panoramic" @click.native="handleBottombar('panoramic')">
			<img slot="icon" v-if="!(selected === 'panoramic')" src="../../../../assets/information-img/like.png">
			<img slot="icon" v-if="selected === 'panoramic'" src="../../../../assets/bottom-bar-icon/panoramic-in.png"> 667人点赞
		</mt-tab-item>
		<mt-tab-item id="information" @click.native="handleBottombar('information')">
			<img slot="icon" v-if="!(selected === 'information')" src="../../../../assets/information-img/share.png">
			<img slot="icon" v-if="selected === 'information'" src="../../../../assets/bottom-bar-icon/information-in.png"> 分享
		</mt-tab-item>
		<mt-tab-item id="find" @click.native="handleBottombar('find')">
			<img slot="icon" v-if="!(selected === 'find')" src="../../../../assets/information-img/collection.png">
			<img slot="icon" v-if="selected === 'find'" src="../../../../assets/bottom-bar-icon/find-in.png"> 收藏
		</mt-tab-item>
		<mt-tab-item id="mine" @click.native="handleBottombar('mine')">
			<img slot="icon" v-if="!(selected === 'mine')" src="../../../../assets/information-img/comment.png">
			<img slot="icon" v-if="selected === 'mine'" src="../../../../assets/bottom-bar-icon/mine-in.png"> 888人评论
		</mt-tab-item>
	</mt-tabbar>
</template>
<script>
	export default {
		data() {
			return {
				selected:'',
			}
		},
		mounted(){
			// this.selected = this.$route.name
			// this.$emit("handleBottombar",this.selected)
		},
		methods:{
			handleBottombar(bottombar){
				// this.$emit("handleBottombar",bottombar)
			}
		}
	}
</script>