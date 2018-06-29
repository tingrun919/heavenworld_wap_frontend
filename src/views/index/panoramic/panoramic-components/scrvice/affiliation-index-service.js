import API from '../../../../../api/API'
const api = new API()

export default {
	methods: {
		//获取某个全景的信息
		getSingleAffiliation(panoid, token) {
			return api.get(`banaworld_show/userinfo/selBangIntegral?panoid=${panoid}&token=${token}`)
				.then(res => {
					this.resultData = res.data.data
				})
				.catch(err => {
				});
		},
		getPanoNotice() {
			return api.get(`banaworld_show/nopano/panoNotice`)
				.then(res => {
					this.resultValue = res.data.data
				})
				.catch(err => {
				});
		},
		dzApi(userId){
			return api.get(`banaworld_show/userinfo/zanBangIntegral?userid=${userId}`)
				.then(res => {
					return res.data
				})
				.catch(err => {
				});
		}
	}
}
