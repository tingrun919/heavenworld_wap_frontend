/*
 * @Author: tarn.tianrun 
 * @Date: 2018-02-07 16:26:54 
 * @Last Modified by:   tarn.tianrun 
 * @Last Modified time: 2018-02-07 16:26:54 
 */

const app = {
	state: {
		currentPageName: '推荐',
		currentPageFromIos: false,
	},
	mutations: {
		setCurrentPageName(state, name) {
			state.currentPageName = name;
		},
		setCurrentPageFromIos(state, name) {
			state.currentPageFromIos = name;
		},
	}
};
export default app;
