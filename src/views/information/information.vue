<template>
		<div>
				资讯
				{{menuList}}
		</div>
	</template>
	<script>
		export default {
			data () {
				return{
	
				}
			},
			computed: {
				menuList () {
					return this.$store.state.app.currentPageName;
				},
			}
		}
	</script>