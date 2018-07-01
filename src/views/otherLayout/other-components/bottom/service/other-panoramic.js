import API from '../../../../../api/API'
const api = new API()


export default {
	methods: {
		getPanoFunction(panoid) {
			return api.get(`banaworld_show/nopano/panoFunction?panoid=${panoid}`)
				.then(res => {
					this.resultList = res.data.data
				})
				.catch(err => {
				});
		},
	}
}