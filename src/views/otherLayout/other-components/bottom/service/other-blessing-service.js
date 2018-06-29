import API from '../../../../../api/API'
const api = new API()


export default {
	methods: {
		//1全景；2资讯；3用户；4商品；5讲堂
		handleAddCollect(token, cid, type, state) {
			return api.get(`banaworld_show/userinfo/addCollect?token=${token}&cid=${cid}&type=${type}&state=${state}`)
				.then(res => {

				})
				.catch(err => {
				});
		},
	}
}