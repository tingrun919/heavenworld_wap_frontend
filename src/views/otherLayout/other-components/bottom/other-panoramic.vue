<style scoped lang="less">
	@import "./other-panoramic.less";
</style>
<template>
	<div>
		<mt-tabbar v-model="selected">
			<mt-tab-item id="blessing" @click.native="handleBottombar('blessing')">
				<img slot="icon" src="../../../../assets/panoramic-img/panoramic-blessing-no.png">
				<!-- <img slot="icon" v-if="selected === 'blessing'" src="../../../../assets/panoramic-img/panoramic-blessing.png">  -->
				祈福
			</mt-tab-item>
			<mt-tab-item id="index" @click.native="toIndex">
				<img slot="icon" src="../../../../assets/panoramic-img/panoramic-home-no.png">
				<!-- <img slot="icon" v-if="selected === 'index'" src="../../../../assets/panoramic-img/panoramic-home.png">  -->
				主页
			</mt-tab-item>
			<mt-tab-item id="scenes" @click.native="handleBottombar('scenes')">
				<img slot="icon" src="../../../../assets/panoramic-img/panoramic-scenes-no.png">
				<!-- <img slot="icon" v-if="selected === 'scenes'" src="../../../../assets/panoramic-img/panoramic-scenes.png">  -->
				场景
			</mt-tab-item>
			<mt-tab-item id="more" @click.native="showMore">
				<img slot="icon" src="../../../../assets/panoramic-img/panoramic-more-no.png">
				<!-- <img slot="icon" v-if="selected === 'more'" src="../../../../assets/panoramic-img/panoramic-more.png">  -->
				更多
			</mt-tab-item>
		</mt-tabbar>
		<transition name="fade">
			<drop-Up v-if="show"></drop-Up>
		</transition>
	</div>
</template>
<script>
	import dropUp from '../bottom/dropup.vue';
	export default {
		components: {
			dropUp
		},
		data() {
			return {
				selected: 'blessing',
				show: false
			}
		},
		mounted() {
			// this.selected = this.$route.name
			// this.$emit("handleBottombar",this.selected)
		},
		methods: {
			handleBottombar(bottombar) {
				// this.$emit("handleBottombar",bottombar) rgba(250,250,250,0.8)
			},
			showMore() {
				this.show = !this.show
			},
			toIndex() {
				this.$router.push({
					name: 'blessing_view'
				});
			}
		}
	}
</script>