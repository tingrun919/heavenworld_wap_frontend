import API from '../../../../../api/API'
const api = new API()

export default {
	methods: {
		getBlessingOne(prayid) {
			return api.get(`banaworld_show/nopano/selOnePray?prayid=${prayid}`)
				.then(res => {
					this.resultData = res.data.data[0]
					this.showOtherRed = res.data.data[0].prayIfmoney == 1 ? true : false
					this.showOtherVideo = res.data.data[0].prayVideo ? true : false
					this.showOtherAudio = res.data.data[0].prayVoice ? true : false
				})
				.catch(err => {
				});
		},
		getCommentList(prayid, pagesize){
			return api.get(`banaworld_show/nopano/selPrayComment?prayid=${prayid}&pagesize=${pagesize}`)
			.then(res => {
				console.log(res.data.data, '2222222');
				this.commentList = res.data.data
			})
			.catch(err => {
			});	
		}
	}
}
