import API from '../../../../api/API'
const api = new API()
import * as panoramic from '../../../../../static/vtour/panoramic.js'

export default {
	methods: {
		getCommentList(sname){
			return api.get(`banaworld_show/nopano/selListPray?panoid=1&scenename=${sname}`)
			.then(res => {
				console.log(res.data.data,'2222222');
				panoramic.show_comment_list(res.data.data);
			})
			.catch(err => {
			});
		},
		handleAddcomment(ath, atv, sname){
			return api.post(`banaworld_show/pano/addPray?token=21232f297a57a5a743894a0e4a801fc3&panoid=1&scenename=${sname}&content=test&longitude=${ath}&dimension=${atv}&ifmoney=0`)
			.then(res => {
				console.log(res.data,'1111111');
			})
			.catch(err => {
			});
		}
	}
}
