import API from '../../../../../api/API'
const api = new API()

export default {
	methods: {
		handlePraiseNetWork(token, praInfoid, praUserid) {
			return api.get(`banaworld_show/info/addInformationPraise?token=${token}&praInfoid=${praInfoid}&praUserid=${praUserid}`)
				.then(res => {
					return res.data.data
					// this.resultData = res.data.data
					// Toast(res.data.message);
				})
				.catch(err => {
				});
		},
		handleAddCollect(token, cid, type, state) {
			return api.get(`banaworld_show/userinfo/addCollect?token=${token}&cid=${cid}&type=${type}&state=${state}`)
				.then(res => {

				})
				.catch(err => {
				});
		},
	}
}