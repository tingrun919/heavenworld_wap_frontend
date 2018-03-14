import API from '../../../api/API'
const api = new API()

export default {
	methods: {
		getInformationCommentList() {
			return api.get(`banaworld_show/info/selectInformationCommentList?token=21232f297a57a5a743894a0e4a801fc3`)
				.then(res => {
					this.items = res.data.data
				})
				.catch(err => {
				});
		},
	}
}