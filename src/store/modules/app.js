const app = {
	state: {
		currentPageName: '推荐',
	},
	mutations: {
		setCurrentPageName(state, name) {
			state.currentPageName = name;
		},
	}
};
export default app;
