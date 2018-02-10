/*
 * @Author: tarn.tianrun 
 * @Date: 2018-02-07 10:36:22 
 * @Last Modified by: tarn.tianrun
 * @Last Modified time: 2018-02-07 15:16:33
 */
<style scoped lang="less">
	@import "./other-panoramic.less";
</style>
<template>
	<div>
		<mt-tabbar v-model="selected">
			<mt-tab-item id="blessing" @click.native="handleBlessingBottom('blessing')">
				<img slot="icon" src="../../../../assets/panoramic-img/panoramic-blessing-no.png">
				祈福
			</mt-tab-item>
			<mt-tab-item id="index" @click.native="toIndex">
				<img slot="icon" src="../../../../assets/panoramic-img/panoramic-home-no.png">
				主页
			</mt-tab-item>
			<mt-tab-item id="scenes" @click.native="handleBlessingBottom('scenes')">
				<img slot="icon" src="../../../../assets/panoramic-img/panoramic-scenes-no.png">
				场景
			</mt-tab-item>
			<mt-tab-item id="more" @click.native="showMore">
				<img slot="icon" src="../../../../assets/panoramic-img/panoramic-more-no.png">
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
			// this.$emit("handleBlessingBottom",this.selected)
		},
		methods: {
			handleBlessingBottom(bottombar) {
				this.$emit("handleBlessing",bottombar)
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