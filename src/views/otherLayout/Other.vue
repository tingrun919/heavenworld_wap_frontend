/*
 * @Author: tarn.tianrun 
 * @Date: 2018-02-22 18:16:22 
 * @Last Modified by: tarn.tianrun
 * @Last Modified time: 2018-02-23 15:57:42
 */

<style scoped lang="less">
	@import './other.less';
</style>
<template>
	<div class="other-main">
		<div class="other-header">
			<header-child-Comp :title="title" :isblessing="isBlessing" :isShowRight="isShowRightTag"></header-child-Comp>
		</div>
		<div class="other-content">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
		<div class="other-navbar">
			<other-Bottom v-if="currentRouteName == 'information_view'"></other-Bottom>
			<other-Panoramic v-if="currentRouteName == 'panoramic_view'"></other-Panoramic>
			<other-Blessing v-if="currentRouteName == 'blessing_view'"></other-Blessing>
		</div>
	</div>
</template>
<script>
	import otherBottom from './other-components/bottom/other-bottom.vue';
	import otherPanoramic from './other-components/bottom/other-panoramic.vue';
	import otherBlessing from './other-components/bottom/other-blessing.vue';
	import headerChildComp from './other-components/header/other-header.vue';
	export default {
		components: {
			headerChildComp,
			otherBottom,
			otherPanoramic,
			otherBlessing,
		},
		computed: {
			title() {
				var title = '';
				switch (this.$route.name) {
					case 'information_view':
						title = '文章标题'
						break;
					case 'panoramic_view':
						title = '全景'
						break;
					case 'blessing_view':
						title = '';
						break;
					case 'find_dynamic':
						title = '动态';
						break;
					case 'follow_view':
						title = '关注';
						break;
					case 'topic_view':
						title = '我的话题';
						break;
				}
				return title;
			},
			currentRouteName() {
				var title = '';
				switch (this.$route.name) {
					case 'information_view':
						title = 'information_view';
						break;
					case 'panoramic_view':
						title = 'panoramic_view';
						break;
					case 'blessing_view':
						title = 'blessing_view';
						break;
				}
				return title;
			},
			isBlessing() {
				if(this.$route.name == 'blessing_view'){
					this.isblessing = false
				}
				if(this.$route.name == 'follow_view'){
					this.isblessing = true
				}
				return this.isblessing
			},
			isShowRightTag(){
				if(this.$route.name == 'find_dynamic'){
					this.isshowright = false
				}
				if(this.$route.name == 'follow_view'){
					this.isshowright = false
				}
				if(this.$route.name == 'topic_view'){
					this.isshowright = false
				}
				return this.isshowright
			}
		},
		data() {
			return {
				show:true,
				isblessing:true,
				isshowright:true,
			}
		},
		methods: {

		},
		// mounted() {
		// 	document.addEventListener('click', (e) => {
		// 		if (!this.$el.contains(e.target)){
		// 			this.show = false
		// 			console.log(this.show,'2222222223')
		// 		} 
		// 	})
		// },
	}
</script>