<style scoped lang="less">
		@import "./other-blessing.less";
	</style>
	<template>
		<div style="position:fixed;bottom:0;width:100%;z-index:2000;">
			<mt-tabbar v-model="selected">
				<mt-tab-item id="blessing" @click.native="handleBottombar('blessing')">
					<img slot="icon" src="../../../../assets/panoramic-img/panoramic-blessing-no.png">
					<!-- <img slot="icon" v-if="selected === 'blessing'" src="../../../../assets/panoramic-img/panoramic-blessing.png">  -->
					全景
				</mt-tab-item>
				<mt-tab-item id="index" @click.native="toIndex">
					<img slot="icon" src="../../../../assets/panoramic-img/panoramic-home-no.png">
					<!-- <img slot="icon" v-if="selected === 'index'" src="../../../../assets/panoramic-img/panoramic-home.png">  -->
					福商城
				</mt-tab-item>
				<mt-tab-item id="scenes" @click.native="handleBottombar('scenes')">
					<img slot="icon" src="../../../../assets/panoramic-img/panoramic-scenes-no.png">
					<!-- <img slot="icon" v-if="selected === 'scenes'" src="../../../../assets/panoramic-img/panoramic-scenes.png">  -->
					结缘榜
				</mt-tab-item>
				<mt-tab-item id="more" @click.native="showMore">
					<img slot="icon" src="../../../../assets/panoramic-img/panoramic-more-no.png">
					<!-- <img slot="icon" v-if="selected === 'more'" src="../../../../assets/panoramic-img/panoramic-more.png">  -->
					收藏
				</mt-tab-item>
			</mt-tabbar>
		</div>
	</template>
	<script>
		export default {
			components: {
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