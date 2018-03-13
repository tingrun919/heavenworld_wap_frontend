import API from '../../../../../api/API'
const api = new API()
import * as panoramic from '../../../../../../static/vtour/panoramic.js'

export default {
	methods: {
		getCommentList(id,sname) {
			return api.get(`banaworld_show/nopano/selListPray?panoid=${id}&scenename=${sname}`)
				.then(res => {
					console.log(res.data.data, '2222222');
					panoramic.show_comment_list(res.data.data);
				})
				.catch(err => {
				});
		},
		handleAddcomment(id, ath, atv, sname) {
			if (this.showOtherRed) {
				return api.post(`banaworld_show/pano/addPray?token=21232f297a57a5a743894a0e4a801fc3&panoid=${id}&scenename=${sname}&content=${this.$refs.divContent.innerText}&longitude=${ath}&dimension=${atv}&mainpic="pic"&video=${this.videoPath}&voice=${this.audioPath}&ifmoney=1&money=${this.redNumber}&number=${this.redQuantity}&type=${this.showRedPassword == true ? 2 : 1}&check=${this.redCheck}&payment=1&desc=1&videotime=${this.videoDuration}&videopic=${this.icon}&voicetime=${this.audioDuration}`)
					.then(res => {
						console.log(res.data, '1111111');
					})
					.catch(err => {
					});
			} else {
				return api.post(`banaworld_show/pano/addPray?token=21232f297a57a5a743894a0e4a801fc3&panoid=${id}&scenename=${sname}&content=${this.$refs.divContent.innerText}&longitude=${ath}&dimension=${atv}&mainpic="pic"&video=${this.videoPath}&voice=${this.audioPath}&ifmoney=0&videotime=${this.videoDuration}&videopic=${this.icon}&voicetime=${this.audioDuration}`)
					.then(res => {
						console.log(res.data, '1111111');
					})
					.catch(err => {
					});
			}
		},
		getSinglePanoramic(id) {
			return api.get(`banaworld_show/nopano/selOnePano?panoid=${id}`)
				.then(res => {
					this.panoramicInfo = res.data.data[0]
				})
				.catch(err => {
				});
		}
	}
}
