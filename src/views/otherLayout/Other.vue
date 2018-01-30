<style scoped lang="less">
	@import './other.less';
</style>
<template>
	<div class="other-main">
		<div class="other-header">
			<header-child-Comp :title="title"></header-child-Comp>
		</div>
		<div class="other-content">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
		<div class="other-navbar" v-if="is_information">
			<other-Bottom></other-Bottom>
		</div>
	</div>
</template>
<script>
	import otherBottom from './other-components/bottom/other-bottom.vue';
	import headerChildComp from './other-components/header/other-header.vue';
	export default {
		components: {
			headerChildComp,
			otherBottom,
		},
		computed: {
			title() {
				var title = ''
				switch (this.$route.name) {
					case 'information_view':
						title = '文章标题'
						break;
					case 'panoramic_view':
						title = '全景'
						break;
				}
				return title;
			},
			is_information() {
				var title;
				switch (this.$route.name) {
					case 'information_view':
						title = true;
						break;
					case 'panoramic_view':
						title = false;
						break;
				}
				return title;
			}
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>