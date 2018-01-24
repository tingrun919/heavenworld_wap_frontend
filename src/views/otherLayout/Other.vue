<style scoped lang="less">
		@import './other.less';
	</style>
<template>
	<div class="other-main">
		<div class="other-header">
			<header-child-Comp :title="isDefauleHeader"></header-child-Comp>
		</div>
		<div class="other-content">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>
<script>
		import headerChildComp from './other-components/header/other-header.vue';
		export default {
			components: {
				headerChildComp,
			},
			data() {
				return {
					isDefauleHeader:'全景',
				}
			},
			methods: {

			}
		}
	</script>