<style scoped lang="less">
	@import './navbar.less';
</style>
<template>
	<swiper :options="swiperOption">
		<swiper-slide v-for="(item,index) in dataSwipe" :key="item.id" @click.native="test(index)">
			<span v-bind:class="{ navActive: index == currentClick }">{{item.name}}</span>
		</swiper-slide>
	</swiper>
</template>
<script>
	export default {
		data() {
			return {
				currentClick:0,
				swiperOption: {
					initialSlide: 0,
					slidesPerView: 5,
					spaceBetween: 5,
					freeMode: true,
				},
				dataSwipe: [
					{
						id: 1, name: '推荐'
					}, {
						id: 2, name: '济南市'
					}, {
						id: 3, name: '寺庙'
					}, {
						id: 4, name: '景区'
					}, {
						id: 5, name: '家乡'
					}, {
						id: 6, name: '企业'
					}, {
						id: 7, name: '名胜寺庙'
					}, {
						id: 8, name: '风景山水'
					}, {
						id: 9, name: '美食餐厅'
					}, {
						id: 10, name: '特色酒店'
					}
				]
			}
		},
		methods: {
			test(index){
				this.currentClick = index;
			}
		}
	}
</script>