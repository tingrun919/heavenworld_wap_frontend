<style scoped lang="less">
	@import "./other-header.less";
</style>
<template>
	<mt-header :title="title" class="headerActive">
		<router-link to="/" slot="left">
			<mt-button icon="back"></mt-button>
		</router-link>
		<mt-button icon="more" slot="right" style="transform: rotate(-90deg);"></mt-button>
	</mt-header>
</template>
<script>
	export default {
		props: {
			title: String
		},
	}
</script>