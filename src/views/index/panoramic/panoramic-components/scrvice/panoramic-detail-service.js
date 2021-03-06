import API from '../../../../../api/API'
const api = new API()
import * as panoramic from '../../../../../../static/vtour/panoramic.js'

export default {
	methods: {
		getCommentList(id, sname) {
			return api.get(`banaworld_show/nopano/selListPray?panoid=${id}&scenename=${sname}`)
				.then(res => {
					panoramic.show_comment_list(res.data.data);
				})
				.catch(err => {
				});
		},
		handleAddcomment(id, ath, atv, sname, pic, token) {
			if (this.showOtherRed) {
				return api.post(`banaworld_show/pano/addPray?token=${token}&panoid=${id}&scenename=${sname}&content=${this.$refs.divContent.innerText}&longitude=${ath}&dimension=${atv}&mainpic=${pic}&video=${this.videoPath}&voice=${this.audioPath}&ifmoney=1&money=${this.redNumber}&number=${this.redQuantity}&type=${this.showRedPassword == true ? 2 : 1}&check=${this.redCheck}&payment=1&desc=1&videotime=${this.videoDuration}&videopic=${this.icon}&voicetime=${this.audioDuration}`)
					.then(res => {
						return res.data
					})
					.catch(err => {
					});
			} else {
				return api.post(`banaworld_show/pano/addPray?token=${token}&panoid=${id}&scenename=${sname}&content=${this.$refs.divContent.innerText}&longitude=${ath}&dimension=${atv}&mainpic=${pic}&video=${this.videoPath}&voice=${this.audioPath}&ifmoney=0&videotime=${this.videoDuration}&videopic=${this.icon}&voicetime=${this.audioDuration}`)
					.then(res => {
						return res.data
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
		},
		getStencil(token) {
			return api.get(`banaworld_show/pano/panoTemplet?token=${token}&panoid=1`)
				.then(res => {
					this.dataSwipe = res.data.data
				})
				.catch(err => {
				});
		}
	}
}
