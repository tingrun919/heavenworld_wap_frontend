const app = {
	state: {
		currentPageName: '',
	},
	mutations: {
		setCurrentPageName(state, name) {
			state.currentPageName = name;
		},
	}
};
export default app;
