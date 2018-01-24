<style scoped lang="less">
	@import "./other-header.less";
</style>
<template>
	<mt-header :title="title" class="headerActive">
		<router-link to="/" slot="left">
			<mt-button icon="back"></mt-button>
		</router-link>
	</mt-header>
</template>
<script>
	export default {
		props: {
			title: String
		},
	}
</script>