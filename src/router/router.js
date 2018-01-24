import Main from '@/views/Main.vue';
import Other from '@/views/otherLayout/Other.vue';

export const appRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/panoramic',
    component: Main,
    children: [
		{ path: 'panoramic', title: 'panoramic', name: 'panoramic', component: resolve => { require(['@/views/index/panoramic/panoramic.vue'], resolve); } },
		{ path: 'information', title: 'information', name: 'information', component: resolve => { require(['@/views/information/information.vue'], resolve); } },
        { path: 'find', title: 'find', name: 'find', component: resolve => { require(['@/views/find/find.vue'], resolve); } },
		{ path: 'mine', title: 'mine', name: 'mine', component: resolve => { require(['@/views/mine/mine.vue'], resolve); } },
    ]
};

export const otherRouter = [
    {
        path: '/panoramicView',
        name: 'panoramicView',
        title: '全景',
        component: Other,
        children: [
            { path: 'index', title: '全景', name: 'panoramic_view', component: () => import('@/views/index/panoramic/panoramicDetail.vue') }
        ]
    },
];

export const routers = [
	appRouter,
	...otherRouter
];