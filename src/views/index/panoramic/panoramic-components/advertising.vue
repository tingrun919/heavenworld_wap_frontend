<style lang="less">
	@import './advertising.less';
</style>
<template>
	<div class="advertising-main" v-html="resultValue[0].no_content">
	</div>
</template>
<script>
		import affiliationIndexService from './scrvice/affiliation-index-service.js'
	
		export default {
			mixins:[affiliationIndexService],
			beforeMount() {
				this.getPanoNotice()
			},
			data() {
				return {
					resultValue:[],
				}
			},
		}
	</script>